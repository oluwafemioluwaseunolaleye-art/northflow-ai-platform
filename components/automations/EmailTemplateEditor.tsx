"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui";
import { updateEmailTemplate } from "@/lib/actions/automations";
import type { EmailTemplate, EmailTemplateKey } from "@/types/automations";

const FORBIDDEN_PHRASE = /you are not qualified/i;

interface EmailTemplateEditorProps {
  templateKey: EmailTemplateKey;
  template: EmailTemplate;
  label: string;
}

export function EmailTemplateEditor({ templateKey, template, label }: EmailTemplateEditorProps) {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [bookingLink, setBookingLink] = useState(template.bookingLink ?? "");
  const [followUp, setFollowUp] = useState(template.followUpInstructions ?? "");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(false);
    if (templateKey === "not_qualified" && FORBIDDEN_PHRASE.test(body)) {
      setError('Keep this professional — remove "you are not qualified" from the body before saving.');
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        await updateEmailTemplate(templateKey, {
          subject,
          body,
          bookingLink: bookingLink || undefined,
          followUpInstructions: followUp || undefined,
        });
        setSaved(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save.");
      }
    });
  }

  return (
    <Card>
      <h3 className="text-xs font-medium uppercase tracking-wide2 text-gold">{label}</h3>

      <div className="mt-4 flex flex-col gap-3">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide2 text-muted">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wide2 text-muted">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={9}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-gold"
          />
          <p className="mt-1 text-xs text-muted">
            Placeholders: {"{{first_name}}"}, {"{{company}}"}
            {templateKey === "qualified" ? ", {{booking_link}}" : ", {{resources_link}}"}
          </p>
        </div>

        {templateKey === "qualified" ? (
          <div>
            <label className="text-xs font-medium uppercase tracking-wide2 text-muted">
              Booking link
            </label>
            <input
              value={bookingLink}
              onChange={(e) => setBookingLink(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold"
            />
          </div>
        ) : (
          <div>
            <label className="text-xs font-medium uppercase tracking-wide2 text-muted">
              Follow-up instructions (internal, not sent to the lead)
            </label>
            <textarea
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
            />
          </div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
        {saved && !error && <p className="text-xs text-emerald-500">Saved.</p>}

        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="h-9 rounded-full bg-gold px-5 text-xs font-medium text-midnight transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save template"}
          </button>
        </div>
      </div>
    </Card>
  );
}
