import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');
const validator = require('validator');

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();

    const password = formData.get("password");
    const email = formData.get("email");

    const [rows] = await pool.query('SELECT * FROM users WHERE email_address=(?)', email);


    const [row] = rows;
    const q_email = row.email_address

    console.log(q_email)


    return NextResponse.json({"Hello": "Hello"})
}