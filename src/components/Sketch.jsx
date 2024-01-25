import { ReactP5Wrapper } from '@p5-wrapper/react';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const Sketch = (props) => {
    const { canvasWidth, pixelLength, tool, penSize, penTip, color, background } = props;
    
    let backgroundLayer, drawingLayer;

    const sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(canvasWidth, canvasWidth);

            backgroundLayer = p5.createGraphics(canvasWidth, canvasWidth);
            drawingLayer = p5.createGraphics(canvasWidth, canvasWidth);

            populatePixel();
            showBackground(background);
        };

        p5.draw = () => {
            p5.image(backgroundLayer, 0, 0);
            p5.image(drawingLayer, 0, 0);
            if (p5.mouseIsPressed) {
                if (tool === "pen") {
                    displayPixel(p5.mouseX, p5.mouseY, color);
                } else if (tool === "eraser") {
                    erasePixel(p5.mouseX, p5.mouseY);
                }
            }
        };

        const calculatePixelSize = () => {
            const cellSize = Math.floor(canvasWidth / pixelLength);

            return cellSize;
        };

        const populatePixel = () => {
            let pixelSize = calculatePixelSize();
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

        const displayPixel = (x, y, color) => {
            let pixelSize = calculatePixelSize();
            pixelSize *= penSize;
            let col = Math.floor(x / pixelSize);
            let row = Math.floor(y / pixelSize);

            if (col >= pixelLength || row >= pixelLength) return;

            // top left corner
            var pixelX = col * pixelSize;
            var pixelY = row * pixelSize;

            drawingLayer.noStroke();
            drawingLayer.fill(color);
            drawingLayer.noErase();

            if (tool === "pen") {
                if (penTip === "circle") {
                    let centerX = pixelX + pixelSize / 2;
                    let centerY = pixelY + pixelSize / 2;
                    drawingLayer.ellipse(centerX, centerY, pixelSize, pixelSize);
                } else if (penTip === "hamzaS") {
                    drawHamza(pixelX, pixelY, pixelSize, "S");
                } else if (penTip === "hamzaE") {
                    drawHamza(pixelX, pixelY, pixelSize, "E");
                } else if (penTip === "hamzaN") {
                    drawHamza(pixelX, pixelY, pixelSize, "N");
                } else if (penTip === "hamzaW") {
                    drawHamza(pixelX, pixelY, pixelSize, "W");
                } else {
                    // Rectangle is the default pen tip
                    drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
                }
            }
        }

        const erasePixel = (x, y) => {
            let pixelSize = calculatePixelSize();
            pixelSize *= penSize;
            let col = Math.floor(x / pixelSize);
            let row = Math.floor(y / pixelSize);
            let pixelX = col * pixelSize;
            let pixelY = row * pixelSize;

            drawingLayer.noStroke();
            drawingLayer.erase();
            drawingLayer.rect(pixelX, pixelY, pixelSize, pixelSize);
        }

        const drawHamza = (x, y, pixelSize, direction) => {
            drawingLayer.beginShape();
            if (direction === "S") {
                drawingLayer.vertex(x, y);
                drawingLayer.vertex(x + pixelSize, y);
                drawingLayer.vertex(x + pixelSize, y + pixelSize);
                drawingLayer.vertex(x, y + pixelSize);
                drawingLayer.vertex(x, y + pixelSize * 2 / 3);
                drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize * 2 / 3);
                drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize / 3);
                drawingLayer.vertex(x, y + pixelSize / 3);
            } else if (direction === "E") {
                drawingLayer.vertex(x, y);
                drawingLayer.vertex(x + pixelSize, y);
                drawingLayer.vertex(x + pixelSize, y + pixelSize);
                drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize);
                drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize / 3);
                drawingLayer.vertex(x + pixelSize / 3, y + pixelSize / 3);
                drawingLayer.vertex(x + pixelSize / 3, y + pixelSize);
                drawingLayer.vertex(x, y + pixelSize);
            } else if (direction === "N") {
                drawingLayer.vertex(x, y);
                drawingLayer.vertex(x + pixelSize, y);
                drawingLayer.vertex(x + pixelSize, y + pixelSize / 3);
                drawingLayer.vertex(x + pixelSize / 3, y + pixelSize / 3);
                drawingLayer.vertex(x + pixelSize / 3, y + pixelSize * 2 / 3);
                drawingLayer.vertex(x + pixelSize, y + pixelSize * 2 / 3);
                drawingLayer.vertex(x + pixelSize, y + pixelSize);
                drawingLayer.vertex(x, y + pixelSize);
            } else if (direction === "W") {
                drawingLayer.vertex(x, y);
                drawingLayer.vertex(x + pixelSize, y);
                drawingLayer.vertex(x + pixelSize / 3, y);
                drawingLayer.vertex(x + pixelSize / 3, y + pixelSize * 2 / 3);
                drawingLayer.vertex(x + pixelSize * 2 / 3, y + pixelSize * 2 / 3);
                drawingLayer.vertex(x + pixelSize * 2 / 3, y);
                drawingLayer.vertex(x + pixelSize, y);
                drawingLayer.vertex(x + pixelSize, y + pixelSize);
                drawingLayer.vertex(x, y + pixelSize);
            }

            drawingLayer.endShape(p5.CLOSE);
        }

        const showBackground = (selectedBg) => {
            let pixelSize = calculatePixelSize();
            const layer = backgroundLayer;
            layer.noStroke();

            if (selectedBg === "background1") {
                layer.clear();
                for (let i = 0; i < layer.width; i += pixelSize) {
                    for (let j = 0; j < layer.height; j += pixelSize) {
                        if ((i / pixelSize + j / pixelSize) % 2 === 0) {
                            layer.fill(200);
                        } else {
                            layer.fill(255);
                        }
                        layer.square(i, j, pixelSize);
                    }
                }
            } else if (selectedBg === "background2") {
                layer.clear();
                for (let i = 0; i < layer.width; i += pixelSize) {
                    for (let j = 0; j < layer.height; j += pixelSize) {
                        const colIndex = Math.floor(i / pixelSize);
                        const rowIndex = Math.floor(j / pixelSize);
                        const color = p5.color(200);

                        if (colIndex % 2 === 1 || rowIndex % 2 === 1) {
                            // Darken the color for intersecting lines
                            if (colIndex % 2 === 1 && rowIndex % 2 === 1) {
                                layer.fill(color.levels[0] - 50, color.levels[1] - 50, color.levels[2] - 50, 128);
                            } else {
                                layer.fill(color.levels[0], color.levels[0], color.levels[0], 128); // Gray
                            }
                        } else {
                            layer.fill(255);
                        }

                        layer.rect(i, j, pixelSize, pixelSize);
                    }
                }
            } else if (selectedBg === "background3") {
                layer.clear();
                const grayColor = layer.color(200);
                const whiteColor = layer.color(255);

                for (let i = 0; i < layer.width; i += pixelSize) {
                    for (let j = 0; j < layer.height; j += pixelSize) {
                        const colIndex = Math.floor(i / pixelSize);
                        const rowIndex = Math.floor(j / pixelSize);

                        if ((colIndex % 3 === 0 || colIndex % 3 === 1) && (rowIndex % 3 === 0 || rowIndex % 3 === 1)) {
                            layer.fill(grayColor);
                        } else if (colIndex % 3 === 2 && rowIndex % 3 === 2) {
                            layer.fill(whiteColor);
                        } else {
                            layer.fill(whiteColor);
                        }

                        layer.square(i, j, pixelSize);
                    }
                }
            } else if (selectedBg === "grid") {
                layer.clear();
                for (let i = 0; i < layer.width; i += pixelSize) {
                    for (let j = 0; j < layer.height; j += pixelSize) {
                        layer.strokeWeight(1);
                        layer.stroke(0);
                        layer.fill(255);
                        layer.square(i, j, pixelSize);
                    }
                }
            } else if (selectedBg === "dot") {
                layer.clear();
                for (let i = 0; i < layer.width; i += pixelSize) {
                    for (let j = 0; j < layer.height; j += pixelSize) {
                        layer.fill(255); // Set the fill color to white
                        layer.square(i, j, pixelSize); // Draw a white square to represent the pixel

                        layer.fill(200); // Set the fill color to light gray
                        let centerX = i + pixelSize / 2;
                        let centerY = j + pixelSize / 2;
                        let circleSize = pixelSize / 4;
                        layer.ellipse(centerX, centerY, circleSize, circleSize);
                    }
                }
            }

        }

    }

    return (
        <>
            <ReactP5Wrapper
                sketch={sketch}
            />
        </>
    )
}

Sketch.propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    pixelLength: PropTypes.number.isRequired,
    tool: PropTypes.string.isRequired,
    penSize: PropTypes.number.isRequired,
    penTip: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
};

export default Sketch