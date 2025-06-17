import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from 'jotai'
import { cn } from "@/lib/utils";
import { CustomBackground } from "@layout/custom-background";
import { ThemeProvider } from "@/components/providers/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LastBeat",
  description: "The Rhythm of Your Life, Quantified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`)}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CustomBackground>
              {children}
            </CustomBackground>
            <Toaster theme="system" />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
