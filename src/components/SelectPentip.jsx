import { useState } from 'react';
import PropTypes from 'prop-types';

const ButtonWithImage = ({ imageSrc, onClick, isActive, value }) => (
    <button
        className={`${isActive ? 'bg-slate-400 md:bg-slate-50' : ''} p-1 w-9 h-9 flex justify-center items-center rounded-md border-2 border-teal-900 hover:bg-slate-400`}
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
        {imageSrc: '../src/assets/images/square.png', value: 'default'},
        {imageSrc: '../src/assets/images/eraser.png', value: 'eraser'},
        {imageSrc: '../src/assets/images/circle.png', value: 'circle'},
        {imageSrc: '../src/assets/images/hamzaN.png', value: 'hamzaN'},
        {imageSrc: '../src/assets/images/hamzaE.png', value: 'hamzaE'},
        {imageSrc: '../src/assets/images/hamzaS.png', value: 'hamzaS'},
        {imageSrc: '../src/assets/images/hamzaW.png', value: 'hamzaW'},
        {imageSrc: '../src/assets/images/kafN.png', value: 'kafN'},
        {imageSrc: '../src/assets/images/kafE.png', value: 'kafE'}
    ];

  return (
    <div className='flex justify-center gap-1 md:p-3 md:gap-3 md:flex-col md:rounded-md md:bg-gray-400'>
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