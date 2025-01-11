'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';


export default function Home() {

  return (
    <>
        
      <div className="flex min-h-screen flex-col items-center p-24">  
        <h1 className="text-7xl">Image Annotation Tool</h1>
        <p>A simple tool to annotate images with Tensorflow models.</p>
        <Link href={"/upload"}><Button className="p-5 bg-custom-blue hover:bg-teal-900 shadow-teal-900 before:ease relative overflow-hidden text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"><ArrowUpRight/>Try it out</Button></Link>
      </div>
    </>
  );

}
