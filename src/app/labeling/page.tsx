export default function Labeling() {
    let res = fetch("http://localhost:3000/api/labeling")
    console.log(res)
    return (
        <h1>Hello</h1>
    )
}