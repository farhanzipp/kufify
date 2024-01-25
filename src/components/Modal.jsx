import PropTypes from 'prop-types';

const Modal = (props) => {
    return (
        <div className={`${props.isOpen ? 'is-open' : ''}`}>
            <div className='modal-content'>
                {props.children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool
}
export default Modal