import { useState } from 'react';
import PropTypes from 'prop-types';

const ColorPicker = ({ setColorRef }) => {
    const [selectedColor, setSelectedColor] = useState("#333333");

    const colorOptions = ["#FF0000", "#00FF00", "#0000FF", 
    "#FFFF00", "#FFA500", "#808080", "#333333", "#FFFFFF"];

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setColorRef.current = color;
    };

    return (
        <div className='flex gap-2 md:flex-col md:p-2 md:rounded-md md:bg-gray-400'>
            <div 
                className='w-11 h-11 rounded-md border-gray-300 border place-self-end md:border-0'
                style={{
                    backgroundColor: selectedColor,
                }}
            >

            </div>
            <div className='w-fit grid grid-cols-4 gap-1 md:grid-cols-2'>
                {colorOptions.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => handleColorChange(color)}
                        className='w-5 h-5 rounded-sm border-0 cursor-pointer'
                        style={{
                            backgroundColor: color,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

ColorPicker.propTypes = {
    setColorRef: PropTypes.shape({
        current: PropTypes.any,
    }),
};

export default ColorPicker;
