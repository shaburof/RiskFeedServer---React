import React from 'react';
import TextLimit from '../../textLimit/textLimit';

function InputText(props) {

    const { data, handler } = props;
    const limit = { status: typeof props.limit !== 'undefined', limit: props.limit };

    const handleOnChange = (e) => {
        const text = e.target.value;
        (limit.limit - text.length >= 0) && handler(e.target.value);
    };

    return <div className="input-place">
        <label className="input__label">{props.children}</label>
        <input type={props.type ? props.type : 'text'} value={data} onChange={handleOnChange} className={`input ` + (props.invalid && `input--disabled`)}></input>
        {limit.status && <TextLimit limit={limit.limit} text={data} />}
    </div>
};

export default InputText;