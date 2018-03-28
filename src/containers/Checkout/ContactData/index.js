import React, {Component} from 'react';
import classes from './index.css';
import Spinner from '../../../components/UI/Spinner';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            mobile: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your mobile'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
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

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        const formData = {}
        for( let formElementId in this.state.orderForm ){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error=>
                {this.setState({loading: false})
            });
    }

    inputChangedEventHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputId in updatedOrderForm){
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render(){

        const inputs = Object.keys(this.state.orderForm).map(
            (inputName, i) => {
                let {elementType, elementConfig, value, valid, validation, touched} = this.state.orderForm[inputName];
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
            <form onSubmit={this.orderHandler}>
                { inputs }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
