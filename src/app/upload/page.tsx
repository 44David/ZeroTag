'use client'

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
require('dotenv').config();

export default function Upload() {
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState('');


    // const bucketName = process.env.BUCKET_NAME
    // const bucketRegion = process.env.BUCKET_REGION
    // const accessKeyId = process.env.ACCESS_KEY
    // const secretAccessKey = process.env.SECRET_ACCESS_KEY
    const { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = process.env

    //@ts-ignore
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    region: BUCKET_REGION,
    })

    async function s3Upload(fileBody:any) {
      const uploadParams = {
        Bucket: BUCKET_NAME, 
        Body: fileBody,
        Key: "image",
      };
      
      return s3Client.send(new PutObjectCommand(uploadParams))

    };


    async function onSubmit(e: any) {

        e.preventDefault();

        const formData = new FormData();
        const reader = new FileReader();

        const fileInput = e.target.elements.fileUpload
        const allFiles = fileInput.files

        s3Upload(allFiles)

        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
    };

    async function handleChange(event:any) {
        setFile(URL.createObjectURL(event.target.files[0]))
    }



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

            <input type="file" id="fileUpload" className="block" onChange={handleChange}/>

            <Image src={file} width={250} height={500} alt=""/>

            <Button className="block" type="submit">Submit</Button>

        </form>
    )
}