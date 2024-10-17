import useObjectStore from '@/features/editor/stores/store';
import { fabric } from 'fabric';
import { Editor } from "@/features/editor/sidebar/types";

interface UseCanvasThumbnailProps {
    editor: Editor | undefined;
}


function useCanvasThumbnail({editor} : UseCanvasThumbnailProps) {
    const { originalWorkspaceDimension } = useObjectStore();

    // Helper to clone canvas and generate thumbnail after ensuring images are loaded
    const cloneCanvasAndGenerateThumbnail = (
        editor: Editor,
        originalWorkspaceDimension: [number, number],
        page?: number,
    ) => {
        return new Promise<void>((resolve) => {
            editor.canvas.clone((canvasClone: fabric.Canvas) => {
                canvasClone.setWidth(originalWorkspaceDimension[0]);
                canvasClone.setHeight(originalWorkspaceDimension[1]);

                let objects: fabric.Object[] = canvasClone.getObjects();
                console.log('objects of canvasClone: ', objects)

                let imagesToLoad: fabric.Image[] = objects.filter(object =>
                    object.type === 'image' && object instanceof HTMLImageElement && !(object as HTMLImageElement).complete
                ) as fabric.Image[];

                const setObjectVisibility = () => {
                    if (page && page >= 1) {
                        objects.forEach(object => {
                                const isCurrentPageObject = Number(object.name) === page || object.name === 'clip';
                                object.set({opacity: isCurrentPageObject ? 1 : 0});
                        });
                    } else if (!page) {
                        objects.forEach((object) => {
                            if (object.name !== 'clip')
                            object.set({opacity : 0})
                        })
                    }

                    canvasClone.renderAll();
                    const url = canvasClone.toDataURL({ format: 'jpeg', quality: 0.2 });
                    if (page && page >= 1) {
                        editor?.setPageThumbnails(prev => {
                            const clone = [...prev]
                            clone[page - 1] = url
                            return clone
                        })
                    } else {
                        editor?.setPageThumbnails(prev =>
                            [...prev, url]
                        )
                    }
                    canvasClone.dispose();
                    resolve();
                };

                if (imagesToLoad.length > 0) {
                    imagesToLoad.forEach((img: fabric.Image) => {
                        const element = img.getElement() as HTMLImageElement;
                        if (!element.complete) {
                            element.addEventListener('load', () => {
                                imagesToLoad = imagesToLoad.filter(image => image !== img);
                                if (imagesToLoad.length === 0) {
                                    setObjectVisibility();
                                }
                            });
                        } else {
                            imagesToLoad = imagesToLoad.filter(image => image !== img);
                            if (imagesToLoad.length === 0) {
                                setObjectVisibility();
                            }
                        }
                    });
                } else {
                    setObjectVisibility();
                }
            }, ['name']);
        });
    };

    // Main function to generate thumbnails
    const getCanvasThumbnail = async ({ page }: { page?: number } = {}) => {
        if (editor && editor.pageContainer.length > 0 && editor.canvas) {
            if (page && page >= 1) {
                await cloneCanvasAndGenerateThumbnail(editor, originalWorkspaceDimension, page);
            } else if (page && page === -1) {
                console.log('page = ', page)
                for (const page1 of editor.pageContainer) {
                    console.log('page1 = ', page1);
                    await cloneCanvasAndGenerateThumbnail(editor, originalWorkspaceDimension, page1)
                }
            } else {
                await cloneCanvasAndGenerateThumbnail(editor, originalWorkspaceDimension)
            }
        }
    };

    return { getCanvasThumbnail };
}

export default useCanvasThumbnail;
