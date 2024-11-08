import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')

// bcrypt variables 
const saltRounds = 10;


export async function POST(req: NextRequest, res: NextResponse) {
    const password = await ((await req.formData()).get("password"))

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            const query = pool.query('INSERT INTO test_table (username) VALUES (?)', hash)
        })
    })

    return NextResponse.json({"Hello": "Hello"})
}