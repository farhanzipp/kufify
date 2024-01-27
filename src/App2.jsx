import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import ToggleButtonGroup from "./components/ToggleButtonGroup";
import SketchComponent from "./components/Sketch";

const App = () => {
  // const [canvasWidth, setCanvasWidth] = useState(Math.min(window.innerWidth, 500));
  // const [pixelLength, setPixelLength ] = useState(20);
  
  let canvasWidthRef= useRef(500);
  const pixelLengthRef = useRef(20);
  const toolRef = useRef("pen");
  const penSizeRef = useRef(1);
  const penTipRef = useRef("default");
  const colorRef = useRef("#333333");
  const backgroundRef = useRef("background1")

  const handleToolChange = (event) => {
    toolRef.current = event.target.value;
  };

  useEffect(() => {
    const handleResize = () => {
      const newCanvasWidth = Math.min(window.innerWidth, 500);
      canvasWidthRef = newCanvasWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="w-fit mx-auto">
        <SketchComponent
          canvasWidth={canvasWidthRef.current}
          pixelLength={pixelLengthRef.current} 
          tool={toolRef.current}
          penSize={penSizeRef.current}
          penTip={penTipRef.current}
          color={colorRef.current}
          background={backgroundRef.current}
        />
      </div>

      <div className="w-fit mx-auto">
        <div className="flex gap-2">
          {/* <ToggleButtonGroup tool={tool} setTool={setTool} /> */}
        </div>
      </div>

      <select onChange={handleToolChange}>
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </>
  )
}

export default App