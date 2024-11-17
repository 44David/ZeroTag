import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');
const validator = require('validator');

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();

    const password = formData.get("password");
    const email = formData.get("email");

    const [rows] = await pool.query('SELECT * FROM users WHERE email_address=(?)', email);

    //@ts-ignore
    const [row] = rows;
    const queryEmail = row.email_address;
    const hashedQueryPassword = row.password;
    const sessionValue = row.session_value;


    if (bcrypt.compareSync(password, hashedQueryPassword) && email == queryEmail) {
        const response = NextResponse.json({ "message": "Success" }, { status: 200 });
        response.headers.set('Set-Cookie', `session=${sessionValue}; Path=/`);
        return response
    }

    else if (!(bcrypt.compareSync(password, hashedQueryPassword)) && email == queryEmail) {

        return NextResponse.json({ "message": "Password does not match "}, { status: 401 });
    }

    else if (!(email == queryEmail)) {
        return NextResponse.json({ "message": "Account not found" }, { status: 401 })
    }


}