import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "LastBeat - User Stats",
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
      <div className="h-screen overflow-y-scroll relative w-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </SidebarProvider>
  </>);
}
