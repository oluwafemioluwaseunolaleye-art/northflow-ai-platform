import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { Lead } from "@/types/leads";
import { formatDate } from "@/utils/format";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[860px] text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left text-xs font-medium uppercase tracking-wide2 text-muted">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Budget</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-border/60 last:border-0 hover:bg-foreground/5">
              <td className="px-4 py-3">
                <Link
                  href={`/dashboard/leads/${lead.id}`}
                  className="font-medium text-foreground hover:text-gold"
                >
                  {lead.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted">{lead.company ?? "—"}</td>
              <td className="px-4 py-3 text-muted">{lead.email}</td>
              <td className="px-4 py-3 text-muted">{lead.service ?? "—"}</td>
              <td className="px-4 py-3 text-muted">
                {lead.budget !== null ? `$${lead.budget.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-muted">{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
