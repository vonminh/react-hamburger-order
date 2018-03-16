import React from 'react';
import classes from './index.css';
import Wrapper from '../../../hoc/Wrapper';
import Backdrop from '../Backdrop';

const modal = (props) => (
    <Wrapper>
        <Backdrop show={props.show} click={props.modalClosed}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show? '1' : '0'
            }}>
            {props.children}
        </div>
    </Wrapper>
);

export default modal;
