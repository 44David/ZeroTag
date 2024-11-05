import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const data = await req.formData()
    
    console.log("Req.body", data)

    return NextResponse.json({"Hello": "Hello"})
}