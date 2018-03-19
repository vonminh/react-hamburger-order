import React, { Component } from 'react';
import Burger from '../../components/Burger';
import Wrapper from '../../hoc/Wrapper';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

const PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    purchaseHandler = () =>{
        this.setState({
            purchasing: true
        })
    }

    updatePurchaseState = (argIngredients) =>{
        const ingredients = {
            ...argIngredients
        }

        const sum = Object.keys(ingredients).reduce((acc, cur)=>{
            return acc + ingredients[cur]
        }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCountIngredient = this.state.ingredients[type];
        const updatedCount = oldCountIngredient + 1;
        const instanceOfIngredients = {
            ...this.state.ingredients
        }
        instanceOfIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice + PRICES[type];
        this.setState({
            ingredients: instanceOfIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(instanceOfIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCountIngredient = this.state.ingredients[type];

        if(oldCountIngredient > 0) {
            const updatedCount = oldCountIngredient - 1;
            const instanceOfIngredients = { ...this.state.ingredients };
            instanceOfIngredients[type] = updatedCount;
            const updatedPrice = this.state.totalPrice - PRICES[type];

            this.setState({
                ingredients: instanceOfIngredients,
                totalPrice: updatedPrice
            })
            this.updatePurchaseState(instanceOfIngredients);
        } else {
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {

        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
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
                this.setState({loading: false, purchasing: false})
            })
            .catch(error=>
                {this.setState({loading: false, purchasing: false})
            });
    }

    render(){
        const disabledInfos = {
            ...this.state.ingredients
        };

        for(let key in disabledInfos){
            disabledInfos[key] = disabledInfos[key] === 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p>
                                        :<Spinner />

        if(this.state.ingredients){
            burger = (
                <Wrapper>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                            price={this.state.totalPrice}
                            addEvent={this.addIngredientHandler}
                            removeEvent={this.removeIngredientHandler}
                            disabledInfos={disabledInfos}
                            purchasable={this.state.purchasable}
                            order={this.purchaseHandler}/>
                </Wrapper>
            );

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Wrapper>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
