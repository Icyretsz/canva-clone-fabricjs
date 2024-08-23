import React from 'react';
import { Loader2 } from "lucide-react";
import Image from "next/image";
import {Editor} from "@/features/editor/sidebar/types";

interface DisplayImageProps {
    s3Url: string[];
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor : Editor | undefined
}

const DisplayImage: React.FC<DisplayImageProps> = ({ s3Url, loadingStates, handleImageLoad, editor }) => {
    const handleOnClick = (url : string) => {
        editor?.addMedia(url)
    }
    return (
        <>
            {s3Url.map((url, i) => (
                // <div key={i} style={{ position: 'relative', width: '400px', height: '400px' }}>
                //     {loadingStates[i] && (
                //         <div style={{
                //             position: 'absolute',
                //             top: 0,
                //             left: 0,
                //             width: '100%',
                //             height: '100%',
                //             display: 'flex',
                //             justifyContent: 'center',
                //             alignItems: 'center',
                //             backgroundColor: '#f0f0f0',
                //             zIndex: 1,
                //         }}>
                //             <Loader2 className="animate-spin text-muted-foreground" />
                //         </div>
                //     )}
                    <Image
                        key={i}
                        src={url}
                        width={100}
                        height={100}
                        alt="uploaded image"
                        onLoadingComplete={() => handleImageLoad(i)}
                        onClick={() => handleOnClick(url)}
                        className='cursor-pointer'
                    />
                // </div>
            ))}
        </>
    );
};

export default DisplayImage;
