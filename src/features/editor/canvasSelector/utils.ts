import useObjectStore from '@/features/editor/stores/store';
import {fabric} from 'fabric';

function useCanvasThumbnail() {
    const {canvasContainer, canvasThumbnails, setCanvasThumbnails, originalWorkspaceDimension} = useObjectStore();

    const getCanvasThumbnail = () => {
        if (canvasContainer.length > 0) {
            const thumbnails: string[] = [];

            canvasContainer.forEach((canvas) => {
                canvas.clone((canvasClone: fabric.Canvas) => {
                    canvasClone.setWidth(originalWorkspaceDimension[0])
                    canvasClone.setHeight(originalWorkspaceDimension[1])
                    const url = canvasClone.toDataURL({
                        format: 'jpeg',
                        quality: 0.5,
                    });
                    thumbnails.push(url);

                    if (thumbnails.length === canvasContainer.length) {
                        setCanvasThumbnails([...thumbnails]);
                    }
                });
            });
        }
    };


    return {getCanvasThumbnail};
}

export default useCanvasThumbnail;
