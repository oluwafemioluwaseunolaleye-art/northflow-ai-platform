export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
        Project scaffold
      </span>
      <h1 className="text-3xl font-semibold sm:text-4xl">NorthFlow AI Platform</h1>
      <p className="max-w-md text-sm text-muted">
        This is the initial scaffold for the NorthFlow AI Platform. The dashboard, leads,
        automations, and other application features have not been built yet.
      </p>
    </main>
  );
}
