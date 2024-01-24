import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ToolButton from "./components/ToolButton"
import ToolButtonGroup from './components/ToolButtonGroup';
import MySketch from "./components/MySketch";

const App = () => {
  const [canvasWidth, setCanvasWidth] = useState(Math.min(window.innerWidth, 500));

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

  return (
    <>
        <Navbar />

        <MySketch 
          canvasWidth={canvasWidth}
        />

        <ToolButtonGroup>
          <ToolButton>Pen</ToolButton>
          <ToolButton>Eraser</ToolButton>
          <ToolButton>Clear</ToolButton>
        </ToolButtonGroup>
    </>
  )
}

export default App