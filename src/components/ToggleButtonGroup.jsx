import PropTypes from 'prop-types';
import ToggleButton from './ToggleButton'; // Adjust the import path based on your project structure
import { useCallback } from 'react';

const ToolButtonGroup = ({ tool, setTool }) => {
    const handleToolChange = useCallback((newTool) => {
        setTool(newTool);
      }, [setTool]);

    return (
        <>
            <ToggleButton
                label="Pen"
                value="pen"
                currentValue={tool}
                onChange={handleToolChange}
            />
            <ToggleButton
                label="Eraser"
                value="eraser"
                currentValue={tool}
                onChange={handleToolChange}
            />
        </>
    );
};

ToolButtonGroup.propTypes = {
    tool: PropTypes.string.isRequired,
    setTool: PropTypes.func.isRequired,
};

export default ToolButtonGroup;
