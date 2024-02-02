import { useState } from 'react';
import PropTypes from 'prop-types';

const ColorPicker = ({ setColorRef }) => {
    const [selectedColor, setSelectedColor] = useState("#333333");

    const colorOptions = ["#FFFFFF", "#D04848", "#FFA447", 
    "#FDE767", "#36AE7C", "#000000", "#187498", "#4D96FF", "#333C83", "#6F69AC"];

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setColorRef.current = color;
    };

    return (
        <div className='p-2 flex gap-2 md:flex-col md:items-center md:rounded-md'>
            <div 
                className='w-11 h-11 rounded-md border-gray-300 border md:border-0'
                style={{
                    backgroundColor: selectedColor,
                }}
            >

            </div>
            <div className='w-fit grid grid-cols-5 gap-1 md:grid-cols-2'>
                {colorOptions.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => handleColorChange(color)}
                        className='w-5 h-5 rounded-sm border-0 hover:brightness-90 cursor-pointer'
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
