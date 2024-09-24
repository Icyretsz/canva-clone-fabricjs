import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';
import {Editor} from '@/features/editor/sidebar/types';
import ImageDisplayImage from '@/features/editor/sidebar/components/image-display-image';
import {Button} from "@/components/ui/button";
import {RiDeleteBinFill} from "react-icons/ri";
import Image from "next/image";

interface DisplayImageProps {
    s3Url: string[];
    setS3Url: Dispatch<SetStateAction<string[]>>;
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor: Editor | undefined;
}

const DisplayImage: React.FC<DisplayImageProps> = ({s3Url, setS3Url, loadingStates, handleImageLoad, editor}) => {
    const [isChecked, setChecked] = useState<boolean[]>(new Array(s3Url.length).fill(false));
    const [fileSelected, setFileSelected] = useState<string[]>(new Array(s3Url.length).fill(''));
    const [selectedCounter, setSelectedCounter] = useState<number>(0);

    // Sync state when s3Url changes
    useEffect(() => {
        setChecked(new Array(s3Url.length).fill(false));
        setFileSelected(new Array(s3Url.length).fill(''));
    }, [s3Url]);

    const extractFileNames = () => {
        const updatedFileSelected = s3Url.map((url, i) => {
            return isChecked[i] ? url.substring(url.lastIndexOf('/') + 1) : 'none';
        });
        setFileSelected(updatedFileSelected);
    };

    useEffect(() => {
        extractFileNames();
        let counter: number = 0
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
        const updatedS3UrlClone = s3Url.filter((_, i) => !isChecked[i]);

        setChecked(updatedIsChecked);
        setFileSelected(updatedFileSelected);
        setS3Url(updatedS3UrlClone);
    };

    const closeToolbar = () => {
        setChecked(new Array(s3Url.length).fill(false));
        setFileSelected(new Array(s3Url.length).fill(''));
    }

    return (
        <div>
            <div className="columns-2 gap-2">
                {s3Url.map((url, i) => (
                    <div key={i} className="relative">
                        {loadingStates[i] && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 z-10">
                                <Loader2 className="animate-spin text-muted-foreground"/>
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
                <div className="absolute bottom-5 w-full bg-white ml-[-16px] h-[10%] rounded-md flex items-center px-5 justify-between">
                    <p>{selectedCounter} selected</p>
                    <div>
                        <Button variant='ghost' onClick={deleteFile}><RiDeleteBinFill/></Button>
                        <Button variant='ghost' onClick={closeToolbar}>
                            <Image className='cursor-pointer'
                                   src='/icons-close-light.svg'
                                   width='16'
                                   height='16'
                                   alt='close icon'
                            />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayImage;