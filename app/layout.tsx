import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Shelf Finder",
  description: "A simple private library location finder demo."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
