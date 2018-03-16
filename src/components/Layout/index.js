import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar';
import classes from './index.css';


const layout = ( props ) => (
      <Wrapper>
          <Toolbar />
          <main className={classes.container}>
              {props.children}
          </main>
      </Wrapper>
);

export default layout;
