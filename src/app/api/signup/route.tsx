import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')
const validator = require('validator');
const jwt = require('jsonwebtoken');
import { cookies } from "next/headers";

// bcrypt variables 
const saltRounds = 10;

export async function POST(req: NextRequest, res: NextResponse) {
    
    const formData = await req.formData();

    const password = formData.get("password");
    const email = formData.get("email");


    if (validator.isEmail(email)) {

        bcrypt.genSalt(saltRounds, function(err:any, salt:any) {  
            bcrypt.hash(password, salt, async function(err:any, hash:any) {

                const session = (await cookies()).get('session')?.value;

                const cookieStore = await cookies()
                
                cookieStore.set('session', session, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

                })
                

                pool.query("INSERT INTO users (email_address, password) VALUES (?, ?)", [email, hash]);

            })
        });

        const jwtToken = jwt.sign({email}, 'privatekey', { expiresIn: '1h'})

        
        return NextResponse.json({ "message": "Signed up successfully" }, { status: 200 })

    }  else {

        return NextResponse.json({ error: "Not a valid email address." }, { status: 500 })
    };

   
}
