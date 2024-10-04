import useObjectStore from '@/features/editor/stores/store';
import { fabric } from 'fabric';
import { Editor } from "@/features/editor/sidebar/types";

interface GetCanvasThumbnailProps {
    editor: Editor | undefined;
}

function useCanvasThumbnail() {
    const { originalWorkspaceDimension } = useObjectStore();

    // Helper to clone canvas and generate thumbnail after ensuring images are loaded
    const cloneCanvasAndGenerateThumbnail = (
        editor: Editor,
        page: number,
        originalWorkspaceDimension: [number, number],
        thumbnails: string[]
    ) => {
        return new Promise<void>((resolve) => {
            editor.canvas.clone((canvasClone: fabric.Canvas) => {
                canvasClone.setWidth(originalWorkspaceDimension[0]);
                canvasClone.setHeight(originalWorkspaceDimension[1]);

                // Filter images that need loading
                const objects = canvasClone.getObjects();
                let imagesToLoad: fabric.Image[] = objects.filter(object =>
                    object.type === 'image' && object instanceof HTMLImageElement && !(object as HTMLImageElement).complete
                ) as fabric.Image[];

                // Process object visibility
                const setObjectVisibility = () => {
                    objects.forEach(object => {
                        const isCurrentPageObject = Number(object.name) === page || object.name === 'clip';
                        object.set({ opacity: isCurrentPageObject ? 1 : 0 });
                    });
                    canvasClone.renderAll();
                    const url = canvasClone.toDataURL({ format: 'jpeg', quality: 0.5 });
                    thumbnails.push(url);
                    resolve();
                };

                // If there are images to load, wait for them
                if (imagesToLoad.length > 0) {
                    imagesToLoad.forEach((img: fabric.Image) => {
                        const element = img.getElement() as HTMLImageElement;
                        element.addEventListener('load', () => {
                            imagesToLoad = imagesToLoad.filter(image => image !== img);
                            if (imagesToLoad.length === 0) {
                                setObjectVisibility();
                            }
                        });
                    });
                } else {
                    // No images to load, proceed immediately
                    setObjectVisibility();
                }
            }, ['name']);
        });
    };

    // Main function to generate thumbnails
    const getCanvasThumbnail = async ({ editor }: GetCanvasThumbnailProps) => {
        if (editor && editor.pageContainer.length > 0 && editor.canvas) {
            const thumbnails: string[] = [];
            const thumbnailPromises = editor.pageContainer.map(page =>
                cloneCanvasAndGenerateThumbnail(editor, page, originalWorkspaceDimension, thumbnails)
            );

            // Wait for all thumbnails to be generated
            await Promise.all(thumbnailPromises);
            editor.setPageThumbnails(thumbnails);
        }
    };

    return { getCanvasThumbnail };
}

export default useCanvasThumbnail;
