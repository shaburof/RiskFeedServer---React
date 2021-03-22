import React, { useState, useEffect } from 'react';

const TextLimit = (props) => {

    const [count, setCount] = useState(props.limit);
    const text = props.text;
    const limitReached = props.limitReached;

    useEffect(() => {
        let result = props.limit - text.length;
        if (result >= 0) setCount(props.limit - text.length);
    });

    return <section className="input-place__stringlimit">{count}</section>
}

export default TextLimit;