import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';
import {Editor} from '@/features/editor/sidebar/types';
import ImageDisplayImage from '@/features/editor/sidebar/components/image-display-image';
import {Button} from "@/components/ui/button";
import {RiDeleteBinFill} from "react-icons/ri";
import Image from "next/image";
import * as Popover from '@radix-ui/react-popover';

interface DisplayImageProps {
    s3Url: string[];
    setS3Url: Dispatch<SetStateAction<string[]>>;
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor: Editor | undefined;
    deleteOnS3: (fileSelected: string[]) => void
}

const DisplayImage: React.FC<DisplayImageProps> = ({
                                                       s3Url,
                                                       setS3Url,
                                                       loadingStates,
                                                       deleteOnS3,
                                                       handleImageLoad,
                                                       editor
                                                   }) => {
    const [isChecked, setChecked] = useState<boolean[]>(new Array(s3Url.length).fill(false));
    const [fileSelected, setFileSelected] = useState<string[]>(new Array(s3Url.length).fill(''));
    const [selectedCounter, setSelectedCounter] = useState<number>(0);
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId : any
        if (isChecked.includes(true)) {
            setShouldRender(true);
            setIsAnimating(true);
        } else if (shouldRender && !isChecked.includes(true)) {
            setIsAnimating(false)
            timeoutId = setTimeout(() => setShouldRender(false), 400)
        }
        return () => clearTimeout(timeoutId);
    }, [isChecked, shouldRender]);

    // Sync state when s3Url changes since s3Url may not be fully initialized when this component initializing.
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


    const deleteFile = async () => {
        const updatedIsChecked = isChecked.filter((check, i) => !check);
        const updatedFileSelected = fileSelected.filter((_, i) => !isChecked[i]);
        const updatedS3UrlClone = s3Url.filter((_, i) => !isChecked[i]);

        deleteOnS3(fileSelected)

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
            {shouldRender && (
                <div
                    className={`absolute bottom-5 w-full bg-white ml-[-16px] h-[10%] rounded-md flex items-center px-5 justify-between 
                        ${isAnimating ? 'animate-slideUpAndFade' : 'animate-slideDownAndFade'}
                    `}

                >
                    <p>{selectedCounter} selected</p>
                    <div>
                        <Popover.Root>
                            <Popover.Trigger>
                                <Button variant='ghost'>
                                    <RiDeleteBinFill className='mb-[1px] size-4'/>
                                </Button>
                            </Popover.Trigger>
                            <Popover.Portal>
                                <Popover.Content
                                    className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideUpAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                                    sideOffset={5}
                                >
                                    <p>Delete {selectedCounter} item(s)?</p>
                                    <div className='flex justify-end gap-2 mt-5'>
                                        <Popover.Close>
                                            <Button variant='outline'>Cancel</Button>
                                        </Popover.Close>
                                        <Button variant='destructive' onClick={deleteFile}>Delete</Button>
                                    </div>
                                    <Popover.Arrow className="fill-white"/>
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>

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