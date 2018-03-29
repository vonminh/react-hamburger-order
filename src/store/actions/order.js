import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orderData: orderData
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
}

export const asyncFetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFailed(err));
            })
    }
}

export const asyncPurchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}
