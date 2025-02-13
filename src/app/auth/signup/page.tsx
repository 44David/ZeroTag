"use client";

import { Button } from "@/components/ui/button";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Signup() {
    const [errorData, setErrorData] = useState("");

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch("http://localhost:3000/api/signup", {
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
        <div>
            <form onSubmit={onSubmit} className="">
                <div className="h-96 flex items-center justify-center flex-col space-y-2">
                    <h1 className="font-bold text-4xl mb-10">Signup.</h1>

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
                        Already have an account?{" "}
                        <Link href={"/auth/login"}>Log In</Link>
                    </p>
                    <Button className="bg-black text-white border-white border hover:bg-gray-900 px-12 rounded-xl ">
                        Signup
                    </Button>
                </div>
            </form>
        </div>
    );
}
