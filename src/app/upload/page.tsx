'use client'

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUrl, s3Upload } from "@/lib/s3";
import { ImageUp , LoaderCircle} from 'lucide-react';
import { useToast } from "@/hooks/use-toast"


export default function Upload() {
    const [file, setFile] = useState('');
    const [showFile, setShowFile] = useState('');
    const [s3File, setS3File] = useState('');
    const [loading, setLoading] = useState(false);

    const flaskServerAddr = process.env.NEXT_PUBLIC_FLASK_SERVER;

    async function onSubmit(e: any) {

        e.preventDefault();

        setLoading(true)

        const formData = new FormData();

        formData.append("image", file)  

        async function createFileBuffer(file: any) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            await s3Upload(buffer, file.name, file.type)  
        };

       await createFileBuffer(file);
        

       const imageUrl = await getUrl(file.name)

        //@ts-ignore
        const serverResponse = await fetch(flaskServerAddr, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({ s3Url: imageUrl }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        })

        const apiServerData = await serverResponse.json();
        const labelled_s3_url = apiServerData.s3_labelled_url;

        const apiResponse = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: JSON.stringify({ s3Url:  labelled_s3_url }),
        });        

        setS3File(apiServerData.s3_labelled_url)

        setLoading(false)

        const { toast } = useToast();

        // toast({
        //     title: "Success",
        //     description: "Image processed successfully, check it out in yours files."
        // })

        window.location.replace('/')




    };  

    async function handleChange(event:any) {
        setShowFile(URL.createObjectURL(event.target.files[0]))
        setFile(event.target.files[0])
    }

    return (

      <form onSubmit={onSubmit} className="h-auto flex items-center justify-center flex-col space-y-2">  

            <Image src={showFile} width={1000} height={500} alt=" " className="rounded-md"/>

            <input type="file" id="fileUpload" name="file-upload" className="block" multiple onChange={handleChange} style={{ display: 'none' }}/>

            { loading ? 

            <>
                <Button className="inline-flex items-center w-1/2" type="button" disabled>
                    <ImageUp/>
                    <label htmlFor="fileUpload" className="hover:cursor-pointer">
                        Upload 
                    </label>
                </Button>
                
                <Button className="bg-indigo-500 w-1/2 hover:bg-indigo-700 inline-flex items-center" type="submit" disabled>
                    <LoaderCircle className="animate-spin"/> Processing...
                </Button>
                <p className="text-xs text-gray-600">This may take a while.</p>
            </>

            :
            <>
                <Button className="inline-flex items-center w-1/2" type="button">
                    <ImageUp/>
                    <label htmlFor="fileUpload" className="hover:cursor-pointer">
                        Upload 
                    </label>
                </Button>

                <Button className="block bg-indigo-500 w-1/2 hover:bg-indigo-700" type="submit">
                    Submit
                </Button>
            </>
             
            }


        </form>
    )
}