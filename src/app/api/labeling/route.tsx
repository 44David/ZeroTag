import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"



export async function GET() {
    // await  pool.query('SELECT username FROM test_table', function (err, result, fields) {
    //     if (err) throw err;
    //     return NextResponse.json({'returned query': result})
   
    //@ts-ignore
    function get_query(callback){
        pool.query('SELECT username FROM test_table', function (err, result) {
            if (err) {
                throw err;
            } 
            res = result[0]
            return callback(result[0]);
        })
    }

    let res = '';
    let res_query

    get_query(res_query = (result) => {
        res = result

    })

    console.log('Outside of callback', res)


    return NextResponse.json({"Hello":"Hello"})




}