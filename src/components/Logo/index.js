import React from 'react';
import classes from './index.css';
import burgerLogo from '../../assests/images/burger-logo.png';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
      <img src={burgerLogo} alt="MyReactBurger"/>
  </div>
)

export default logo;
