'use client'

import { FormEvent, useState } from "react";


export default function Send() {

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log('formData', formData)

        const response = await fetch('http://localhost:3000/api/send', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
    };

    const [isChecked, setIsChecked] = useState(false);

    return (
        <form onSubmit={onSubmit}>
            <fieldset>

                <legend>Submit Images</legend>

                <input 
                    type="text" 
                    name="input-labels"
                    placeholder="Input Labels"  
                    id="input-labels"
                    disabled={isChecked}
                    className="block"
                />

                <input 
                    type='checkbox'
                    value="auto-label"
                    name="box"
                    id="box"
                    onChange={(e) => setIsChecked(e.target.checked)}
                />

                <label htmlFor="box">Automatically create labels?</label>

                <input type="file" className="block"/>

                <button type="submit" className="block">Submit</button>

            </fieldset>

        </form>
    )
}