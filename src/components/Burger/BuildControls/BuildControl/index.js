import React from 'react';
import classes from './index.css';

const buildControl = (props) => (

    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} disabled={props.isLessDisable} onClick={props.remove}>Less</button>
        <button className={classes.More} onClick={props.add}>More</button>
    </div>
)

export default buildControl;
