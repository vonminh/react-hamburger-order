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

const getAdjustedProperties = (state, action) => {
    const adjustAmount = action.type === actionTypes.ADD_INGREDIENT ? 1 : -1;
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + adjustAmount };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + (PRICES[action.ingredientName] * adjustAmount)
    }
}

const burgerBuilder = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedStateProperties = getAdjustedProperties(state, action);
            return updateObject(state, updatedStateProperties);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedProperties = getAdjustedProperties(state, action);
            return updateObject(state, updatedProperties);

        case actionTypes.INIT_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: true
            });

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });

        default:
            return state;
    }
}

export default burgerBuilder;
