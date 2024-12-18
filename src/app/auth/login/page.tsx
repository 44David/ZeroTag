'use client'

import { Button } from "@/components/ui/button";
import { KeyRound, User } from "lucide-react";
import { FormEvent } from "react"

export default function Login() {


    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: formData,
        })
        
        const data = await response.json()
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="h-screen flex items-center justify-center flex-col space-y-2">

                <User />
                <input type="email" id="email-addr" className="text-black border-2 rounded-md p-2" name="email" placeholder="Email Address"></input>
                <KeyRound />
                <input type="password" id="pass" name="password" className="text-black border-2 rounded-md p-2" placeholder= "Password"></input>

                <Button>Log In</Button>
            </div>
        </form>

    )
}