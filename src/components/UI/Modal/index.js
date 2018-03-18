import React, {Component} from 'react';
import classes from './index.css';
import Wrapper from '../../../hoc/Wrapper';
import Backdrop from '../Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show;
    }

    render(){
        return(
            <Wrapper>
                <Backdrop show={this.props.show} click={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Wrapper>
        )
    }
}

export default Modal;
