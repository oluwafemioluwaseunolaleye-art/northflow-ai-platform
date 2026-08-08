export interface Automation {
  id: string;
  name: string;
  description: string | null;
  triggerLabel: string | null;
  actions: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EmailTemplateKey = "qualified" | "not_qualified";

export interface EmailTemplate {
  key: EmailTemplateKey;
  subject: string;
  body: string;
  bookingLink: string | null;
  followUpInstructions: string | null;
  updatedAt: string;
}
