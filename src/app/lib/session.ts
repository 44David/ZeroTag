'use server'

import { cookies } from 'next/headers';
const bcrypt = require('bcrypt');

export async function createSession(email:any) {

  const saltRounds = 10;


    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const salt = await bcrypt.genSalt(saltRounds);
    const emailHash = await bcrypt.hash(email, salt);

    const cookieStore = await cookies();

    cookieStore.set({
        value: emailHash,
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        domain: 'http://locahost:3000/',
        sameSite: 'lax',
        name: 'session',
      });

};




