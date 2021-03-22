import React from 'react';
import classes from './errorMessage.module.scss';

const ErrorMessage = (props) => {

    const defaultMessage = 'обновите страницу и попробуйте еще раз';
    const { message } = props;

    return <>
        <div className={classes.errorMessage}>
            <h3 className={classes.errorMessage_title}>ЧТО-ТО ПОШЛО НЕ ТАК</h3>
            <p className={classes.errorMessage_subtitle}>{message || defaultMessage}</p>
        </div>
    </>
}

export default ErrorMessage;