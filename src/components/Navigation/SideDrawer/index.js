import React from 'react';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from '../../UI/Backdrop';
import Wrapper from '../../../hoc/Wrapper';
import classes from './index.css';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return(
        <Wrapper>
            <Backdrop show={props.open} click={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Wrapper>
    )
}

export default sideDrawer;
