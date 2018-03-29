import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const burgerBuilder = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedStateProperties = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + PRICES[action.ingredientName]
            }
            return updateObject(state, updatedStateProperties);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedStateProps = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - PRICES[action.ingredientName]
            }
            return updateObject(state, updatedStateProps);

        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: true
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default burgerBuilder;
