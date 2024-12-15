'use client'

import { FormEvent, useState } from "react";
import Image from "next/image";

export default function Upload() {
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState('');

    async function handleChange(event:any) {
        setFile(URL.createObjectURL(event.target.files[0]))
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        s3Upload();

        const formData = new FormData(e.currentTarget);
        console.log('formData', formData)

        const response = await fetch('http://localhost:3000/api/send', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
    };

    async function s3Upload() {
        
    }



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

                <input type="file" className="block" onChange={handleChange}/>

                <Image src={file} width={250} height={500} alt="User provided image"/>

                <button type="submit" className="block">Submit</button>

            </fieldset>

        </form>
    )
}