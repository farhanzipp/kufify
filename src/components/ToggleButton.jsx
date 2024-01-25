import PropTypes from 'prop-types';

const ToggleButton = ({ label, value, currentValue, onChange }) => {
    const handleClick = () => {
        onChange(value);
    };

    return (
        <button
            onClick={handleClick}
            className={`${currentValue === value ? 'bg-teal-900 text-white' : ''} p-1 rounded-md border-2 border-teal-900 hover:bg-teal-900 text-teal-700 hover:text-white `}
        >
            {label}
        </button>
    );
};

ToggleButton.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ToggleButton;
