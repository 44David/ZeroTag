import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"


async function get_query(callback:any){
        await pool.query('SELECT username FROM test_table', function (err:any, result:any) {
            if (err) {
                throw err;
            } 
            return callback(result[0]);
        })
}

export async function GET() {
    var res = ''

    console.log(get_query(res))

    return NextResponse.json({"test": "test"})




}