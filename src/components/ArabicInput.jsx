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
        <div id="freeflow-generator" className='p-3 mx-auto mt-4 flex flex-col md:flex-row items-end whitespace-normal'>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Arabic text"
                className='my-2 p-2 w-1/2 text-right border-2'

            />

            <h1 className='min-h-18 px-2 pt-2 text-6xl text-right rounded-md'
                style={{ fontFamily: 'FKS_freeflow' }}
            >
                {inputValue}
            </h1>

            
        </div>
    );
};

export default ArabicInput;
