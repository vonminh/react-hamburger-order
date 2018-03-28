import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger';
import Wrapper from '../../hoc/Wrapper';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    purchaseHandler = () =>{
        this.setState({
            purchasing: true
        })
    }

    updatePurchaseState = () =>{
        const ingredients = {
            ...this.props.ings
        }

        const sum = Object.keys(ingredients).reduce((acc, cur)=>{
            return acc + ingredients[cur]
        }, 0)

        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCountIngredient = this.state.ingredients[type];
    //     const updatedCount = oldCountIngredient + 1;
    //     const instanceOfIngredients = {
    //         ...this.state.ingredients
    //     }
    //     instanceOfIngredients[type] = updatedCount;
    //     const updatedPrice = this.state.totalPrice + PRICES[type];
    //     this.setState({
    //         ingredients: instanceOfIngredients,
    //         totalPrice: updatedPrice
    //     })
    //     this.updatePurchaseState(instanceOfIngredients);
    // }
    //
    // removeIngredientHandler = (type) => {
    //     const oldCountIngredient = this.state.ingredients[type];
    //
    //     if(oldCountIngredient > 0) {
    //         const updatedCount = oldCountIngredient - 1;
    //         const instanceOfIngredients = { ...this.state.ingredients };
    //         instanceOfIngredients[type] = updatedCount;
    //         const updatedPrice = this.state.totalPrice - PRICES[type];
    //
    //         this.setState({
    //             ingredients: instanceOfIngredients,
    //             totalPrice: updatedPrice
    //         })
    //         this.updatePurchaseState(instanceOfIngredients);
    //     } else {
    //     }
    // }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfos = {
            ...this.props.ings
        };

        for(let key in disabledInfos){
            disabledInfos[key] = disabledInfos[key] === 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p>
                                        :<Spinner />

        if(this.props.ings){
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                            price={this.props.price}
                            addEvent={this.props.onIngredientAdded}
                            removeEvent={this.props.onIngredientRemoved}
                            disabledInfos={disabledInfos}
                            purchasable={this.updatePurchaseState()}
                            order={this.purchaseHandler}/>
                </Wrapper>
            );

            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
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

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
