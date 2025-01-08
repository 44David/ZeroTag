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
        <Link href={"/upload"}><Button className="p-5 bg-custom-blue hover:bg-teal-900"><ArrowUpRight/>Try it out</Button></Link>
      </div>
    </>
  );

}
