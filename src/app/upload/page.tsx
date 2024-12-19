'use client'

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"

export default function Upload() {
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState('');


    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("image", file)

        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
    };

    async function handleChange(event:any) {
        setFile(URL.createObjectURL(event.target.files[0]))

        return event.target.files[0].blob()
    };

    //@ts-ignore
    const s3Client = new S3Client({
      region,
      credentials: {
      accessKeyId,
      secretAccessKey
      }
    })

    async function s3Upload() {
      const uploadParams = {
        Bucket: bucketName, 
        Body: file
        Key: 
        Content: 
      };
      
      return s3Client.send(new PutObjectCommand(uploadParams))

    };

    return (
        <form onSubmit={onSubmit}>

            <input 
                type="text" 
                name="input-labels"
                placeholder="Input Labels"  
                id="input-labels"
                disabled={isChecked}
                className="block rounded-md border-2"
            />

            <input
                type='checkbox'
                value="auto-label"
                name="box"
                id="box"
                onChange={(e) => setIsChecked(e.target.checked)}
            />

            <label htmlFor="box">Automatically create labels?</label>

            <input type="file" className="block" onChange={handleChange}/>

            <Image src={file} width={250} height={500} alt=""/>

            <Button className="block">Submit</Button>

        </form>
    )
}