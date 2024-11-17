import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";
import { getEmail } from "./lib/session";
import Link from "next/link";

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
  title: "Create Next App",
  description: "Generated by create next app",
};


async function Navbar() {
  const cookieStore = await cookies();
  let email;
  if (cookieStore.has('session')) {
    email = true;
  } else {
    email = false;
  }
  return (
    <nav className="flex justify-between w-full p-4 mb-4 text-xl border-b-4">

      <div>{email ?  getEmail() : <Link href={"/auth/signup"}>Sign In</Link>}</div>
      {email ? <button>Log out</button> : <div></div>}

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
      </body>
    </html>
  );
}
