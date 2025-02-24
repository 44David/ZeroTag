"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUrl, s3Upload } from "@/lib/s3";
import { ImageUp, InfoIcon, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Upload() {
    const [file, setFile] = useState("");
    const [showFile, setShowFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [detectionPrompt, setDetectionPrompt] = useState("");
    const [ec2Api, setEc2Api] = useState("");

    let ec2Instance = process.env.NEXT_PUBLIC_EC2_INSTANCE;
    
    async function onSubmit(e: any) {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("image", file);

        async function createFileBufferAndUpload(file: any) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            await s3Upload(buffer, file.name, file.type);
        }

        await createFileBufferAndUpload(file);

        const imageUrl = await getUrl(file.name);
        
        
        const splitPrompts = detectionPrompt.split(".")
        console.log(splitPrompts);
        
        //@ts-ignore
        const ec2Response = await fetch(ec2Api, {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                s3Url: imageUrl,
                prompt: detectionPrompt,
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
        
        // Sends image name to database for storage and future use.
        const apiResponse = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: JSON.stringify({ imageName: file.name, input: detectionPrompt }),
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
            <p className="text-xs">*Labels must be separated by periods. e.g Chair. Lamp. Couch </p>
              
            {loading ? (
                <>
                  {selectValue >= " " ? 
                    (
                      <Input
                          className="w-1/4 py-2 bg-neutral-900"
                          value={detectionPrompt}
                          onChange={(e) => setDetectionPrompt(e.target.value)}
                          placeholder="Labels (What should the model look for?)"
                          disabled
                      />
                  ) : (
                    
                      <h1></h1>
                      
                  )}

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
                  {selectValue >= " " ? 
                    (
                      <Input
                          className="w-1/4 py-2 bg-neutral-900"
                          value={detectionPrompt}
                          onChange={(e) => setDetectionPrompt(e.target.value)}
                          placeholder="Labels (What should the model look for?)"
                      />
                  ) : (
                      <h1></h1>
                  )}

                    <Button
                        className="inline-flex items-center w-1/2"
                        type="button"
                    >
                        <ImageUp />
                        <label
                            htmlFor="fileUpload"
                            className="hover:cursor-pointer"
                        >
                            Select Images
                        </label>
                    </Button>

                    <Button
                        className="inline-block bg-white w-1/2 hover:bg-gray-200 text-black align-middle"
                        type="submit"
                    >
                        Upload
                    </Button>

                    <select
                        className="p-1 px-4 bg-black rounded-lg border-2 border-neutral-700"
                        value={selectValue}
                        onChange={ 
                          (e) => { 
                            setSelectValue(e.target.value);  
                            setEc2Api(ec2Instance + e.target.value);
                          }
                        }
                    >
                        <option value="" className="bg-black">
                            Select a model
                        </option>

                        <option value="groundingdino">Grounding DINO</option>

                        <option value="owl-vit">Owl-ViT</option>
                    </select>

                    <p className="text-red-500">{errorMessage}</p>
                </>
            )}
        </form>
    );
}
