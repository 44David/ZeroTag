import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"

export async function GET(request) {
    // await  pool.query('SELECT username FROM test_table', function (err, result, fields) {
    //     if (err) throw err;
    //     return NextResponse.json({'returned query': result})
   
    //@ts-ignore
    let f;
    let query_result = await pool.query('SELECT username FROM test_table', f = function (err, result) {
        if (err) {
            throw err;
        } 
        
        return result
    })

   console.log(f)

//    return NextResponse.json({ 'query': query_result})
    return NextResponse.json({ 'query': 'Hello'})


}