import React from 'react';
import BuildControl from './BuildControl'
import classes from './index.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(c =>
                <BuildControl
                    key={c.label}
                    label={c.label}
                    isLessDisable={props.disabledInfos[c.type]}
                    add={props.addEvent.bind(this, c.type)}
                    remove={props.removeEvent.bind(this, c.type)}
                />)
        }
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.order}>
            ORDER NOW
        </button>
    </div>
)

export default buildControls;
