import React from 'react';
import classes from './index.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {

    let providedIngredients =
        Object.keys(props.ingredients)
        .map(ig => {
            return [...Array(props.ingredients[ig])]
            .map((_, i) => <BurgerIngredient key={ ig + i } type={ ig } />);
        })
        .reduce((acc, val) => acc.concat(val), []);

    if(providedIngredients.length === 0){
        providedIngredients = <p>Please start adding ingredients!</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {providedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
