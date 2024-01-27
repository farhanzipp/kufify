import PropTypes from 'prop-types';
import { useState } from 'react';

const ToggleButton = ({ penTipRef }) => {
    const [penActive, setPenActive] = useState(false);
    const [eraserActive, setEraserActive] = useState(false);

    const handleClick = (buttonNumber) => {
        if (buttonNumber === 1) {
            setPenActive(true);
            setEraserActive(false);
            penTipRef.current = "pen"
        } else {
            setPenActive(false);
            setEraserActive(true);
            penTipRef.current = "eraser"
        }
    };

    return (
        <div className='flex gap-2'>
            <button
                onClick={() => handleClick(1)}
                className={`${penActive ? 'bg-teal-900 text-white' : ''} p-1 rounded-md border-2 border-teal-900 hover:bg-teal-900 text-teal-700 hover:text-white `}
            >
                Pen
            </button>

            <button
                onClick={() => handleClick(2)}
                className={`${eraserActive ? 'bg-teal-900 text-white' : ''} p-1 rounded-md border-2 border-teal-900 hover:bg-teal-900 text-teal-700 hover:text-white `}
            >
                Eraser
            </button>
        </div>
    );
};

ToggleButton.propTypes = {
    penTipRef: PropTypes.shape({
        current: PropTypes.any,
    }),
};

export default ToggleButton;
