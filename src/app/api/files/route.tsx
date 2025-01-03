import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"

export async function POST(req: NextRequest, res: NextResponse) {

    const jsonRequest = await req.json();
    const emailAddress = await jsonRequest.email;

    const [rows] = await pool.query("SELECT s3_url FROM s3Storage WHERE email_address=(?)", emailAddress);

    // @ts-ignore
    if (rows.length) {
        //@ts-ignore
        const [row] = rows;

        const imageNames = row.s3_url;

        return NextResponse.json({ "Images": imageNames }, { status: 200 });

    } else {

        return NextResponse.json({ "Images": "No images found to load." }) 
    }
}