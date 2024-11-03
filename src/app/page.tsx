import Image from "next/image";
import pool from "./lib/db";
export default async function Home() {

  pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Solution is: ', results[0].solution);
})

  return (
    <>
    
      <div className="float-left relative border-r h-screen pr-11">
          <h1>Hello</h1>
      </div>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">  
        
      </div>
    </>
  );

}
