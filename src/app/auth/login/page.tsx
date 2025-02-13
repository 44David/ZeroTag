"use client";

import { Button } from "@/components/ui/button";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
    const [errorData, setErrorData] = useState("");

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data.error);
        if (!(data.error == "No Error")) {
            setErrorData(data.error);
        } else {
            window.location.replace("/");
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="h-96 flex items-center justify-center flex-col space-y-2">
                <h1 className="font-bold text-4xl mb-10">Login.</h1>

                <div className="relative">
                    <input
                        type="email"
                        className="pl-10 pr-4 py-2 w-full outline-0 border-b-2 border-white bg-black"
                        id="email-addr"
                        name="email"
                        placeholder="Email Address"
                    />
                </div>

                <div className="relative">
                    <input
                        type="password"
                        className="pl-10 pr-4 py-2 w-full outline-0 border-b-2 border-white bg-black"
                        id="pass"
                        name="password"
                        placeholder="Password"
                    />
                </div>

                <p className="text-red-600">{errorData}</p>
                <p>
                    Don't have an account?{" "}
                    <Link href={"/auth/signup"}>Sign Up</Link>
                </p>

                <Button className="bg-black text-white border-white border hover:bg-gray-900 px-12 rounded-xl ">
                    Login
                </Button>
            </div>
        </form>
    );
}
