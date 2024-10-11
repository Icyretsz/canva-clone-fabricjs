import React, {useEffect, useRef} from 'react';
import {RxDragHandleDots1} from "react-icons/rx";
import {Editor} from "@/features/editor/sidebar/types";
import {createSwapy} from 'swapy'
import {ObjectDataUrlType} from '@/features/editor/sidebar/components/position-menu'

interface LayersDndProps {
    objectDataUrl: ObjectDataUrlType[]
    setObjectDataUrl: React.Dispatch<React.SetStateAction<ObjectDataUrlType[]>>;
    editor: Editor | undefined;
    currentTab: string;
}

const LayersDnd = ({objectDataUrl, setObjectDataUrl, editor, currentTab}: LayersDndProps) => {
    const dragLayer = useRef<number>(1)
    const dragLayerOver = useRef<number>(1)

    function handleSort(first : number, last: number) {
        const objectDataUrlClone = [...objectDataUrl]
        const temp = objectDataUrlClone[dragLayer.current]
        objectDataUrlClone[dragLayer.current] = objectDataUrlClone[dragLayerOver.current]
        objectDataUrlClone[dragLayerOver.current] = temp
        setObjectDataUrl(objectDataUrlClone)
        const objects = editor?.canvas?.getObjects()
        if (objects) {
            const dragObject = objects[dragLayer.current]
            const dragObjectOver = objects[dragLayerOver.current]
            editor?.canvas?.moveTo(dragObject, dragLayerOver.current)
            editor?.canvas?.moveTo(dragObjectOver, dragLayer.current)
        }
    }


    useEffect(() => {
        const container = document.querySelector('.container')
        if (container && objectDataUrl.length > 2) {
            const swapy = createSwapy(container, {
                animation: 'dynamic'
            })
            swapy.enable(true)
            swapy.onSwap(({data}) => {
                console.log('swap', data);
            })
            swapy.onSwapEnd(({ data, hasChanged }) => {
                console.log(hasChanged);
                setObjectDataUrl(data.array)
            })

            swapy.onSwapStart(() => {
                console.log('start')
            })
            return () => {
                swapy.destroy()
            }
        }

    }, [objectDataUrl])

    const style: React.CSSProperties = {
        opacity: currentTab === 'Layers' ? 1 : 0,
        zIndex: currentTab === 'Layers' ? 999 : -999
    }

    return (
        (
            <div className="h-full w-full flex px-2" style={style}>
                <div className='h-full w-full flex flex-col gap-[5px] overflow-y-auto px-2 container'>
                    {objectDataUrl.map((data, i) => {
                        return (
                            <div
                                key={data.slotId}
                                className="relative flex h-[10%] w-full p-[5px]"
                                data-swapy-slot={`${data.slotId}`}
                                // draggable
                                // onDragStart={() => dragLayer.current = i}
                                // onDragEnter={() => dragLayerOver.current = i}
                                // onDragEnd={handleSort}
                                // onDragOver={(e) => e.preventDefault()}
                            >
                                <div className='h-full w-full flex justify-center items-center rounded-2xl border-2 border-gray-200 px-[25%] py-2' data-swapy-item={`${data.itemId}`}>
                                    <div className="absolute left-0 flex items-center h-full handle" data-swapy-handle>
                                        <RxDragHandleDots1 className="size-12" style={{color: 'gray'}}/>
                                    </div>
                                    <img src={data.itemId!} crossOrigin="anonymous" alt="object"
                                         className="h-full object-contain"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    );
};

export default LayersDnd;