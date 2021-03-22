import React, { useState } from 'react';
import TextLimit from '../../textLimit/textLimit';

function InputTextArea(props) {

    const rows = props.rows || 5;
    const { data, handler } = props;
    const limit = { status: typeof props.limit !== 'undefined', limit: props.limit };

    const handleOnChange = (e) => {
        const text = e.target.value;
        (limit.limit - text.length >= 0) && handler(e.target.value);
    };

    return <div className="input-place">
        <label className="input__label">{props.children}</label>
        <textarea rows={rows} cols="45" className="input" onChange={handleOnChange} defaultValue={data}></textarea>
        {limit.status && <TextLimit limit={limit.limit} text={data} />}
    </div>
};

export default InputTextArea;