import { useState } from 'react';
import PropTypes from 'prop-types';

const ButtonWithImage = ({ imageSrc, onClick, isActive, value }) => (
    <button
        className={`${isActive ? 'bg-emerald-300' : ''} p-1 w-9 h-9 flex justify-center items-center rounded-md hover:bg-emerald-300`}
        onClick={() => onClick(value)}
    >
        <img src={imageSrc} alt="Button Image" />
    </button>
);

const SelectPentip = ({ penTipRef }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleButtonClick = (index, value) => {
        setActiveIndex(index === activeIndex ? null : index);
        penTipRef.current = value;
    };

    const buttonData = [
        {imageSrc: './square.png', value: 'default'},
        {imageSrc: './eraser.png', value: 'eraser'},
        {imageSrc: './circle.png', value: 'circle'},
        {imageSrc: './hamzaN.png', value: 'hamzaN'},
        {imageSrc: './hamzaE.png', value: 'hamzaE'},
        {imageSrc: './hamzaS.png', value: 'hamzaS'},
        {imageSrc: './hamzaW.png', value: 'hamzaW'},
        {imageSrc: './kafN.png', value: 'kafN'},
        {imageSrc: './kafE.png', value: 'kafE'}
    ];

  return (
    <div className='flex justify-center p-2 rounded-md shadow-md bg-white md:p-3 md:gap-3 md:flex-col'>
            {buttonData.map((data, index) => (
                <ButtonWithImage
                    key={index}
                    imageSrc={data.imageSrc}
                    onClick={(value) => handleButtonClick(index, value)}
                    isActive={index === activeIndex}
                    value= {data.value}
                />
            ))}
            
            <button></button>

    </div>
  )
}

ButtonWithImage.propTypes = {
    imageSrc:PropTypes.string,
    onClick:PropTypes.func,
    isActive:PropTypes.bool,
    value:PropTypes.string,
}

SelectPentip.propTypes = {
    penTipRef:PropTypes.object
}

export default SelectPentip