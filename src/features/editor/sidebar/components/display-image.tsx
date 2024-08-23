import React from 'react';
import {Loader2} from "lucide-react";
import Image from "next/image";
import {Editor} from "@/features/editor/sidebar/types";

interface DisplayImageProps {
    s3Url: string[];
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor: Editor | undefined
}

const DisplayImage: React.FC<DisplayImageProps> = ({s3Url, loadingStates, handleImageLoad, editor}) => {
    const handleOnClick = (url: string) => {
        editor?.addMedia(url)
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            {s3Url.map((url, i) => (
                <div key={i} className="relative">
                    {loadingStates[i] && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-200 z-10">
                            <Loader2 className="animate-spin text-muted-foreground" />
                        </div>
                    )}
                    <Image
                        src={url}
                        layout="responsive"
                        objectFit="contain" // Maintain the original aspect ratio of the image
                        width={100}
                        height={100}
                        alt="uploaded image"
                        onLoadingComplete={() => handleImageLoad(i)}
                        onClick={() => handleOnClick(url)}
                        className="cursor-pointer"
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayImage;
