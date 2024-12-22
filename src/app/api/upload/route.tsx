import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getEmail } from "@/app/lib/session";
import ollama from 'ollama';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, Type } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest, res: NextResponse) {

    const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME
    const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION
    const accessKeyId = process.env.NEXT_PUBLIC_ACCESS_KEY
    const secretAccessKey = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY

    //@ts-ignore
    const client = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    })

    async function s3Upload(fileBuffer: any, fileName: any, fileType: any) {
      const uploadParams = {
        Bucket: bucketName, 
        Body: fileBuffer,
        Key: fileName,
        ContentType: fileType
      };

      return client.send(new PutObjectCommand(uploadParams))
    };

    async function createFileBuffer(file: any) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);


      s3Upload(buffer, file.name, file.type)  
    }

    const formData = await req.formData();
    const file = await formData.get("image");

    createFileBuffer(file)



    let inputLabels;
    formData.has('input-labels') ? inputLabels = formData.get("input-labels") : inputLabels = ""
    

    const queryEmail = await getEmail();
    

    try {
        pool.query("INSERT INTO labels (input_labels, email_address) VALUES (?, ?)", [inputLabels, queryEmail])
        
        const response = await ollama.chat({
            model: 'llama3.2-vision:11b',
            messages: [{
              role: 'user',
              content: 'What is in this image?',
              images: [],
            }]
          })

        console.log(response)

        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {

        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}