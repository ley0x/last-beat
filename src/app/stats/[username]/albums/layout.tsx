import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LastBeat - Top albums",
  description: "The Rhythm of Your Life, Quantified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>{children}</>);
}
