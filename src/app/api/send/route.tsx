import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const formData = await req.formData();

    const inputLabels = formData.get("input-labels")

    try {
        pool.query("INSERT INTO labels (input_labels, email_address) VALUES (?, ?)", inputLabels)
        return NextResponse.json({"message": "Success"}, { status: 200 })
    } catch (err:any) {
        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}