"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUrl, s3Upload } from "@/lib/s3";
import { ImageUp, LoaderCircle, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Upload() {
    const [file, setFile] = useState("");
    const [showFile, setShowFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ollamaModels, setOllamaModels] = useState([]);

    useEffect(() => {
        async function fetchOllamaModels() {
            const OllamaRes = await fetch("http://localhost:3000/api/ollama");
            const res = await OllamaRes.json();
            setOllamaModels(res.models);
        }

        fetchOllamaModels();
    }, []);

    async function onSubmit(e: any) {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("image", file);

        async function createFileBuffer(file: any) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            await s3Upload(buffer, file.name, file.type);
        }

        await createFileBuffer(file);

        const imageUrl = await getUrl(file.name);

        try {
            //@ts-ignore
            const serverResponse = await fetch("http://127.0.0.1:5000/api", {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({ s3Url: imageUrl }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            setLoading(false);
            setErrorMessage(
                "An internal error has occurred, please try again later."
            );
        }

        const apiResponse = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: JSON.stringify({ imageName: file.name }),
        });

        setLoading(false);
    }

    async function handleChange(event: any) {
        setShowFile(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="h-auto flex items-center justify-center flex-col space-y-2"
        >
            {ollamaModels}

            <Image
                src={showFile}
                width={1000}
                height={500}
                alt=" "
                className="rounded-md"
            />

            <input
                type="file"
                id="fileUpload"
                name="file-upload"
                className="block"
                multiple
                onChange={handleChange}
                style={{ display: "none" }}
            />

            {loading ? (
                <>
                    <Button
                        className="inline-flex items-center w-1/2"
                        type="button"
                        disabled
                    >
                        <ImageUp />
                        <label
                            htmlFor="fileUpload"
                            className="hover:cursor-pointer"
                        >
                            Choose files
                        </label>
                    </Button>

                    <Button
                        className="bg-slate-300 w-1/2 inline-flex items-center"
                        disabled
                    >
                        <LoaderCircle className="animate-spin" /> Processing...
                    </Button>
                    <p className="text-xs text-white">This may take a while.</p>
                </>
            ) : (
                <>
                    <Button
                        className="inline-flex items-center w-1/2 bg-black hover:bg-slate-950"
                        type="button"
                    >
                        <ImageUp />
                        <label
                            htmlFor="fileUpload"
                            className="hover:cursor-pointer"
                        >
                            Choose files
                        </label>
                    </Button>

                    <Button
                        className="block bg-white w-1/2 hover:bg-slate-200 text-black"
                        type="submit"
                    >
                        Upload
                    </Button>

                    <select id="modelSelect">
				        {ollamaModels.map((model: string) => <option value="${model}">${model}</option>).join('')}
			        </select>

                    <p className="text-red-500">{errorMessage}</p>
                </>
            )}
        </form>
    );
}
