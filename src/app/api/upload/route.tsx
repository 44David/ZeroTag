import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getEmail } from "@/app/lib/session";

export async function POST(req: NextRequest, res: NextResponse) {

    const requestJson = await req.json();
    const imageName = await requestJson.imageName;
    
    const queryEmail = await getEmail();
    
    try {
        pool.query("INSERT INTO s3Storage (email_address, s3_url) VALUES (?, ?)", [queryEmail, imageName])

        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {

        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}