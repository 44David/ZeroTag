import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
// const Cookies = require('js-cookie')

export async function POST(req: NextRequest, res: NextResponse) {

    const formData = await req.formData();

    const inputLabels = formData.get("input-labels")

    // const cookieStore = await cookies();
    // const sessionValue = cookieStore.get('session')?.value;
    // const has = cookieStore.has('session')

    // console.log(has)

    //  console.log(Cookies.get('session')) 


    //const [rows] = await pool.query('SELECT * FROM users WHERE session_value=(?)', );

    //@ts-ignore
    //const [row] = rows;
    //const queryEmail = row.email_address;

    try {
        pool.query("INSERT INTO labels (input_labels) VALUES (?)", inputLabels)
        return NextResponse.json({"message": "Success"}, { status: 200 })

    } catch (err:any) {
        return NextResponse.json({ error: "Could not insert input label values" }, {status: 500})
    }
    
}