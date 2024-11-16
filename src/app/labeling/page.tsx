export default async function Labeling() {

    let res = await fetch("http://localhost:3000/api/labeling")

    const data = await res.json();

    return (
        <h1>{data.Labels}</h1>
    )
}