import React, { Component } from 'react';
import Burger from '../../components/Burger';
import Wrapper from '../../hoc/Wrapper';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary'

const PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert("You have purchased successfully");
    }

    render(){
        const disabledInfos = {
            ...this.state.ingredients
        };

        for(let key in disabledInfos){
            disabledInfos[key] = disabledInfos[key] === 0
        }

        return(
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                        price={this.state.totalPrice}
                        addEvent={this.addIngredientHandler}
                        removeEvent={this.removeIngredientHandler}
                        disabledInfos={disabledInfos}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}/>
            </Wrapper>
        )
    }
}

export default BurgerBuilder;
