export default async function Logout() {

    const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST"
    });

    const data = await res;


}