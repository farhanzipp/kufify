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

export const drawKaf = (drawingLayer, x, y, pixelSize, direction) => {
    let ksize = pixelSize * 3 / 5;
    drawingLayer.beginShape();
    if (direction === "N") {
        drawingLayer.vertex(x, y);
        drawingLayer.vertex(x + ksize * 5, y);
        drawingLayer.vertex(x + ksize * 5, y + ksize);
        drawingLayer.vertex(x + ksize, y + ksize);
        drawingLayer.vertex(x + ksize, y + ksize * 2);
        drawingLayer.vertex(x + ksize * 5, y + ksize * 2);
        drawingLayer.vertex(x + ksize * 5 , y + ksize * 5);
        drawingLayer.vertex(x , y + ksize * 5);
        drawingLayer.vertex(x , y + ksize * 4);
        drawingLayer.vertex(x + ksize * 4 , y + ksize * 4);
        drawingLayer.vertex(x + ksize * 4 , y + ksize * 3);
        drawingLayer.vertex(x, y + ksize * 3);
    } else if (direction === "E") {
        drawingLayer.vertex(x,y);
        drawingLayer.vertex(x + ksize, y);
        drawingLayer.vertex(x + ksize, y + ksize * 4);
        drawingLayer.vertex(x + ksize * 2, y + ksize * 4);
        drawingLayer.vertex(x + ksize * 2, y );
        drawingLayer.vertex(x + ksize * 5, y );
        drawingLayer.vertex(x + ksize * 5, y + ksize * 5 );
        drawingLayer.vertex(x + ksize * 4, y + ksize * 5 );
        drawingLayer.vertex(x + ksize * 4, y + ksize );
        drawingLayer.vertex(x + ksize * 3, y + ksize );
        drawingLayer.vertex(x + ksize * 3, y + ksize * 5 );
        drawingLayer.vertex(x, y + ksize * 5 );
    }
    drawingLayer.endShape(drawingLayer.CLOSE);
}