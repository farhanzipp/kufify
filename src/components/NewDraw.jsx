import React from 'react'

const NewDraw = ({ onInputChange }) => {
    const handleDrawClick = () => {
        const inputValue = prompt('Enter pixel length:');
        if (inputValue !== null) {
            onInputChange(inputValue);
        }
    }
    return (
        <>
            <a href="#" onClick={handleDrawClick}>New Draw</a>
        </>
    )
}

export default NewDraw