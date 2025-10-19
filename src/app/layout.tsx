import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "@/store/ReduxProvider";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical Service",
  description: "A modern medical service website built with Next.js and Tailwind CSS",
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
