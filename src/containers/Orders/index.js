import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {

        let orders = <Spinner />

        if(this.state.orders){
            orders = this.state.orders.map(o =>
                <Order
                    key={o.id}
                    ingredients={o.ingredients}
                    price={o.price}/>);
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
