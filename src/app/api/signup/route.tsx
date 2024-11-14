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

    if (validator.isEmail(email)) {

        bcrypt.genSalt(saltRounds, function(err:any, salt:any) {  
            bcrypt.hash(password, salt, async function(err:any, hash:any) {
                
                pool.query("INSERT INTO users (email_address, password, session_value) VALUES (?, ?, ?)", [email, hash, sessionValue]);

            })
        });
        
        const response = NextResponse.json({ "message": "Signed up successfully" }, { status: 200 })

        response.headers.set('Set-Cookie', `session=${sessionValue}`)

        return response

    }  else {

        return NextResponse.json({ error: "Not a valid email address." }, { status: 500 })
    };

   
}
