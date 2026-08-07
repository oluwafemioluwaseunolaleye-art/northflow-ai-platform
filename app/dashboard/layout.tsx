import { redirect } from "next/navigation";
import { DashboardSidebar, DashboardMobileNav } from "@/components/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  let user = null;
  try {
    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser();
    user = fetchedUser;
  } catch {
    // Supabase isn't configured/reachable yet — treat as unauthenticated
    // rather than crashing the dashboard with an unhandled error.
  }

  // Middleware already redirects unauthenticated requests before they reach
  // here — this is a second, server-side check so the dashboard never
  // renders without a valid session even if middleware is bypassed.
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}
