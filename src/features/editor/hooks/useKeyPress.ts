import {useEffect} from 'react';
import {fabric} from 'fabric';

interface UseKeyPressProps {
    canvas: fabric.Canvas | null;
    clipboard: fabric.Object | undefined;
    setClipboard: (clipboard: fabric.Object) => void;
    historyUndo: fabric.Object[][],
    setHistoryUndo: React.Dispatch<React.SetStateAction<fabric.Object[][]>>;
    historyRedo: fabric.Object[][],
    setHistoryRedo: React.Dispatch<React.SetStateAction<fabric.Object[][]>>;
}

const useKeyPress = ({
                         canvas,
                         clipboard,
                         setClipboard,
                         historyUndo,
                         historyRedo,
                         setHistoryUndo,
                         setHistoryRedo
                     }: UseKeyPressProps) => {

    useEffect(() => {
        const handleCtrlC = (event: KeyboardEvent) => {
            if (canvas) {
                const activeObject = canvas.getActiveObject()
                if (activeObject && (event.ctrlKey || event.metaKey) && event.key === 'c') {
                    activeObject.clone((cloned: fabric.Object) => {
                        setClipboard(cloned)
                    });
                }
            }
        };

        const handleCtrlV = (event: KeyboardEvent) => {
            if (canvas) {
                if (clipboard && (event.ctrlKey || event.metaKey) && event.key === 'v') {
                    const activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'textbox' && (activeObject as fabric.Textbox).isEditing) {
                        return;
                    }
                    clipboard.clone(function (cloned: fabric.Object) {
                        canvas.discardActiveObject();
                        cloned.set({
                            left: (cloned.left && cloned.left + 10),
                            top: (cloned.top && cloned.top + 10),
                            evented: true,
                        });
                        if (cloned instanceof fabric.ActiveSelection) {
                            cloned.canvas = canvas;
                            cloned.forEachObject(function (obj) {
                                canvas.add(obj);
                            });
                            cloned.setCoords();
                        } else {
                            canvas.add(cloned);
                        }
                        clipboard.set({
                            left: (cloned.left && cloned.left + 10),
                            top: (cloned.top && cloned.top + 10),
                        })
                        canvas.setActiveObject(cloned);
                        canvas.requestRenderAll();
                    });
                }
            }
        };

        const handleCtrlZ = (event: KeyboardEvent) => {
            if (canvas && (event.ctrlKey || event.metaKey) && event.key === 'z') {
                if (historyUndo && historyUndo.length > 0) {
                    console.log('hi')
                    // Remove all objects from the canvas except those with name 'clip'
                    const currentObjects = canvas.getObjects();
                    currentObjects.forEach((object) => {
                        if (object.name !== 'clip') {
                            object.off();
                            canvas.remove(object);
                        }
                    });
                    canvas.discardActiveObject();
                    canvas.renderAll();

                    // Create a copy of the history array and remove the last entry
                    const newHistoryUndo = [...historyUndo];
                    const previousState = newHistoryUndo.pop();
                    setHistoryUndo(newHistoryUndo);
                    console.log(historyUndo)

                    // If there is a previous state, add its objects back to the canvas
                    if (newHistoryUndo.length > 0) {
                        const newState = newHistoryUndo[newHistoryUndo.length - 1];
                        newState.forEach((object) => {
                            console.log(newState)
                            object.clone((cloned: fabric.Object) => {
                                canvas.add(cloned);
                            });
                        });
                    }

                    // Add the popped state to redo history
                    if (previousState) {
                        setHistoryRedo((prevHistoryRedo) => [...prevHistoryRedo, previousState]);
                    }


                }
                canvas.renderAll();
            }
        };


        window.addEventListener('keydown', handleCtrlC);
        window.addEventListener('keydown', handleCtrlV);
        window.addEventListener('keydown', handleCtrlZ);

        return () => {
            window.removeEventListener('keydown', handleCtrlC);
            window.removeEventListener('keydown', handleCtrlV);
            window.removeEventListener('keydown', handleCtrlZ);
        };
    }, [canvas, clipboard, setClipboard, historyUndo, historyRedo]);
};

export default useKeyPress;
