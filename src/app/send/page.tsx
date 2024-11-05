'use client'

import { FormEvent } from "react"

export default function Send() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch('http://localhost:3000/api/send', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json()
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="username" />
            <button type="submit">Submit</button>
        </form>
    )
}