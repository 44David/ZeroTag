import { NextRequest, NextResponse } from "next/server";

export default function GET(req: NextRequest) {
    const response = NextResponse.json({"success": "done"});
    response.cookies.delete('session');

    return response
}