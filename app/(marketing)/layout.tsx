import { MarketingNavbar, MarketingFooter } from "@/components/navigation";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingNavbar />
      <main>{children}</main>
      <MarketingFooter />
    </>
  );
}
