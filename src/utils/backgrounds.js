export const showBackground = (pixelSize, selectedBg, layer) => {
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
        const color = layer.color(200);

        if (colIndex % 2 === 1 || rowIndex % 2 === 1) {
          // Darken the color for intersecting lines
          if (colIndex % 2 === 1 && rowIndex % 2 === 1) {
            layer.fill(
              color.levels[0] - 50,
              color.levels[1] - 50,
              color.levels[2] - 50,
              128
            );
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

        if (
          (colIndex % 3 === 0 || colIndex % 3 === 1) &&
          (rowIndex % 3 === 0 || rowIndex % 3 === 1)
        ) {
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
};
