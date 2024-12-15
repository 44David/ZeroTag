import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getEmail } from "@/app/lib/session";
import ollama from 'ollama';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'


export async function POST(req: NextRequest, res: NextResponse) {
    dotenv.config();

    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

    const formData = await req.formData();

    let inputLabels;
    if (formData.has('input-labels')) {
      inputLabels = formData?.get("input-labels");
    } else {
      inputLabels = ""
    }
    


    console.log(formData.get('file'))

    const queryEmail = await getEmail();

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
        Body: 
        Key: 
        ContentType: 
      }
      
      return s3Client.send(new PutObjectCommand(uploadParams))

    };

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