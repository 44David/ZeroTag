import { getEmail } from "../lib/session";
import { getUrl } from "@/lib/s3";
import Image from "next/image";


export default async function Files() {

    let res = await fetch("http://localhost:3000/api/files", {
        method: 'POST',
        body: JSON.stringify({ "email": await getEmail() }),
    })

    const data = await res.json();
    const fileName = data.Images

    return (
        <div className=""> 
            <Image src={await getUrl(fileName)} width={1000} height={500} alt=" "/>
            
        </div>
    )
}