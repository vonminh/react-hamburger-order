import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as orderActions from '../../store/actions/order';
import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.onInitFetchOrders();
    }

    render() {

        let orders = <Spinner />

        if(!this.props.loading){
            orders = this.props.orders.map(o =>
                <Order key={o.id}
                       ingredients={o.ingredients}
                       price={o.price}/>);
        }

        return(<div>{ orders }</div>);
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitFetchOrders: () => dispatch(orderActions.asyncFetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
