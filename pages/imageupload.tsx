//image upload page with supabase upload file to bucket

import { createClient } from '@supabase/supabase-js';
import {FormEvent, useState} from 'react';
import TabPage from "@/pages/tab_page";
import {Button} from "@chakra-ui/react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState<File>()

    async function handleFileUpload(file: File) {
        const { data, error } = await supabase.storage
            .from('imagesbucket')
            .upload(`public/${file.name}`, file)

        if (error) {
            console.error('Error uploading file:', error)
        } else {
            console.log('File uploaded successfully:', data)
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!selectedFile) return

        await handleFileUpload(selectedFile)
    }



    return (
        <>
            <TabPage/>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0])} />
                <Button type="submit">Upload</Button>
            </form>

        </>
    );


}