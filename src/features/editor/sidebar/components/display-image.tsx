import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Editor } from '@/features/editor/sidebar/types';
import ImageDisplayImage from '@/features/editor/sidebar/components/image-display-image';
import {Button} from "@/components/ui/button";
import { RiDeleteBinFill } from "react-icons/ri";

interface DisplayImageProps {
    s3Url: string[];
    setS3Url: Dispatch<SetStateAction<string[]>>;
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor: Editor | undefined;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ s3Url, setS3Url, loadingStates, handleImageLoad, editor }) => {
    const [isChecked, setChecked] = useState<boolean[]>(new Array(s3Url.length).fill(false));
    const [fileSelected, setFileSelected] = useState<string[]>(new Array(s3Url.length).fill(''));
    const [s3UrlClone, setS3UrlClone] = useState<string[]>(s3Url);
    const [selectedCounter, setSelectedCounter] = useState<number>(0);

    // Sync state when s3Url changes
    useEffect(() => {
        setChecked(new Array(s3Url.length).fill(false));
        setFileSelected(new Array(s3Url.length).fill(''));
        setS3UrlClone(s3Url);
    }, [s3Url]);

    const extractFileNames = () => {
        const updatedFileSelected = s3UrlClone.map((url, i) => {
            return isChecked[i] ? url.substring(url.lastIndexOf('/') + 1) : 'none';
        });
        setFileSelected(updatedFileSelected);
    };

    useEffect(() => {
        extractFileNames();
        let counter : number = 0
        isChecked.map((checked) => {
            if (checked) {
                counter++
            }
        })
        setSelectedCounter(counter)
    }, [isChecked]);


    const deleteFile = () => {
        const updatedIsChecked = isChecked.filter((check, i) => !check);
        const updatedFileSelected = fileSelected.filter((_, i) => !isChecked[i]);
        const updatedS3UrlClone = s3UrlClone.filter((_, i) => !isChecked[i]);

        setChecked(updatedIsChecked);
        setFileSelected(updatedFileSelected);
        setS3UrlClone(updatedS3UrlClone);
    };

    return (
        <div>
            <div className="columns-2 gap-2">
                {s3UrlClone.map((url, i) => (
                    <div key={i} className="relative">
                        {loadingStates[i] && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 z-10">
                                <Loader2 className="animate-spin text-muted-foreground" />
                            </div>
                        )}
                        <fieldset>
                            <ImageDisplayImage
                                url={url}
                                editor={editor}
                                handleImageLoad={handleImageLoad}
                                i={i}
                                isChecked={isChecked}
                                setChecked={setChecked}
                            />
                        </fieldset>
                    </div>
                ))}
            </div>
            {isChecked.includes(true) && (
                <div className="absolute bottom-5 w-full bg-white ml-[-16px] h-[10%] rounded-xl flex items-center">
                    <p>{selectedCounter} items selected</p>
                    <Button onClick={deleteFile}><RiDeleteBinFill/></Button>
                </div>
            )}
        </div>
    );
};

export default DisplayImage;