import React from 'react';
import classes from './index.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
