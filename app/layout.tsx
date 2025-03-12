import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';

import "./globals.css";
import Navbar from "@/components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trakky",
  description: "Create Your AI Based Meal Plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <link rel="icon" href="/vercel.svg" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
        >
        <Navbar/>
        {children}
        <Toaster richColors={true} />


        {/* <Footer/> */}
      </body>
    </html>
  );
}
