import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "LastBeat - Topsters",
  description: "The Rhythm of Your Life, Quantified",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex max-h-svh h-svh flex-col">
        <Navbar />
        <div className="flex flex-col grow">
          {children}
        </div>
      </div>
    </SidebarProvider>
  </>);
}
