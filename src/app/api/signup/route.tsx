import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')
const validator = require('validator');

// bcrypt variables 
const saltRounds = 10;

export async function POST(req: NextRequest, res: NextResponse) {
    
    const formData = await req.formData();

    const password = formData.get("password");
    const email = formData.get("email");

    const salt = await bcrypt.genSalt(saltRounds);
    const sessionValue = await bcrypt.hash(email, salt);


    if (validator.isEmail(email) && password?.length >= 8) {

        bcrypt.genSalt(saltRounds, function(err:any, salt:any) {  
            bcrypt.hash(password, salt, async function(err:any, hash:any) {
                
                pool.query("INSERT INTO users (email_address, password, session_value) VALUES (?, ?, ?)", [email, hash, sessionValue]);

            })
        });
        
        const response = NextResponse.json({ "error": "No Error" }, { status: 200 })

        response.headers.set('Set-Cookie', `session=${sessionValue}; Path=/`)
        return response

    } else if (password?.length < 8) {
        return NextResponse.json({ "error": "Password must be longer than 8 characters" }, { status: 403 })
    } else {

        return NextResponse.json({ "error": "An error occurred when try to sign in" }, { status: 500 })
    };

   
}
