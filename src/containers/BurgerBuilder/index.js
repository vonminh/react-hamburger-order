import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger';
import Wrapper from '../../hoc/Wrapper';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/order';

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
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

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInitialization();
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
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p>
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

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.asyncInitIngredients()),
        onPurchaseInitialization: () => dispatch(orderActions.purchaseInit())
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
