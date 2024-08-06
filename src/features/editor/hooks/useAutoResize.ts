import {useCallback, useEffect} from 'react';
import {fabric} from "fabric";

interface UseAutoResizeProps {
    canvas: fabric.Canvas | null
    container: HTMLDivElement | null
}

const UseAutoResize = ({canvas, container}: UseAutoResizeProps) => {

    const autoZoom = useCallback(() => {
        if (!canvas || !container) return;

        if (container && canvas) {
            const width = container.offsetWidth
            const height = container.offsetHeight

            canvas.setWidth(width)
            canvas.setHeight(height)

            const zoomRatio: number = 0.90 //to leave space between localWorkspace and canvas

            const center = canvas.getCenter()
            const localWorkspace = canvas
                .getObjects()
                .find((object) => object.name === "clip")

            if (!localWorkspace) return

                // @ts-ignore
                const scale = fabric.util.findScaleToFit(localWorkspace, { //make sure workspace fit inside certain dimension (in this case, the dimension of canvas)
                    width: width,
                    height: height
                });

            const zoom = zoomRatio * scale //combines both, this will make localWorkspace when zooming will have space to canvas and also fit inside canvas
            canvas.setViewportTransform(fabric.iMatrix.concat()) // reset canvas's transformations
            //     viewportTransform matrix = [a, b, c, d, e, f], iMatrix = [1 0 0 1 0 0] a d = 1 means there is no scaling
            // Where:
            //
            //     [a, d] are the scaling factors.
            //     [b, c] are the skewing factors.
            //     [e, f] are the translation factors (moving left/right and up/down).
            canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)

            if (!localWorkspace) return

            const workspaceCenter = localWorkspace.getCenterPoint()
            const viewportTransform = canvas.viewportTransform


            if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) {
                return
            }

            viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0]//4 : e : move in x-axis
            viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3]//5 : f : move in y-axis
            canvas.setViewportTransform(viewportTransform)//set new viewport transform array to move the canvas
            localWorkspace.clone((cloned: fabric.Rect) => {
                canvas.clipPath = cloned
                canvas.requestRenderAll()
            })
        }


    }, [canvas, container])

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null

        if (canvas && container) {
            resizeObserver = new ResizeObserver(() => {
                autoZoom()
            })
            resizeObserver.observe(container)
        }
        return () => {
            if (resizeObserver) resizeObserver.disconnect()
        }
    }, [canvas, container, autoZoom])
};

export default UseAutoResize;