import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    console.log('cookies', (await cookies()).get('session'));


    const session = (await cookies()).get('session');

    console.log((await cookies()).has('session'));


    // (await cookies()).delete(session)

    const response = NextResponse.json({"success": "done"}, { status: 200 });
    // response.headers.set('Clear-Site-Data', "cookies");
    // const sessionValue = ''
    // response.headers.set('Set-Cookie', `sessions=${sessionValue}; Path=/`)
    return response
}