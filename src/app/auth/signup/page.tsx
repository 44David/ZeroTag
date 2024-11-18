'use client'

import { redirect } from "next/navigation";
import { FormEvent } from "react"

export default function Signup() {

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            body: formData,
        })
        
        const data = await response.json();
        
        location.reload()

    }

    return (

        <div>
            <form onSubmit={onSubmit}>

                <h1>Sign up</h1>
                <input type="email" id="email-addr" className="text-black border-2" name="email"></input>
                
                <input type="password" id="pass" name="password" className="text-black"></input>

                <button type="submit">Submit</button>
            </form>


        </div>

    )
}