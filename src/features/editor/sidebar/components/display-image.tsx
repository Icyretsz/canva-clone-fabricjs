import React, {useState} from 'react';
import {Loader2} from "lucide-react";
import {Editor} from "@/features/editor/sidebar/types";
import ImageDisplayImage from "@/features/editor/sidebar/components/image-display-image";


interface DisplayImageProps {
    s3Url: string[];
    loadingStates: boolean[];
    handleImageLoad: (i: number) => void;
    editor: Editor | undefined
}

const DisplayImage: React.FC<DisplayImageProps> = ({s3Url, loadingStates, handleImageLoad, editor}) => {

    const [isChecked, setChecked] = useState<boolean[]>(new Array(s3Url.length).fill(false));

    return (
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
    );
};

export default DisplayImage;
