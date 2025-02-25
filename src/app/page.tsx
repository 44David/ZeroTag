'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';


export default function Home() {

  return (
    <>
        <div className="min-h-screen text-center p-24">
            <h1 className="bg-gradient-to-r from-blue-300 to-purple-500 text-transparent bg-clip-text text-9xl inline">
              Zero 
            </h1>
            <h1 className="inline text-9xl">
              Tag
            </h1>
            
          <br></br>
          <p className="text-xl">Label, Categorize, and Store your images in seconds</p>
          <br></br>
          <Link href={"/upload"}>
            
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md
              font-medium text-white rounded-lg group bg-gradient-to-br from-blue-300 to-purple-500 
              group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
              hover:shadow-md hover:shadow-purple-300">
                
              <span className="relative px-16 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Try it out 
              </span>
            </button>
          </Link>
        </div>
    </>
  );

}
