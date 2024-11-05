import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const data = req.body;
    console.log("Req.body", data)

    return NextResponse.json({"Hello": "Hello"})
}