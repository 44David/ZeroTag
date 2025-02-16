import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function GET() {
    let models: string[] = []

    try {
        const listModels = await ollama.list();
        models = listModels.models.map((model: any) => model.name);
    } catch (error) {
        
        models = ["No local models found."]
    }

    return NextResponse.json({"models": models})

    
}


