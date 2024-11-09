import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')
const validator = require('validator')

// bcrypt variables 
const saltRounds = 10;


export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()


    const password = formData.get("password")
    const email = formData.get("email")

    if (validator.isEmail(email)) {

        bcrypt.genSalt(saltRounds, function(err:any, salt:any) {
                
            bcrypt.hash(password, salt, function(err:any, hash:any) {

                pool.query("INSERT INTO users (email_address, password) VALUES (?, ?)", [email, hash]);

            })
        })
        
        return NextResponse.json({ status: 200 })

    }  else {

        return NextResponse.json({ error: "Not a valid email address." }, { status: 500 })
    };

   
};