import { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { drawHamza, drawKaf } from './utils/shapes';
import { showBackground } from './utils/backgrounds';
import Navbar from './components/Navbar';
import ColorPicker from './components/ColorPicker';
import SelectPentip from './components/SelectPentip';
import ArabicInput from './components/ArabicInput';

const App = () => {
    const sketchRef = useRef();

    let canvasWidthRef = useRef(350);
    // const pixelLengthRef = useRef(19);
    let [pixelLength, setPixelLength] = useState(19);
    // const penSizeRef = useRef(1);
    const penTipRef = useRef("default");
    const colorRef = useRef("#333333");
    const backgroundRef = useRef("background1");

    let downloadImgFn;
    let clearDrawingFn;

    const Sketch = (p) => {
        let canvasWidth = canvasWidthRef.current;
        // let pixelLength = pixelLengthRef.current;
        let pixelSize = Math.floor(canvasWidth / pixelLength);
        // Adjust the canvas width to be an exact multiple of pixelSize
        canvasWidth = pixelSize * pixelLength;

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
            pixelSize *= 1;
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
            pixelSize *= 1;
            let col = Math.floor(x / pixelSize);
            let row = Math.floor(y / pixelSize);

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
                } else if (penTipRef.current.startsWith("kaf")) {
                    drawKaf(drawingLayer, pixelX, pixelY, pixelSize, penTipRef.current.slice(-1));
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
            p.noLoop();
            drawingLayer.clear();
            p.clear();
            p.loop();
        }

        // Set the downloadImg function to the outer variable
        downloadImgFn = downloadImg;
        clearDrawingFn = clearDrawing;
    };

    useEffect(() => {
        const sketchInstance = new p5((p) => {
            Sketch(p);
        }, sketchRef.current);

        return sketchInstance.remove;
    });

    useEffect(() => {
        const updateCanvasWidth = () => {
            canvasWidthRef.current = Math.min(window.innerWidth, 550);
            // Update canvas size
            sketchRef.current.width = canvasWidthRef.current;
        };

        updateCanvasWidth();

        const handleResize = () => {
            updateCanvasWidth();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [canvasWidthRef]);

    const handlePixelLengthChange = () => {
        const pixelLengthString = prompt('Enter pixel length:');
        if (pixelLengthString !== null) {
            const pixelLength = parseInt(pixelLengthString, 10);
            if (!isNaN(pixelLength)) {
                setPixelLength(pixelLength);
            } else {
                alert('Please enter a valid number for pixel length.');
            }
        }
    };

    const handleBgChange = (event) => {
        backgroundRef.current = event.target.value;
    };
    const handleSaveImage = () => downloadImgFn();
    const handleClearDrawing = () => clearDrawingFn();

    return (
        <div className='bg-slate-50 overflow-hidden'>
            <Navbar
                newDrawingFunc={handlePixelLengthChange}
                saveImageFunc={handleSaveImage}
                clearDrawingFunc={handleClearDrawing}
            />
            <div className='mx-auto flex flex-col gap-3 justify-center items-center md:flex-row md:gap-7 md:items-start'>
                <div className='mb-3 flex gap-2 md:order-3 md:flex-col shadow-sm'>
                    <ColorPicker setColorRef={colorRef} />
                    <div className='p-2 flex items-center rounded-md border-2 border-teal-400'>
                        <p>Guide :</p>
                        <select onChange={handleBgChange} className='font-semibold'>
                            <option value="background1">Default</option>
                            <option value="background2">+ -</option>
                            <option value="background3">Bold</option>
                            <option value="grid">Grid</option>
                            <option value="dot">Dot</option>
                        </select>
                    </div>
                </div>

                <div ref={sketchRef} className='md:order-2 shadow-lg'></div>

                <div className="md:order-1 mt-4">
                    <SelectPentip penTipRef={penTipRef} />
                </div>
            </div>
            <div>
                <ArabicInput />
            </div>
        </div>
    );
};

export default App;
