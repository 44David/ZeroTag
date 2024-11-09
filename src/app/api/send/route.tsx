import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await (await req.formData()).get("username")

    console.log("Req.body", data)

    const query = pool.query()
    
    return NextResponse.json({"Hello": "Hello"})
}