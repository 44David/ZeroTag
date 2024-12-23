'use client'

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Upload() {
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState('');
    const [showFile, setShowFile] = useState('');

    async function onSubmit(e: any) {

        e.preventDefault();

        const formData = new FormData();

        formData.append("image", file)  
        
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
    };

    async function handleChange(event:any) {
        setShowFile(URL.createObjectURL(event.target.files[0]))
        setFile(event.target.files[0])
    }

    return (
        <form onSubmit={onSubmit}>

            <input 
                type="text" 
                name="input-labels"
                placeholder="Input Labels"  
                id="input-labels"
                disabled={isChecked}
                className="block rounded-md border-2"
            />

            <input
                type='checkbox'
                value="auto-label"
                name="box"
                id="box"
                onChange={(e) => setIsChecked(e.target.checked)}
            />

            <label htmlFor="box">Automatically create labels?</label>

            <input type="file" id="fileUpload" className="block" multiple onChange={handleChange}/>

            <Image src={showFile} width={250} height={500} alt=""/>

            <Button className="block" type="submit">Submit</Button>

        </form>
    )
}