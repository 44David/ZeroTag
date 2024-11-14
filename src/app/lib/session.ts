const bcrypt = require('bcrypt');
import { cookies } from "next/headers";

export async function createSession(email:any) {

  const saltRounds = 10;


    const salt = await bcrypt.genSalt(saltRounds);
    const emailHash = await bcrypt.hash(email, salt);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  

    const cookieStore = await cookies();

    cookieStore.set({
        name: 'session',
        value: emailHash,
        expires: expiresAt,
        sameSite: 'lax', 
      });

};




