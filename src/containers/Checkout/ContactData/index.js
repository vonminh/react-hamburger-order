import React, {Component} from 'react';
import classes from './index.css';
import Spinner from '../../../components/UI/Spinner';
import Button from '../../../components/UI/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
            country: ''
        },
        mobile: '',
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: 'Bob',
                address: {
                    street: 'Test street',
                    zipCode: '76000',
                    country: 'Vietnam'
                },
                mobile: '0123456789'
            },
            deliveryMethod: 'fastest'
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

    render(){
        let form = (
            <form action="post">
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="address" placeholder="Your address"/>
                <input className={classes.Input} type="text" name="mobile" placeholder="Your mobile"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
