import { useRef, useEffect } from 'react';
import p5 from 'p5';
import { drawHamza } from './utils/shapes';
import { showBackground } from './utils/backgrounds';
import Navbar from './components/Navbar';

const App = () => {
    const sketchRef = useRef();

    const canvasWidthRef = useRef(400);
    const pixelLengthRef = useRef(20);
    const penSizeRef = useRef(1);
    const penTipRef = useRef("default");
    const colorRef = useRef("#333333");
    const backgroundRef = useRef("background1");

    let downloadImgFn; // Reference to the downloadImg function
    let clearDrawingFn;

    const Sketch = (p) => {
        let canvasWidth = canvasWidthRef.current;
        let pixelLength = pixelLengthRef.current;
        let penSize = penSizeRef.current;
        let pixelSize = Math.floor(canvasWidth / pixelLength);

        let backgroundLayer;
        let drawingLayer;

        p.setup = () => {
            p.createCanvas(canvasWidth, canvasWidth);
            drawingLayer = p.createGraphics(canvasWidth, canvasWidth);
            backgroundLayer = p.createGraphics(canvasWidth, canvasWidth);
            populatePixel();
        };
        
        p.draw = () => {
            p.image(backgroundLayer, 0, 0);
            p.image(drawingLayer, 0, 0);
            
            if (p.mouseIsPressed) {
                displayPixel(p.mouseX, p.mouseY);
            }

            showBackground(pixelSize, backgroundRef.current, backgroundLayer);
        };

        const populatePixel = () => {
            for (let row = 0; row < pixelLength; row++) {
                for (let col = 0; col < pixelLength; col++) {
                    let x = col * pixelSize;
                    let y = row * pixelSize;
                    drawingLayer.noFill();
                    drawingLayer.noStroke();
                    drawingLayer.rect(x, y, pixelSize, pixelSize);
                }
            }
        };

        const displayPixel = (x, y) => {
            pixelSize *= penSize;
            let col = Math.floor(x / pixelSize);
            let row = Math.floor(y / pixelSize);

            if (col >= pixelLength || row >= pixelLength) return;

            var pixelX = col * pixelSize;
            var pixelY = row * pixelSize;
            drawingLayer.noStroke();

            if (penTipRef.current === "eraser") {
                drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
                drawingLayer.erase();
            } else {
                drawingLayer.noErase();
                drawingLayer.fill(colorRef.current);
                if (penTipRef.current === "circle") {
                    let centerX = pixelX + pixelSize / 2;
                    let centerY = pixelY + pixelSize / 2;
                    drawingLayer.ellipse(centerX, centerY, pixelSize, pixelSize);
                } else if (penTipRef.current.startsWith("hamza")) {
                    drawHamza(drawingLayer, pixelX, pixelY, pixelSize, penTipRef.current.slice(-1));
                } else {
                    drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
                }
            }
        };

        const downloadImg = () => {
            backgroundLayer.clear();
            p.clear();
            p.image(drawingLayer, 0, 0);
            p.noLoop();
            setTimeout(() => {
                p.saveCanvas("kufix", "png");
                p.loop();
            }, 500);
        };

        const clearDrawing = () => {
            drawingLayer.clear();
            p.clear();
        }
        
        // Set the downloadImg function to the outer variable
        downloadImgFn = downloadImg;
        clearDrawingFn = clearDrawing;
    };

    const handleToolChange = (event) => {
        penTipRef.current = event.target.value;
    };

    const handleBgChange = (event) => {
        backgroundRef.current = event.target.value;
    };

    useEffect(() => {
        const sketchInstance = new p5((p) => {
            const sketch = Sketch(p);
        }, sketchRef.current);

        return sketchInstance.remove;
    }, []);

    // Allow calling downloadImg from outside
    const sketchFunctionFromOutside = (func) => {
        if (func === downloadImgFn) {
            return downloadImgFn();
        } else if ( func === clearDrawingFn) {
            return clearDrawingFn();
        }
    };

    const handleSaveImage = () => sketchFunctionFromOutside(downloadImgFn);
    const handleClearDrawing = () => sketchFunctionFromOutside(clearDrawingFn);

    return (
        <>
            <Navbar
                newDrawingFunc={() => console.log("new draw")}
                saveImageFunc={handleSaveImage}
            />

            <div ref={sketchRef} className='w-fit mx-auto'></div>

            <select onChange={handleToolChange}>
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>

            <button onClick={handleClearDrawing}>Clr</button>
            
            <select onChange={handleBgChange}>
                <option value="background1">Bg1</option>
                <option value="background2">Bg2</option>
                <option value="background3">Bg3</option>
            </select>
        </>
    );
};

export default App;
