import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const emailAddr = await ((await req.formData()).get('emailAddr'))

    console.log(emailAddr)

    return NextResponse.json({"Hello": "Hello"})
}