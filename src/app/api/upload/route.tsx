import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getEmail } from "@/app/lib/session";
import ollama from 'ollama';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, Type } from "@aws-sdk/client-s3";
import multer from 'multer'
import sharp from 'sharp';
import crypto from 'crypto'


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

    async function s3Upload(fileBuffer: Buffer, fileName: string, fileType: string) {
      const uploadParams = {
        Bucket: bucketName, 
        Body: fileBuffer,
        Key: fileName,
        ContentType: fileType
      };

      return client.send(new PutObjectCommand(uploadParams))

    };

    async function formatImage(file:any) {

      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 512, width: 512, fit: "contain" })
        .toBuffer()

      s3Upload(fileBuffer, file.name, file.mimetype)  
    }

    const formData = await req.formData();
    const file = await formData.get("image");
    console.log('file', file)

  
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })

    upload.single('image'), async () => {
      formatImage(file)
    }



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