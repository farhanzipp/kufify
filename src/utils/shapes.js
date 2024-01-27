export const drawHamza = (drawingLayer, x, y, pixelSize, direction) => {
    drawingLayer.beginShape();
    if (direction === "S") {
        drawingLayer.vertex(x, y);
        drawingLayer.vertex(x + pixelSize, y);
        drawingLayer.vertex(x + pixelSize, y + pixelSize);
        drawingLayer.vertex(x, y + pixelSize);
        drawingLayer.vertex(x, y + (pixelSize * 2) / 3);
        drawingLayer.vertex(x + (pixelSize * 2) / 3, y + (pixelSize * 2) / 3);
        drawingLayer.vertex(x + (pixelSize * 2) / 3, y + pixelSize / 3);
        drawingLayer.vertex(x, y + pixelSize / 3);
    } else if (direction === "E") {
        drawingLayer.vertex(x, y);
        drawingLayer.vertex(x + pixelSize, y);
        drawingLayer.vertex(x + pixelSize, y + pixelSize);
        drawingLayer.vertex(x + (pixelSize * 2) / 3, y + pixelSize);
        drawingLayer.vertex(x + (pixelSize * 2) / 3, y + pixelSize / 3);
        drawingLayer.vertex(x + pixelSize / 3, y + pixelSize / 3);
        drawingLayer.vertex(x + pixelSize / 3, y + pixelSize);
        drawingLayer.vertex(x, y + pixelSize);
    } else if (direction === "N") {
        drawingLayer.vertex(x, y);
        drawingLayer.vertex(x + pixelSize, y);
        drawingLayer.vertex(x + pixelSize, y + pixelSize / 3);
        drawingLayer.vertex(x + pixelSize / 3, y + pixelSize / 3);
        drawingLayer.vertex(x + pixelSize / 3, y + (pixelSize * 2) / 3);
        drawingLayer.vertex(x + pixelSize, y + (pixelSize * 2) / 3);
        drawingLayer.vertex(x + pixelSize, y + pixelSize);
        drawingLayer.vertex(x, y + pixelSize);
    } else if (direction === "W") {
        drawingLayer.vertex(x, y);
        drawingLayer.vertex(x + pixelSize, y);
        drawingLayer.vertex(x + pixelSize / 3, y);
        drawingLayer.vertex(x + pixelSize / 3, y + (pixelSize * 2) / 3);
        drawingLayer.vertex(x + (pixelSize * 2) / 3, y + (pixelSize * 2) / 3);
        drawingLayer.vertex(x + (pixelSize * 2) / 3, y);
        drawingLayer.vertex(x + pixelSize, y);
        drawingLayer.vertex(x + pixelSize, y + pixelSize);
        drawingLayer.vertex(x, y + pixelSize);
    }

    drawingLayer.endShape(drawingLayer.CLOSE);
};
