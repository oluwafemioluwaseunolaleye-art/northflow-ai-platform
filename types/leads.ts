export type LeadStatus =
  | "new"
  | "qualified"
  | "not_qualified"
  | "contacted"
  | "booked"
  | "closed";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "qualified",
  "not_qualified",
  "contacted",
  "booked",
  "closed",
];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  qualified: "Qualified",
  not_qualified: "Not Qualified",
  contacted: "Contacted",
  booked: "Booked",
  closed: "Closed",
};

export type QualificationStatus = "qualified" | "not_qualified" | "needs_review";

export const QUALIFICATION_LABELS: Record<QualificationStatus, string> = {
  qualified: "Qualified",
  not_qualified: "Not Qualified",
  needs_review: "Needs Review",
};

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: number | null;
  timeline: string | null;
  description: string | null;
  status: LeadStatus;
  qualificationStatus: QualificationStatus | null;
  qualificationScore: number | null;
  qualificationReason: string | null;
  qualifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
}

export interface LeadEmailActivity {
  id: string;
  leadId: string;
  direction: "inbound" | "outbound";
  subject: string | null;
  snippet: string | null;
  sentAt: string;
}

export interface LeadAppointment {
  id: string;
  leadId: string | null;
  scheduledAt: string | null;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  notes: string | null;
  createdAt: string;
}

export interface LeadAutomationActivity {
  id: string;
  leadId: string | null;
  automationName: string;
  action: string;
  createdAt: string;
}
