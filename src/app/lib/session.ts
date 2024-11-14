import pool from "./db";
import { cookies } from "next/headers";

export async function getEmail() {
    
    const cookieStore = await cookies();

    const sessionValue = cookieStore.get('session')?.value;
    
    const [rows] = await pool.query('SELECT * FROM users WHERE session_value=(?)', sessionValue);

    //@ts-ignore
    const [row] = rows;
    const queryEmail = row.email_address;

    return queryEmail

}