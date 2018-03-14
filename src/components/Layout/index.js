import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import classes from './index.css';

const layout = ( props ) => (
      <Wrapper>
          <div>Toolbar, SideDrawer, Backdrop</div>
          <main className={classes.container}>
              {props.children}
          </main>
      </Wrapper>
);

export default layout;
