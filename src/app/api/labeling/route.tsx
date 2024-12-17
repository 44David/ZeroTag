import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db"

export async function GET() {
    const [rows] = await pool.query("SELECT * FROM labels");

    //@ts-ignore
    if (rows.length) {
        //@ts-ignore
        const [row] = rows;

        const queryLabels = row.input_labels;

        return NextResponse.json({ "Labels": queryLabels }, { status: 200 });
    } else {
        return NextResponse.json({ "Labels": "No Images found to label." }) 
    }

}