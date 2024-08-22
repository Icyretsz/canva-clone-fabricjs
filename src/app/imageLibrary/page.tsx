'use client'
import React, {useEffect, useState} from 'react';
import FileUpload from "@/app/imageLibrary/FileUpload";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {UserButton} from "@clerk/nextjs";

const queryClient = new QueryClient()

const Page = () => {

    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])

    return (
        <div className='flex justify-between p-[50px]'>
            <QueryClientProvider client={queryClient}>
            <FileUpload/>
            </QueryClientProvider>
            { rendered && <UserButton/>}
        </div>
    );
};

export default Page;