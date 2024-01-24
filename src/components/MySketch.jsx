// MySketch.jsx
import Sketch from 'react-p5';

const MySketch = ({ canvasWidth }) => {
  let x = 50;
  let y = 50;

  const setup = (p5, parent) => {
    p5.pixelDensity(1);
    p5.createCanvas(canvasWidth, canvasWidth).parent(parent);
    p5.background(0);
  };

  const draw = (p5) => {
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default MySketch;

