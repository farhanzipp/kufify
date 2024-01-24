import React, { useState } from 'react'
import PropTypes from 'prop-types';

const ToolButtonGroup = ({ children }) => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    return (
        <div className='flex'>
            {React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                    onClick: () => handleButtonClick(index),
                    isActive: activeButton === index,
                })
            })}
        </div>
    )
}

ToolButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ToolButtonGroup