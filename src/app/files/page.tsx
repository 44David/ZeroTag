export default async function Files() {

    let res = await fetch("http://localhost:3000/api/files")

    const data = await res.json();

    return (
        <h1>{data.Images}</h1>
    )
}