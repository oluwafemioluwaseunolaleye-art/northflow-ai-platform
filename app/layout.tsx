import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthFlow AI Platform",
  description:
    "The client dashboard and AI automation platform for NorthFlow AI — leads, qualification, automations, email workflows, appointments, and analytics in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
