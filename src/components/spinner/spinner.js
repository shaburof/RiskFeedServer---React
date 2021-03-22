import React from 'react';
import spinnerImage from '../../images/spinner.gif';
import classes from './spinner.module.scss';

const spinner = (props) => {

    return <div className={classes.spinner}><img src={spinnerImage} className={classes.spinnerImage} /></div>
}

export default spinner;