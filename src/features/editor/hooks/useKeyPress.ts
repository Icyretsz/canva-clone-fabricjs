import {useEffect} from 'react';
import {fabric} from 'fabric';

interface UseKeyPressProps {
    canvas: fabric.Canvas | null;
    clipboard: fabric.Object | undefined;
    setClipboard: (clipboard: fabric.Object) => void;
    historyUndo: string[],
    setHistoryUndo: React.Dispatch<React.SetStateAction<string[]>>;
    historyRedo: string[],
    setHistoryRedo: React.Dispatch<React.SetStateAction<string[]>>;
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
                if(historyUndo.length > 1) {
                    let historyUndoClone = [...historyUndo]
                    const previousState = historyUndoClone.pop();
                    setHistoryUndo(historyUndoClone)
                    if (previousState){
                        setHistoryRedo((prevState) => [...prevState, previousState]);
                    }
                    const lastState = historyUndoClone[historyUndoClone.length - 1];
                    canvas.loadFromJSON(lastState, () => {
                        canvas.renderAll()
                    });
                } else {

                }
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
