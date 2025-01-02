import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getEmail } from "@/app/lib/session";

export async function POST(req: NextRequest, res: NextResponse) {

    const formData = await req.formData();    
    
    
    const queryEmail = await getEmail();
    
    try {
        pool.query("INSERT INTO labels (email_address) VALUES (?, ?)", [queryEmail])
        // pool.query("INSERT INTO labels (input_labels, email_address) VALUES (?, ?)", [inputLabels, queryEmail])

        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {

        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}