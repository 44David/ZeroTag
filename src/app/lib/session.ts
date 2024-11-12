import { cookies } from 'next/headers';
const crypto = require('crypto')

export async function createSession(email: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const session = await encrypt({ email, expiresAt })(await cookies()).set(
      'session',
      session,
      {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
      }
    )
  }
}


