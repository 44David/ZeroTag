import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"

export default async function handler(req, res) {
    // await  pool.query('SELECT username FROM test_table', function (err, result, fields) {
    //     if (err) throw err;
    //     return NextResponse.json({'returned query': result})
   
    pool.query('SELECT username FROM test_table', function (err, result) {
        if (err) {
            throw err;
        } else {
            res.status(200).json({ 'query': result})
        }
    })
}