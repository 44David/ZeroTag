import { getEmail } from "../lib/session";
import { getUrl, deleteImage } from "@/lib/s3";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";


export default async function Files() {
    let res = await fetch("http://localhost:3000/api/files", {
        method: 'POST',
        body: JSON.stringify({ "email": await getEmail() }),
    })

    const data = await res.json();
    const imageNames = data.Images
    
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {imageNames != "No images" ? (
                imageNames.map(async (imageName, index) => (
                    <div key={index} className="relative w-full h-64">
                        <Link href={await getUrl(imageName)}>
                            <Image
                                src={await getUrl(imageName)}
                                alt={`Image ${index}`}
                                objectFit="cover"   
                                width={700}
                                height={700}
                                className="rounded-lg shadow-lg shadow-custom-blue"
                                />
                        </Link>
                    </div>
                ))
            ) : (
                <div className="">
                    <p>No images found to show</p>
                    <Link href={"/upload"}><Button className="p-5 bg-custom-blue hover:bg-teal-900 shadow-lg shadow-teal-900"><ArrowUpRight/>Upload</Button></Link>
                </div>
            )}
        </div>
    )
}