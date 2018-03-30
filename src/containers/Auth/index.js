import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import Spinner from '../../components/UI/Spinner';
import Button from '../../components/UI/Button';
import classes from './index.css';
import * as authActions from '../../store/actions/auth';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: true
    }

    inputChangedEventHandler(event, inputIdentifier){
        const updatedAuthForm = {
            ...this.state.authForm
        }
        const updatedElement = {
            ...updatedAuthForm[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedAuthForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for(let inputId in updatedAuthForm){
            formIsValid = updatedAuthForm[inputId].valid && formIsValid;
        }

        this.setState({
            authForm: updatedAuthForm,
            formIsValid: formIsValid
        })
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    submitAuthHandler = (event) => {
        event.preventDefault();
        this.props.onSubmitAuthForm(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup);
    }

    onSwitchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render(){
        const inputs = Object.keys(this.state.authForm).map(
            (inputName, i) => {
                let {elementType, elementConfig, value, valid, validation, touched} = this.state.authForm[inputName];
                return(<Input
                        key={inputName}
                        inputtype={elementType}
                        elementConfig={elementConfig}
                        value={value}
                        shouldValidate={validation}
                        invalid={!valid}
                        touched={touched}
                        changed={(event) => this.inputChangedEventHandler(event, inputName)}/>)
            }
        )

        let form = (
            <form onSubmit={this.submitAuthHandler}>
                { inputs }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        let errMessage = null;

        if(this.props.error){
            errMessage = <p>{this.props.error}</p>;
        }

        return (
            <div className={classes.Auth}>
                <h4>Enter you information!</h4>
                { errMessage }
                { form }
                <Button btnType="Danger" clicked={this.onSwitchAuthMode}>SWITCH TO {this.state.isSignup? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitAuthForm: (email, password, isSignup) => dispatch(authActions.asynAuth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
