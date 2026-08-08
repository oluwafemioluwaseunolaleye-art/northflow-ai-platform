import "server-only";
import type { QualificationStatus } from "@/types/leads";

export interface QualificationInput {
  service: string | null;
  company: string | null;
  budget: number | null;
  timeline: string | null;
  description: string | null;
}

export interface BudgetAnalysis {
  tier: "qualified" | "review" | "not_qualified";
  reason: string;
}

export interface RequirementAnalysis {
  /** 0–100 completeness score, independent of budget. */
  score: number;
  reason: string;
}

export interface QualificationResult {
  status: QualificationStatus;
  /** 0–100 overall qualification score. */
  score: number;
  reason: string;
  budgetAnalysis: BudgetAnalysis;
  requirementAnalysis: RequirementAnalysis;
  /** Which path produced this result — surfaced in the UI so it's never ambiguous. */
  source: "anthropic" | "rules-fallback";
}

/**
 * Budget qualification thresholds. Configurable via env vars rather than
 * hardcoded — set QUALIFICATION_MIN_BUDGET_QUALIFIED /
 * QUALIFICATION_MIN_BUDGET_REVIEW to tune without a code change.
 */
export const QUALIFICATION_THRESHOLDS = {
  minBudgetQualified: Number(process.env.QUALIFICATION_MIN_BUDGET_QUALIFIED ?? 5000),
  minBudgetReview: Number(process.env.QUALIFICATION_MIN_BUDGET_REVIEW ?? 1500),
};

// ─────────────────────────────────────────────────────────────
// BUDGET ANALYSIS
// ─────────────────────────────────────────────────────────────
function analyzeBudget(budget: number | null): BudgetAnalysis {
  const { minBudgetQualified, minBudgetReview } = QUALIFICATION_THRESHOLDS;

  if (budget === null) {
    return { tier: "review", reason: "No budget provided — needs manual review." };
  }
  if (budget >= minBudgetQualified) {
    return {
      tier: "qualified",
      reason: `Budget of $${budget.toLocaleString()} meets the qualified threshold ($${minBudgetQualified.toLocaleString()}+).`,
    };
  }
  if (budget >= minBudgetReview) {
    return {
      tier: "review",
      reason: `Budget of $${budget.toLocaleString()} is below the qualified threshold ($${minBudgetQualified.toLocaleString()}) but above the review floor ($${minBudgetReview.toLocaleString()}).`,
    };
  }
  return {
    tier: "not_qualified",
    reason: `Budget of $${budget.toLocaleString()} is below the minimum threshold ($${minBudgetReview.toLocaleString()}).`,
  };
}

// ─────────────────────────────────────────────────────────────
// REQUIREMENT ANALYSIS
// ─────────────────────────────────────────────────────────────
function analyzeRequirements(input: QualificationInput): RequirementAnalysis {
  let score = 0;
  const missing: string[] = [];

  if (input.service) score += 34;
  else missing.push("service");

  if (input.description && input.description.trim().length > 20) score += 33;
  else missing.push("a detailed description");

  if (input.timeline) score += 33;
  else missing.push("a timeline");

  const reason = missing.length
    ? `Missing: ${missing.join(", ")}.`
    : "All key project details are present.";

  return { score, reason };
}

// ─────────────────────────────────────────────────────────────
// RULE-BASED FALLBACK
// This is NOT a simulation of AI behavior — it's transparent, deterministic
// scoring logic. Used whenever ANTHROPIC_API_KEY isn't configured, or if
// the live API call fails, so the feature still works in development and
// degrades safely in production. Every result is labeled with `source` so
// the UI never presents this as an AI judgment.
// ─────────────────────────────────────────────────────────────
function ruleBasedQualify(input: QualificationInput): QualificationResult {
  const budgetAnalysis = analyzeBudget(input.budget);
  const requirementAnalysis = analyzeRequirements(input);

  const budgetPoints =
    budgetAnalysis.tier === "qualified" ? 60 : budgetAnalysis.tier === "review" ? 35 : 10;
  const score = Math.min(100, Math.round(budgetPoints + requirementAnalysis.score * 0.4));

  let status: QualificationStatus;
  if (budgetAnalysis.tier === "not_qualified") {
    status = "not_qualified";
  } else if (budgetAnalysis.tier === "qualified" && requirementAnalysis.score >= 66) {
    status = "qualified";
  } else {
    status = "needs_review";
  }

  return {
    status,
    score,
    reason: `${budgetAnalysis.reason} ${requirementAnalysis.reason}`,
    budgetAnalysis,
    requirementAnalysis,
    source: "rules-fallback",
  };
}

// ─────────────────────────────────────────────────────────────
// AI-POWERED QUALIFICATION (real Anthropic API call)
// ─────────────────────────────────────────────────────────────
async function aiQualify(input: QualificationInput): Promise<QualificationResult> {
  const budgetAnalysis = analyzeBudget(input.budget);
  const requirementAnalysis = analyzeRequirements(input);

  const prompt = `You are a lead-qualification analyst for NorthFlow AI, an AI automation agency. Assess this inbound lead and decide whether it's worth a rep's time.

Lead details:
- Company: ${input.company ?? "not specified"}
- Service requested: ${input.service ?? "not specified"}
- Budget: ${input.budget !== null ? `$${input.budget.toLocaleString()}` : "not specified"}
- Timeline: ${input.timeline ?? "not specified"}
- Description: ${input.description ?? "not specified"}

Rule-based signals already computed (use these as input, not as the final answer — apply judgment about intent and fit too):
- Budget tier: ${budgetAnalysis.tier} — ${budgetAnalysis.reason}
- Requirement completeness: ${requirementAnalysis.score}/100 — ${requirementAnalysis.reason}

Respond with ONLY valid JSON, no other text, no markdown fences:
{"status": "qualified" | "not_qualified" | "needs_review", "score": <0-100 integer>, "reason": "one or two sentence explanation"}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY as string,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const textBlock = (data.content as Array<{ type: string; text?: string }>)?.find(
    (block) => block.type === "text"
  );
  if (!textBlock?.text) throw new Error("Anthropic API returned no text content");

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned) as { status: QualificationStatus; score: number; reason: string };

  if (!["qualified", "not_qualified", "needs_review"].includes(parsed.status)) {
    throw new Error(`Anthropic API returned an unrecognized status: ${parsed.status}`);
  }

  return {
    status: parsed.status,
    score: Math.max(0, Math.min(100, Math.round(Number(parsed.score)))),
    reason: parsed.reason,
    budgetAnalysis,
    requirementAnalysis,
    source: "anthropic",
  };
}

/**
 * Server-side lead qualification service.
 *
 * Workflow: NEW LEAD → AI ANALYSIS → BUDGET ANALYSIS → REQUIREMENT ANALYSIS
 * → QUALIFICATION → ACTION
 *
 * Calls the real Anthropic API when ANTHROPIC_API_KEY is set. Without a
 * key — or if the live call fails for any reason — falls back to the
 * rule-based implementation above, which is clearly labeled via
 * `result.source` rather than presented as AI output.
 */
export async function qualifyLead(input: QualificationInput): Promise<QualificationResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return ruleBasedQualify(input);
  }

  try {
    return await aiQualify(input);
  } catch (error) {
    console.error("[qualifyLead] Anthropic call failed, using rule-based fallback:", error);
    return ruleBasedQualify(input);
  }
}
