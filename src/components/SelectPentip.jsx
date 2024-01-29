import { useState } from 'react'

const ButtonWithImage = ({ imageSrc, onClick, isActive, value }) => (
    <button
        className={`${isActive ? 'bg-teal-900' : ''} p-1 w-9 h-9 flex justify-center items-center rounded-md border-2 border-teal-900 hover:bg-teal-900 text-teal-700 hover:text-white`}
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
        {imageSrc: '../src/assets/images/hamzaN.png', value: 'kafN'},
        {imageSrc: '../src/assets/images/hamzaE.png', value: 'kafE'}
    ];

  return (
    <>
        {buttonData.map((data, index) => (
            <ButtonWithImage
                key={index}
                imageSrc={data.imageSrc}
                onClick={(value) => handleButtonClick(index, value)}
                isActive={index === activeIndex}
                value= {data.value}
            />
        ))}
    </>
  )
}

export default SelectPentip