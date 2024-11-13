import pool from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {

    
    const formData = await req.formData();

    const inputLabels = formData.get("input-labels")

    const cookieStore = await cookies();
    const sessionValue = cookieStore.get('session')?.value;
    
    console.log(sessionValue)


    const [rows] = await pool.query('SELECT * FROM users WHERE session_value=(?)', sessionValue);

    //@ts-ignore
    const [row] = rows;
    const queryEmail = row.email_address;

    console.log(queryEmail)


    try {
        pool.query("INSERT INTO labels (input_labels) VALUES (?)", inputLabels)
        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {
        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}