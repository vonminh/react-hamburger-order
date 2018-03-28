import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
})

export default rootReducer;
