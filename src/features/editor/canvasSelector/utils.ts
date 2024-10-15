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
        //thumbnails: string[],
        page?: number,
    ) => {
        return new Promise<void>((resolve) => {
            editor.canvas.clone((canvasClone: fabric.Canvas) => {
                canvasClone.setWidth(originalWorkspaceDimension[0]);
                canvasClone.setHeight(originalWorkspaceDimension[1]);

                let objects: fabric.Object[] = page
                    ? canvasClone.getObjects().filter(object => Number(object.name) === page)
                    : canvasClone.getObjects();

                let imagesToLoad: fabric.Image[] = objects.filter(object =>
                    object.type === 'image' && object instanceof HTMLImageElement && !(object as HTMLImageElement).complete
                ) as fabric.Image[];

                const setObjectVisibility = () => {
                    objects.forEach(object => {
                        if (!page) {
                            const isCurrentPageObject = Number(object.name) === editor?.currentPage || object.name === 'clip';
                            object.set({opacity: isCurrentPageObject ? 1 : 0});
                        } else {
                            object.set({ opacity: 1})
                        }
                    });
                    canvasClone.renderAll();
                    const url = canvasClone.toDataURL({ format: 'jpeg', quality: 0.2 });
                    if (page) {
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
            //const thumbnails : string[] = [...editor.pageThumbnails]
            if (page) {
                await cloneCanvasAndGenerateThumbnail(editor, originalWorkspaceDimension, page);
                // flushSync(() => {
                //     editor.setPageThumbnails(thumbnails);
                // });
            } else {
                await cloneCanvasAndGenerateThumbnail(editor, originalWorkspaceDimension)
                // flushSync(() => {
                //     editor.setPageThumbnails(thumbnails);
                // });
            }

        }
    };

    return { getCanvasThumbnail };
}

export default useCanvasThumbnail;
