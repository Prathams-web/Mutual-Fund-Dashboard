import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mutual Fund App",
  description: "Developed by Prathamesh Tirlotkar",
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
