import React from 'react';
import MenuHeaderDark from "@/features/editor/sidebar/components/menu-header-dark";
import {Editor} from "@/features/editor/sidebar/types";
import FileUpload from "@/features/editor/sidebar/components/FileUpload"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'


interface UploadMenuProps {
    editor : Editor | undefined
}


const UploadMenu = ({ editor } : UploadMenuProps) => {

    const queryClient = new QueryClient()

    return (
        <div className='flex flex-col h-full w-full'>
            <MenuHeaderDark type='Upload'/>
            <div className='flex flex-col h-full w-full px-4 overflow-y-auto'>
                <QueryClientProvider client={queryClient}>
                    <FileUpload editor={editor}/>
                </QueryClientProvider>
            </div>
        </div>
    );
};

export default UploadMenu;