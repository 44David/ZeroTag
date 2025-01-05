import pool from "./db";


export async function deleteImageFromDatabase(fileName: string, emailAddress: any) {
    try {
        await pool.query("DELETE FROM s3Storage WHERE email_address=(?) AND s3_url=(?)", [emailAddress, fileName])
        
    } catch (error) {
        console.log(error)
    }
}