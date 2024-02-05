import { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { drawHamza, drawKaf } from './utils/shapes';
import { showBackground } from './utils/backgrounds';
import Navbar from './components/Navbar';
import ColorPicker from './components/ColorPicker';
import SelectPentip from './components/SelectPentip';
import ArabicInput from './components/ArabicInput';
import Footer from './components/Footer';

const App = () => {
    const sketchRef = useRef();

    let canvasWidthRef = useRef(550);
    let [pixelLength, setPixelLength] = useState(19);
    // const penSizeRef = useRef(1);
    const penTipRef = useRef("default");
    const colorRef = useRef("#333333");
    const backgroundRef = useRef("background1");
    

    let downloadImgFn;
    let clearDrawingFn;
    let undoFn;
    let redoFn;

    const Sketch = (p) => {
        let canvasWidth = canvasWidthRef.current;
        let pixelSize = Math.floor(canvasWidth / pixelLength);
        canvasWidth = pixelSize * pixelLength;

        let backgroundLayer;
        let drawingLayer;
        
        let undoHistory = [];
        let currentUndoIndex = -1;

        p.setup = () => {
            let cnv = p.createCanvas(canvasWidth, canvasWidth);
            drawingLayer = p.createGraphics(canvasWidth, canvasWidth);
            backgroundLayer = p.createGraphics(canvasWidth, canvasWidth);
            populatePixel();
            captureUndoState();
            cnv.mouseReleased(() => {
                captureUndoState();
            });
        };

        p.draw = () => {
            p.image(backgroundLayer, 0, 0);
            p.image(drawingLayer, 0, 0);

            if (p.mouseIsPressed) {
                displayPixel(p.mouseX, p.mouseY);
            }

            showBackground(pixelSize, backgroundRef.current, backgroundLayer);
        };

        p.keyPressed = () => {
            if (p.keyIsDown(p.CONTROL) && p.keyIsDown(90)){ // Check for Ctrl + Z
                if (p.keyIsDown(p.SHIFT)) {
                    redo();
                } else {
                    undo();
                }
            }
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
            }, 1000);
        };

        const clearDrawing = () => {
            p.noLoop();
            drawingLayer.clear();
            p.clear();
            p.loop();
        }

        const captureUndoState = () => {
            undoHistory.splice(currentUndoIndex + 1);
            undoHistory.push(drawingLayer.get());

            if (undoHistory.length > 50) {
                undoHistory.shift();
            }

            currentUndoIndex = undoHistory.length - 1;
        }

        const undo = () => {
            if (currentUndoIndex > 0) {
                currentUndoIndex--;
                drawingLayer.clear();
                drawingLayer.image(undoHistory[currentUndoIndex], 0, 0);
            }
        };

        const redo = () => {
            if (currentUndoIndex < undoHistory.length - 1) {
                currentUndoIndex++;
                drawingLayer.clear();
                drawingLayer.image(undoHistory[currentUndoIndex], 0, 0);
            }
        }

        // Set the downloadImg function to the outer variable
        downloadImgFn = downloadImg;
        clearDrawingFn = clearDrawing;
        undoFn = undo;
        redoFn = redo;
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
    const handleUndo = () => undoFn();
    const handleRedo = () => redoFn();

    return (
        <div className='pb-5 h-full md:h-screen bg-slate-100 overflow-hidden'>
            <Navbar
                newDrawingFunc={handlePixelLengthChange}
                saveImageFunc={handleSaveImage}
                clearDrawingFunc={handleClearDrawing}
            />
            <div className='mx-auto flex flex-col md:w-4/5 lg:w-3/5 xl:w-2/5'>
                <div className='mx-auto flex flex-col gap-3 justify-center items-center md:flex-row md:gap-7 md:items-start'>
                    <div className='flex gap-2 mb-3 mx-2 bg-white rounded-md shadow-md md:order-3 md:flex-col'>
                        <ColorPicker setColorRef={colorRef} />
                        <div className='py-4'>
                            <select onChange={handleBgChange} className='font-semibold cursor-pointer outline-none'>
                                <option value="" disabled={true}>Bg</option>
                                <option value="background1">Def</option>
                                <option value="background2">+ -</option>
                                <option value="background3">Bold</option>
                                <option value="grid">Grid</option>
                                <option value="dot">Dot</option>
                            </select>
                        </div>
                        <div className='flex gap-2 p-2 md:flex-col md:mt-1 md:px-3'>
                            <button className='p-2 rounded-md font-semibold border-2 border-emerald-300 hover:bg-emerald-300 cursor-pointer' onClick={handleUndo} onTouchEnd={handleUndo}>
                                <img src="./rotate-left-solid.svg" alt="undo button" className='h-6 w-6 mx-auto' />
                            </button>
                            <button className='p-2 rounded-md font-semibold border-2 border-emerald-300 hover:bg-emerald-300 cursor-pointer' onClick={handleRedo} onTouchEnd={handleRedo}>
                                <img src="./rotate-right-solid.svg" alt="redo button" className='h-6 w-6 mx-auto' />
                            </button>
                            <button className='hidden md:inline mt-5 p-2 rounded-md font-semibold border-2 border-red-500 hover:bg-red-500 cursor-pointer' onClick={handleClearDrawing}>
                                <img src="./trash-solid.svg" alt="clear button" className='h-6 w-6 mx-auto' />
                            </button>
                        </div>
                    </div>

                    <div ref={sketchRef} className='md:order-2 border shadow-md'></div>

                    <div className="md:order-1 mt-2 md:mt-0">
                        <SelectPentip penTipRef={penTipRef} />
                    </div>
                </div>
                <div>
                    <ArabicInput />
                </div>
            </div>
            <Footer />

        </div>
    );
};

export default App;
