import Image from "next/image";
import pool from "./lib/db";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Upload } from 'lucide-react';


export default async function Home() {

  const cookieStore = await cookies();
  let email;
  
  if (cookieStore.has('session')) {
    email = true;
  } else {
    email = false;
  }

  return (
    <>
        
      <div className="flex min-h-screen flex-col items-center p-24">  
        <h1 className="text-7xl">Image Annotation Tool</h1>

        {/* <h1 className="align-middle font-bold">Start annotating images</h1> */}
        <Link href={"/upload"}><Button className=""><Upload/></Button></Link>
      </div>
    </>
  );

}
