'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';


export default function Home() {

  return (
    <>
        <div id="main-page" className="min-h-screen text-center p-24">
            <h1 className="font-normal bg-gradient-to-r from-blue-300 to-purple-500 text-transparent bg-clip-text text-9xl inline">
              Zero
            </h1>
            <h1 className="font-light inline text-9xl">
              Tag
            </h1>
            
          <p className="text-xl mt-10">Label, Categorize, and Store your images in seconds</p>
          <br></br>
          <Link href={"/upload"}>
            <Button className="bg-white text-black hover:bg-gray-300">
              <ArrowUpRight/> Try it out
            </Button>
          </Link>
        </div>
    </>
  );

}
