import PropTypes from 'prop-types';

const ToolButton = ({ children, onClick, isActive, className }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isActive ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {children}
    </button>
  );
};

ToolButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  className: PropTypes.string,
};

ToolButton.defaultProps = {
  className: '',
};

export default ToolButton;