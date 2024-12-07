import Image from "next/image";
import pool from "./lib/db";
import { cookies } from "next/headers";

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

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">  
        
      </div>
    </>
  );

}
