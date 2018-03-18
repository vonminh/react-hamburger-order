import React, {Component} from 'react';
import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';
import classes from './index.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    drawToggleClicked = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render(){
        return(
            <Wrapper>
                <Toolbar drawToggleClicked={this.drawToggleClicked} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.container}>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}

export default Layout;
