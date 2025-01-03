import { getEmail } from "../lib/session";

export default async function Files() {

    let res = await fetch("http://localhost:3000/api/files", {
        method: 'POST',
        body: JSON.stringify({ "email": await getEmail() }),
    })

    const data = await res.json();
    console.log(data)

    return (
        <div className="">

            {data.Images}
            
        </div>
    )
}