import type { Metadata } from "next";
import "./globals.css";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });


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
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
