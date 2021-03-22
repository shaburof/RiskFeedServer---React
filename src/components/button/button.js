import React from 'react';
import spinner from '../../images/spinner.gif';

const Button = (props) => {
    const { loading, handler } = props;


    return <button
        onClick={handler}
        className={`btn ` + (!props.disabled ? `btn-green` : `btn--disabled`) + (loading ? ` btn--loading` : '')}
    >{loading && <img className="btn__spinner" src={spinner} />}{props.children}</button>
}

export default Button;