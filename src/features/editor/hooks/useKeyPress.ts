import {useEffect} from 'react';
import {fabric} from 'fabric';
import {INITIAL_CANVAS_STATE} from '@/features/editor/sidebar/types'

interface UseKeyPressProps {
    canvas: fabric.Canvas | null;
    clipboard: fabric.Object | undefined;
    setClipboard: (clipboard: fabric.Object) => void;
    historyUndo: string[],
    setHistoryUndo: React.Dispatch<React.SetStateAction<string[]>>;
    historyRedo: string[],
    setHistoryRedo: React.Dispatch<React.SetStateAction<string[]>>;
    autoZoom: () => void
}

const useKeyPress = ({
                         canvas,
                         clipboard,
                         setClipboard,
                         historyUndo,
                         historyRedo,
                         setHistoryUndo,
                         setHistoryRedo,
                         autoZoom
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

        const handleUndoRedo = (event: KeyboardEvent) => {
            if (canvas && (event.ctrlKey || event.metaKey)) {
                if (event.key === 'z') {
                    if (event.shiftKey) {
                        if (historyRedo.length > 0) {
                            let historyRedoClone = [...historyRedo];
                            const nextState = historyRedoClone.pop();
                            setHistoryRedo(historyRedoClone);

                            if (nextState) {
                                setHistoryUndo((prevState) => [...prevState, nextState]);
                                canvas.loadFromJSON(nextState, () => {
                                    canvas.renderAll();
                                });
                            }
                        }
                    } else {
                        if (historyUndo.length > 1) {
                            let historyUndoClone = [...historyUndo];
                            const previousState = historyUndoClone.pop();
                            setHistoryUndo(historyUndoClone);

                            if (previousState) {
                                setHistoryRedo((prevState) => [...prevState, previousState]);
                                const lastState = historyUndoClone[historyUndoClone.length - 1];
                                canvas.loadFromJSON(lastState, () => {
                                    canvas.renderAll();
                                });
                            }
                        }
                    }
                }
            }
            autoZoom()
        };

        const resetHistory = (event: KeyboardEvent) => {
            if (canvas && (event.ctrlKey || event.metaKey) && event.key === 'x') {
                setHistoryUndo([INITIAL_CANVAS_STATE])
                setHistoryRedo([])
                canvas.loadFromJSON(INITIAL_CANVAS_STATE, () => {
                    canvas.renderAll();
                })
                console.log('History reset')
                autoZoom()
            }
        }

        window.addEventListener('keydown', handleCtrlC);
        window.addEventListener('keydown', handleCtrlV);
        window.addEventListener('keydown', handleUndoRedo);
        window.addEventListener('keydown', resetHistory)

        return () => {
            window.removeEventListener('keydown', handleCtrlC);
            window.removeEventListener('keydown', handleCtrlV);
            window.removeEventListener('keydown', handleUndoRedo);
            window.removeEventListener('keydown', resetHistory);
        };
    }, [canvas, clipboard, setClipboard, historyUndo, historyRedo, setHistoryRedo, setHistoryUndo]);
};

export default useKeyPress;
