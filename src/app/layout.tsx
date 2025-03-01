import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";
import { getEmail } from "./lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/providers/SessionProvider";
import NavbarAuth from "@/components/NavbarAuth";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "ZeroTag",
    description: "",
};

async function Navbar() {
  <NavbarAuth/>
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession()
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar />
                  <SessionProvider session={session}>
                    {children}
                  </SessionProvider>
                <Toaster />
            </body>
        </html>
    );
}
