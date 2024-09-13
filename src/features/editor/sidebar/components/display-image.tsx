import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {Editor} from "@/features/editor/sidebar/types";
import ImageDisplayImage from "@/features/editor/sidebar/components/image-display-image";


interface DisplayImageProps {
    s3Url: string[];
    setS3Url: Dispatch<SetStateAction<string[]>> ;
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor: Editor | undefined
}

const DisplayImage: React.FC<DisplayImageProps> = ({s3Url, setS3Url, loadingStates, handleImageLoad, editor}) => {

    const [isChecked, setChecked] = useState<boolean[]>();
    const [fileSelected, setFileSelected] = React.useState<string[]>();
    const s3UrlClone = [...s3Url]

    useEffect(() => {
        setChecked(new Array(s3Url.length).fill(false))
        setFileSelected(new Array(s3Url.length).fill(""))
        //s3UrlClone = [...s3Url]
    }, [s3Url])

    const extractFileNames = () => {
        console.log('s3 before: ', s3UrlClone);
        console.log('fileSelected before: ', fileSelected);
        console.log('isChecked before: ', isChecked);

        if (fileSelected) {
            const updatedFileSelected = [...fileSelected]; // Clone the fileSelected array once

            isChecked?.forEach((checked, i) => {
                if (checked) {
                    // Add the file name to fileSelectedClone if checked
                    const fileName = s3UrlClone[i].substring(s3UrlClone[i].lastIndexOf("/") + 1);
                    updatedFileSelected[i] = fileName; // Update the specific index
                } else {
                    // Remove the file if unchecked
                    updatedFileSelected[i] = "none";
                }
            });

            // Set the new state once after the loop
            setFileSelected(updatedFileSelected);

            console.log('fileSelected after: ', updatedFileSelected);
        }
    };

    useEffect(() => {
        extractFileNames()
        console.log('s3 after: ', s3UrlClone)
        console.log('isChecked after: ', isChecked)
    }, [isChecked])

    const deleteFile = () => {

    }

    return (
        <div>
            <div className="columns-2 gap-2">
                {s3Url.map((url, i) => {
                    return <div key={i} className="relative">
                        {loadingStates[i] && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 z-10">
                                <Loader2 className="animate-spin text-muted-foreground"/>
                            </div>
                        )}
                        <fieldset>
                            <ImageDisplayImage url={url} editor={editor} handleImageLoad={handleImageLoad} i={i}
                                               isChecked={isChecked} setChecked={setChecked}/>
                        </fieldset>
                    </div>
                })}
            </div>
            {isChecked?.includes(true) && <div className='absolute bottom-[0%] w-full bg-white ml-[-16px]' onClick={deleteFile}>Delete</div>}
        </div>
    );
};

export default DisplayImage;
