import { getEmail } from "../lib/session";
import { getUrl } from "@/lib/s3";
import Image from "next/image";
import Link from "next/link";


export default async function Files() {

    let res = await fetch("http://localhost:3000/api/files", {
        method: 'POST',
        body: JSON.stringify({ "email": await getEmail() }),
    })

    const data = await res.json();
    const imageNames = data.Images
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {imageNames.length > 0 ? (
                imageNames.map(async (imageName, index) => (
                    <div key={index} className="relative w-full h-64">
                        <Link href={await getUrl(imageName)}>
                            <Image
                                src={await getUrl(imageName)}
                                alt={`Image ${index}`}
                                objectFit="cover"   
                                width={700}
                                height={700}
                                className="rounded-lg shadow-lg"
                            />
                        </Link>
                    </div>
                ))
            ) : (
                <p>No images found</p>
            )}
        </div>
    )
}