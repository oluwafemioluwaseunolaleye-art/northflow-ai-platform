"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowUpDown } from "lucide-react";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/types/leads";
import type { LeadsQuery } from "@/lib/leads";

const SORT_OPTIONS: { value: NonNullable<LeadsQuery["sortBy"]>; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "name", label: "Name" },
  { value: "budget", label: "Budget" },
  { value: "status", label: "Status" },
];

interface LeadsToolbarProps {
  search: string;
  status: LeadStatus | "all";
  sortBy: NonNullable<LeadsQuery["sortBy"]>;
  sortDir: NonNullable<LeadsQuery["sortDir"]>;
}

export function LeadsToolbar({ search, status, sortBy, sortDir }: LeadsToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== "all") params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ search: value }), 350);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={16}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search name, company, email..."
          className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-foreground outline-none focus:border-gold"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={status}
          onChange={(e) => updateParams({ status: e.target.value })}
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-gold"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => updateParams({ sortBy: e.target.value })}
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-gold"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => updateParams({ sortDir: sortDir === "asc" ? "desc" : "asc" })}
          title={sortDir === "asc" ? "Ascending" : "Descending"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground hover:border-gold/50"
        >
          <ArrowUpDown size={16} strokeWidth={1.75} className={sortDir === "asc" ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
}
