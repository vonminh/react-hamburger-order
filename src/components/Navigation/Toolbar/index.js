import React from 'react';
import classes from './index.css';
import DrawToggle from '../SideDrawer/DrawToggle';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawToggle clicked={props.drawToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
