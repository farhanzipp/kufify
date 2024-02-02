import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const ContentEditable = (props) => {
    const contentEditableRef = useRef(null);

    useEffect(() => {
        if (contentEditableRef.current.textContent !== props.value) {
            contentEditableRef.current.textContent = props.value;
        }
    });
12
    return (
        <p
            contentEditable="true"
            ref={contentEditableRef}
            onInput={event => {
                props.onChange(event.target.textContent);
            }}
            className='h-18 mt-2 mx-1 p-2 rounded-md shadow-md bg-white text-right text-4xl outline-emerald-300'
            style={{ fontFamily: "FKS" }}
        />
    )
}

const ArabicInput = () => {
    const [content, setContent] = useState('هذا من فضل ربي');

    return (
        <>
            <ContentEditable
                value={content}

                onChange={updatedContent => {
                    setContent(updatedContent);
                }}
            />
        </>
    );
};

ContentEditable.propTypes = {
    value: PropTypes.string,
    onChange:PropTypes.func

}
export default ArabicInput;
