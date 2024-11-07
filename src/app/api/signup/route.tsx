import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')

// bcrypt variables 
const saltRounds = 10;


export async function POST(req: NextRequest, res: NextResponse) {
    const password = await ((await req.formData()))


    console.log(password)

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // TODO store the hash in database
        })
    })

    return NextResponse.json({"Hello": "Hello"})
}