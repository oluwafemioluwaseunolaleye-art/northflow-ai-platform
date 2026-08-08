import { Mail, StickyNote, CalendarClock, Zap } from "lucide-react";
import { Card } from "@/components/ui";
import { AddNoteForm } from "./AddNoteForm";
import type { LeadActivity } from "@/lib/leads";
import { formatDate } from "@/utils/format";

function Section({
  icon: Icon,
  title,
  isEmpty,
  emptyLabel,
  children,
}: {
  icon: typeof Mail;
  title: string;
  isEmpty: boolean;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon size={16} strokeWidth={1.75} className="text-muted" />
        {title}
      </div>
      {isEmpty ? (
        <p className="mt-2 text-sm text-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-3">{children}</ul>
      )}
    </div>
  );
}

function ActivityRow({ title, detail, date }: { title: string; detail: string | null; date: string }) {
  return (
    <li className="rounded-lg border border-border/60 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="shrink-0 text-xs text-muted">{formatDate(date)}</p>
      </div>
      {detail && <p className="mt-1 text-sm text-muted">{detail}</p>}
    </li>
  );
}

export function ActivityFeed({ leadId, activity }: { leadId: string; activity: LeadActivity }) {
  const { notes, emails, appointments, automationActivity } = activity;

  return (
    <Card>
      <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Activity</h2>

      <div className="mt-5 flex flex-col gap-8">
        <Section
          icon={Mail}
          title="Emails"
          isEmpty={emails.length === 0}
          emptyLabel="No emails logged yet."
        >
          {emails.map((email) => (
            <ActivityRow
              key={email.id}
              title={`${email.direction === "outbound" ? "Sent" : "Received"}: ${email.subject ?? "(no subject)"}`}
              detail={email.snippet}
              date={email.sentAt}
            />
          ))}
        </Section>

        <Section
          icon={StickyNote}
          title="Notes"
          isEmpty={notes.length === 0}
          emptyLabel="No notes yet."
        >
          {notes.map((note) => (
            <ActivityRow key={note.id} title="Note" detail={note.content} date={note.createdAt} />
          ))}
        </Section>

        <Section
          icon={CalendarClock}
          title="Appointments"
          isEmpty={appointments.length === 0}
          emptyLabel="No appointments booked yet."
        >
          {appointments.map((appt) => (
            <ActivityRow
              key={appt.id}
              title={`Appointment — ${appt.status.replace("_", " ")}`}
              detail={appt.notes}
              date={appt.scheduledAt ?? appt.createdAt}
            />
          ))}
        </Section>

        <Section
          icon={Zap}
          title="Automation Activity"
          isEmpty={automationActivity.length === 0}
          emptyLabel="No automation activity yet."
        >
          {automationActivity.map((item) => (
            <ActivityRow
              key={item.id}
              title={item.automationName}
              detail={item.action}
              date={item.createdAt}
            />
          ))}
        </Section>

        <div className="border-t border-border pt-5">
          <AddNoteForm leadId={leadId} />
        </div>
      </div>
    </Card>
  );
}
