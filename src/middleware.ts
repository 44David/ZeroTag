import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {

    const cookieStore = await req.cookies;

    
    if (req.nextUrl.pathname == "/logout" && cookieStore.has('session')) {
        await (await cookies()).delete('session')
        const response = NextResponse.redirect(new URL('/', req.url));
        return response

    }


    // if (cookieStore.has('session')) {
        // return NextResponse.next()
    // }; 


    // if (req.url == "/logout") {
    //     const response = NextResponse.redirect(new URL('/auth/signup', req.url));

    // }

    
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
}   


    

