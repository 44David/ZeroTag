export default async function Labeling() {
    let res = await fetch("http://localhost:3000/api/labeling")

    const data = await res.json();
    console.log(data.Labels)


    return (
        <h1></h1>
    )
}