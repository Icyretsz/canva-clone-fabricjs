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
        <div className='flex flex-col justify-between p-[50px]'>
            { rendered && <UserButton/>}
            <div><QueryClientProvider client={queryClient}>
            <FileUpload/>
            </QueryClientProvider></div>
        </div>
    );
};

export default Page;