import React, {Component} from 'react';
import classes from './index.css';
import Spinner from '../../../components/UI/Spinner';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            mobile: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your mobile'
                },
                value: ''
            }, deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
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
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render(){

        const inputs = Object.keys(this.state.orderForm).map(
            (inputName, i) => {
                let {elementType, elementConfig, value} = this.state.orderForm[inputName];
                return(<Input
                        key={inputName}
                        inputtype={elementType}
                        elementConfig={elementConfig}
                        value={value}
                        changed={(event) => this.inputChangedEventHandler(event, inputName)}/>)
            }
        )

        let form = (
            <form onSubmit={this.orderHandler}>
                { inputs }
                <Button btnType="Success">ORDER</Button>
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

export default ContactData;
