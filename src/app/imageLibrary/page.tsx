'use client'
import React from 'react';
import FileUpload from "@/app/imageLibrary/FileUpload";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const Page = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
            <FileUpload/>
            </QueryClientProvider>
        </div>
    );
};

export default Page;