import { NextRequest, NextResponse } from 'next/server'


export async function middleware(req: NextRequest) {
    const cookieStore = await req.cookies;

    if (cookieStore.has('session')) {
        return NextResponse.next()
    } 

    return NextResponse.redirect(new URL('/auth/signup', req.url))
    
    
}

export const config = {
    matcher: [
        '/send',
        '/labeling',
    ]
}   


    

