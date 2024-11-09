'use client'

import { FormEvent } from "react"

export default function Send() {
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch('http://localhost:3000/api/send', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
    };

    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                name=""  
            />
            <button type="submit">Submit</button>
        </form>
    )
}