import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";
import { getEmail } from "./lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

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
  title: "Image Labeling",
  description: "",
};


async function Navbar() {
  const cookieStore = await cookies();

  let email;
  cookieStore.has('session') ? email = true : email = false

  return (
    <nav className="flex justify-between items-center w-full p-4 mb-4 text-xl border-b-2 border-custom-blue">
      
    { email 
      
      ? 
      
      <>        
        <Link href={'/'}>{getEmail()}</Link>
        <Link href={'/upload'}>Upload</Link>
        <Link href={'/files'}>Files</Link>
        <Button className="bg-custom-blue hover:bg-teal-900"><Link href={'/logout'}>Log Out</Link></Button> 

      </>

      : 
      <Link href={"/auth/signup"}>Sign In</Link>
      
    }

    </nav>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
