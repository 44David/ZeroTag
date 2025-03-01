import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NavbarAuth() {
  const { data: session } = useSession()
  
  
  if (session) {
    return (
      <nav className="flex justify-between p-4 w-full text-s border-b-2 border-neutral-900 bg-black">
        <div className="flex items-center space-x-4">
          <Link href={'/'}>Welcome, {session.user?.email}</Link>
        </div>
      
        <div className="flex justify-center flex-grow space-x-96 items-center text-lg">
          <Link href={'/upload'}>Image Inference</Link>
          <Link href={'/files'}>Processed Images</Link>
          )
        </div>
          
        <div className="flex items-center space-x-4">
          <Button className="bg-black"><Link href={'api/auth/logout'}>Log Out</Link></Button>
        </div>
          
      </nav>
    )
  } else {
      return (
        <nav className="flex justify-between p-4 w-full text-s border-b-2 border-neutral-900 bg-black">
          <Button className="bg-black"><Link href={"/api/auth/signin"}>Sign In</Link></Button>
        </nav>
      )
  }
  
}