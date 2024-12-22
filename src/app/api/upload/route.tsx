import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getEmail } from "@/app/lib/session";
import ollama from 'ollama';
import { s3Upload } from '@/lib/s3'

export async function POST(req: NextRequest, res: NextResponse) {

  async function createFileBuffer(file: any) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    s3Upload(buffer, file.name, file.type)  
  };

    const formData = await req.formData();    
    const file = await formData.get("image");

    createFileBuffer(file);


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
              images: []
            }]
          })

        console.log(response)

        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {

        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}