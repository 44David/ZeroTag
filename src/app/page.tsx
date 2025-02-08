'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';


export default function Home() {

  return (
    <>
        
      <div className="flex min-h-screen flex-col items-center p-24">  
        <h1 className="text-7xl"></h1>
        <p></p>
        <Link href={"/upload"}><Button className="bg-white text-black hover:bg-gray-300"><ArrowUpRight/>Try it out</Button></Link>
      </div>
    </>
  );

}
