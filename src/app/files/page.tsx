import { getEmail, getPrompt } from "../lib/session";
import { getUrl, deleteImage } from "@/lib/s3";
import pool from "../lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function Files() {
    let res = await fetch("http://localhost:3000/api/files", {
        method: "POST",
        body: JSON.stringify({ email: await getEmail() }),
    });

    const data = await res.json();
    const imageNames = data.Images;
    const prompts = data.prompts;

    return (
        <>
        <h1 className="text-7xl text-center font-bold">Processed Images</h1>
        <br></br>
        <h3 className="text-center border-b-2 pb-4">The images you've processed using the models will show up here.</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {imageNames != "No images" ? (
                imageNames.map(async (imageName:string, index:number) => (
                    <div key={index} className="relative w-full h-64">
                        <Link href={await getUrl(imageName)}>
                            <Image
                                src={await getUrl(imageName)}
                                alt={`Image ${index}`}
                                objectFit="cover"
                                width={700}
                                height={700}
                                className="rounded-lg shadow-sm shadow-white"
                            />
                        </Link>
                        <p className="">{getPrompt(imageName)}</p>
                    </div>
                ))
            ) : (
                <div className="">
                    <p>No images found to show</p>
                </div>
            )}
        </div>
        </>
    );
}
