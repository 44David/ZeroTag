import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    // const cookieStore = await cookies();
    // cookieStore.delete('session')

    const response = NextResponse.json({"success": "done"}, { status: 200 });
    response.headers.set('Clear-Site-Data', "cookies");
    // response.headers.delete('cookies', '')
    return response
}