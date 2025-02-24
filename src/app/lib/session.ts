import { redirect } from "next/navigation";
import pool from "./db"
import { cookies } from "next/headers";

export async function getEmail() {
    
    try { 
        const cookieStore = await cookies();

        const sessionValue = cookieStore.get('session')?.value;
        
        const [rows] = await pool.query('SELECT * FROM users WHERE session_value=(?)', sessionValue);

        //@ts-ignore
        const [row] = rows;
        const queryEmail = row.email_address;

        return queryEmail

    } catch (error) {
        return ""
    }
}

export async function getPrompt(imageName:string) {
  try {
    const [rows] = await pool.query('SELECT prompt from s3Storage WHERE s3_url=(?)', imageName);
    const [row] = rows
    
    return row.prompt;
  }
  
  catch(error) {
    return "";
  }
}

