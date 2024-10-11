import React, {Dispatch, SetStateAction, useCallback, useState} from 'react';
import Image from "next/image";
import {Editor} from "@/features/editor/sidebar/types";


interface ImageDisplayImageProps {
    editor: Editor | undefined,
    url: string,
    handleImageLoad: (i: number) => void;
    i: number,
    isChecked: boolean[] | undefined,
    setChecked: Dispatch<SetStateAction<boolean[]>>
}

// eslint-disable-next-line react/display-name
const ImageDisplayImage = React.memo(({editor, url, handleImageLoad, i, isChecked, setChecked}: ImageDisplayImageProps) => {

    const [isHovered, setHovered] = useState(false);
    const [isMenuHovered, setMenuHovered] = useState(false);

    const handleOnClick = useCallback(
        async (url: string) => {
            editor?.addMedia(url);
        },
        [editor]
    );

    const handleChecked = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isChecked) {
                const newIsChecked = [...isChecked];
                newIsChecked[i] = e.target.checked;
                setChecked(newIsChecked);
            }
        },
        [isChecked, setChecked, i]
    );

    return (
        <div className='relative'>
            <Image
                src={url}
                layout="responsive"
                objectFit="contain"
                width={100}
                height={100}
                alt="uploaded image"
                onLoadingComplete={() => handleImageLoad(i)}
                onClick={() => handleOnClick(url)}
                className="cursor-pointer mb-2 rounded-lg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            />
            {(isHovered || isMenuHovered || isChecked?.includes(true)) &&
                <div
                    className='absolute top-[7%] left-[7%] cursor-pointer bg-gray-400 bg-opacity-50 flex'
                    onMouseEnter={() => setMenuHovered(true)}
                    onMouseLeave={() => setMenuHovered(false)}>
                    <input type="checkbox" id="scales" name="scales" checked={isChecked && isChecked[i]} onChange={handleChecked}/>
                </div>
            }
        </div>
    );
});

export default ImageDisplayImage;