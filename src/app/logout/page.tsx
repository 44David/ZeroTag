import { cookies } from "next/headers";

export default async function Logout() {

    const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        body: "hello",
    });

    const data = await res.json();

    console.log(data)
    

}