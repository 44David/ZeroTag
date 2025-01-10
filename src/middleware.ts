import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'


export async function middleware(req: NextRequest) {

    if (req.url == "/logout") {
        const response = NextResponse.redirect(new URL('/auth/signup', req.url));
        await (await cookies()).delete('session')
        return response

    }

    const cookieStore = await req.cookies;

    if (cookieStore.has('session')) {
        return NextResponse.next()
    } 

    return NextResponse.redirect(new URL('/auth/signup', req.url))
    
}

export const config = {
    matcher: [
        '/upload',
        '/files',
    ]
}   


    

