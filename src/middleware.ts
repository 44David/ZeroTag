import { NextRequest, NextResponse } from 'next/server'


export async function middleware(req: NextRequest) {

    // if (req.nextUrl.pathname === "/logout") {
    //     const response = NextResponse.redirect(new URL('/auth/signup', req.url));
    //     response.headers.delete('session');
    // }

    const cookieStore = await req.cookies;

    if (cookieStore.has('session')) {
        return NextResponse.next()
    } else {

    }

    return NextResponse.redirect(new URL('/auth/signup', req.url))
    
    
}

export const config = {
    matcher: [
        '/upload',
        '/labeling',
    ]
}   


    

