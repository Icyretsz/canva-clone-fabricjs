import useObjectStore from '@/features/editor/stores/store';
import {fabric} from 'fabric';


interface GetCanvasThumbnailProps {
    canvas: fabric.Canvas | null
    pageContainer: number[]
}

function useCanvasThumbnail() {
    const {setCanvasThumbnails, originalWorkspaceDimension} = useObjectStore();

    const getCanvasThumbnail = ({canvas, pageContainer} : GetCanvasThumbnailProps) => {
        if (pageContainer.length > 0 && canvas) {
            const thumbnails: string[] = [];

            pageContainer.forEach((page) => {
                canvas.clone((canvasClone: fabric.Canvas) => {
                    canvasClone.setWidth(originalWorkspaceDimension[0])
                    canvasClone.setHeight(originalWorkspaceDimension[1])
                    canvasClone.getObjects().forEach(object => {
                        if (Number(object.name) !== page && object.name !== 'clip') {
                            object.set({
                                opacity: 0
                            })
                        } else {
                            object.set({
                                opacity: 1
                            })
                        }
                    })
                    const url = canvasClone.toDataURL({
                        format: 'png',
                    })
                    thumbnails.push(url)
                }, ['name'])
            });
            if (thumbnails.length === pageContainer.length) {
                setCanvasThumbnails([...thumbnails])
            }
        }
    };

    return {getCanvasThumbnail};
}

export default useCanvasThumbnail;
