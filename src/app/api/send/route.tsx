import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getEmail } from "@/app/lib/session";
import ollama from 'ollama';


export async function POST(req: NextRequest, res: NextResponse) {

    const formData = await req.formData();

    const inputLabels = formData.get("input-labels")

    const queryEmail = await getEmail();

    try {
        pool.query("INSERT INTO labels (input_labels, email_address) VALUES (?, ?)", [inputLabels, queryEmail])
        
        const response = await ollama.chat({
            model: 'llama3.2-vision',
            messages: [{
                role: 'user',
                content: 'What do you see in this image?',
                // images: ['images.jpg']
            }]
        })

        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {
        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}