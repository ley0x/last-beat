import type { Metadata } from "next";

import { SidebarProvider } from "@components/ui/sidebar"

import { AppSidebar } from "@layout/app-sidebar";
import { Navbar } from "@layout/navbar";
import { Footer } from "@layout/footer";

export const metadata: Metadata = {
  title: "Image generator | LastBeat",
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
      <div className="w-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </SidebarProvider>
  </>);
}
