import { useState } from 'react';
import '../assets/styles/foks.css'

const ArabicInput = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        // Restrict input to Arabic text (numbers and alphabet)
        const regex = /^[\u0600-\u06FF\s0-9]+$/;
        const newInputValue = e.target.value;

        if (regex.test(newInputValue) || newInputValue === '') {
            setInputValue(newInputValue);
        }
    };

    return (
        <div className='md:w-1/2 p-3 mx-auto mt-7 bg-gray-300 rounded-md whitespace-normal'>
            <h1 className='min-h-14 text-6xl text-right'
                style={{ fontFamily: 'FKS_freeflow' }}
            >
                {inputValue}
            </h1>

            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Arabic text"
                className=''

            />
        </div>
    );
};

export default ArabicInput;
