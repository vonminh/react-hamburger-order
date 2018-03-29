import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        if(this.props.ings && !this.props.purchased){
            return (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled = {this.checkoutCancelledHandler}
                        checkoutContinued = {this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return <Redirect to="/" />;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
