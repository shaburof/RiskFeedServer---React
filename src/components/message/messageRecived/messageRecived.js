import React from 'react';
import classes from './messageRecives.module.scss';
import Button from '../../button/button';

const messageRecived = (props) => {

    const { handler } = props;

    return <div>
        <p className={classes.messageTitle}>принято</p>
        <div><Button handler={handler}>подать новое сообщение</Button></div>
    </div>
}

export default messageRecived;