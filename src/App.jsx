import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sketch from "./components/Sketch"
import ToggleButtonGroup from "./components/ToggleButtonGroup";

const App = () => {
  const [canvasWidth, setCanvasWidth] = useState(Math.min(window.innerWidth, 500));
  const [pixelLength, setPixelLength ] = useState(20);
  const [tool, setTool ] = useState("pen");
  const [penSize, setPenSize ] = useState(1);
  const [penTip, setPenTip ] = useState("pen");
  const [color, setColor ] = useState("#333333");
  const [background, setBackground ] = useState("background1");

  useEffect(() => {
    const handleResize = () => {
      const newCanvasWidth = Math.min(window.innerWidth, 500);
      setCanvasWidth(newCanvasWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectPenTip = (event) => {
    setPenTip(event.target.value);
  };

  return (
    <>
      <Navbar />

      <div className="w-fit mx-auto">
        <Sketch
          canvasWidth={canvasWidth}
          pixelLength={pixelLength}
          tool={tool}
          penSize={penSize}
          penTip={penTip}
          color={color}
          background={background}
        />
      </div>

      <div className="w-fit mx-auto">
        <div className="flex gap-2">
          <ToggleButtonGroup tool={tool} setTool={setTool} />
        </div>
      </div>

      <select onChange={handleSelectPenTip}>
        <option value="pen">Default</option>
        <option value="circle">Circle</option>
        <option value="hamzaN">Hamza N</option>
      </select>
    </>
  )
}

export default App