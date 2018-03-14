import React, { Component } from 'react';
import Burger from '../../components/Burger';
import Wrapper from '../../hoc/Wrapper';
import BuildControls from '../../components/Burger/BuildControls';

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
        totalPrice: 4
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
        } else {
        }
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addEvent={this.addIngredientHandler}
                    removeEvent={this.removeIngredientHandler}
                    disabledInfos={disabledInfos}
                />
            </Wrapper>
        )
    }
}

export default BurgerBuilder;
