import { DashboardTopbar } from "@/components/navigation";
import { Card } from "@/components/ui";

interface DashboardPagePlaceholderProps {
  title: string;
  description: string;
}

export function DashboardPagePlaceholder({ title, description }: DashboardPagePlaceholderProps) {
  return (
    <>
      <DashboardTopbar title={title} />
      <div className="px-5 py-8 lg:px-8">
        <h1 className="font-display text-xl text-foreground lg:hidden">{title}</h1>
        <Card className="mt-4 lg:mt-0">
          <p className="text-sm text-muted">{description}</p>
        </Card>
      </div>
    </>
  );
}
