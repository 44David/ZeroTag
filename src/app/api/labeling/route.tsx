import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"

export async function GET() {
    const [rows] = await pool.query('SELECT * FROM test_table')
    console.log(rows)

    return NextResponse.json({"test": "test"})

}