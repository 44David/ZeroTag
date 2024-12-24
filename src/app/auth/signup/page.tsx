'use client'

import { Button } from "@/components/ui/button";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react"

export default function Signup() {
    const [errorData, setErrorData] = useState('');

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            body: formData,
        })
        
        const data = await response.json();
        console.log(data.error)
        if (!(data.error == "No Error")) {
            setErrorData(data.error)
        } else {
            window.location.replace('/')
        }
        
    }  

    return (

        <div>
            <form onSubmit={onSubmit} className="">

                <div className="h-96 flex items-center justify-center flex-col space-y-2">
                <h1 className="font-bold text-4xl">Sign Up</h1>

                    <div className="relative">
                        <input 
                            type="email" 
                            className="pl-10 pr-4 py-2 w-full border rounded-md text-gray-700" 
                            id="email-addr"
                            name="email"
                            placeholder="Email Address"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>


                    <div className="relative">
                        <input 
                            type="password" 
                            className="pl-10 pr-4 py-2 w-full border rounded-md text-gray-700" 
                            id="pass"
                            name="password"
                            placeholder="Password"
                        />
                        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <p className="text-red-600">{errorData}</p>

                    <p>Already have an account? <Link href={'/auth/login'}>Log In</Link></p>
                    <Button>Sign Up</Button>
                </div>

            </form>


        </div>

    )
}