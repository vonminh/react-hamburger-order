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
    </div>
)

export default buildControls;
