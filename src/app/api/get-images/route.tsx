import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"

export async function GET() {
    try {
        //@ts-ignore
        let results = await pool.query('SELECT username FROM test_table', function (err, res, fields) {
            if (err) throw err;
        }) 

        return results

    } catch (error) {
        console.log(error)
    }
}