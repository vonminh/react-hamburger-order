import React from 'react';
import Wrapper from '../../../hoc/Wrapper';
import Button from '../../UI/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object
    .keys(props.ingredients)
    .map(i=>
        <li key={i}>
            <span style = {{textTransform: 'capitalize'}}>
                {i}
            </span> : {props.ingredients[i]}
        </li>
    )

    return(
        <Wrapper>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCancel}>
                Cancel
            </Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinue}>
                Continue
            </Button>
        </Wrapper>
    )
}

export default orderSummary;
