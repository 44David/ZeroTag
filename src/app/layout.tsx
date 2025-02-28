import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";
import { getEmail } from "./lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Toaster } from "@/components/ui/toaster"

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
    const cookieStore = await cookies();
  
    let email;
    cookieStore.has('session') ? email = true : email = false
  
    const emailAddr:string = await getEmail()
  
    return (
        <nav className="flex justify-between p-4 w-full text-s border-b-2 border-neutral-900 bg-black">
          
          <div className="flex items-center space-x-4">
            { email && (
              <Link href={'/'}>Welcome, {(await emailAddr).split("@")[0]}</Link>
            )}
          </div>
      
          <div className="flex justify-center flex-grow space-x-96 items-center text-lg">
            { email && (
              <>
                <Link href={'/upload'}>Image Inference</Link>
                <Link href={'/files'}>Processed Images</Link>
              </>
            )}
          </div>
      
          <div className="flex items-center space-x-4">
            { email ? (
              <Button className="bg-black"><Link href={'api/auth/logout'}>Log Out</Link></Button>
            ) : (
              <Button className="bg-black"><Link href={"/api/auth/signin"}>Sign In</Link></Button>
            )}
          </div>
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
