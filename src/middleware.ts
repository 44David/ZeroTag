import pool from "@/app/lib/db";
import { getEmail } from "./app/lib/session";
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from "next/headers";


export async function middleware(req: NextRequest) {

    const cookieStore = await cookies();
    const cookieExists = cookieStore.has('session');
    console.log(cookieExists)

    if (cookieExists) {
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


    

