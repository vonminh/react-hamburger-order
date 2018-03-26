import React from 'react';
import classes from './index.css';

const input = (props) => {

    let inputElement = null;

    switch(props.inputtype){
        case ('input'):
            inputElement =<input
                            className={classes.InputElement}
                            {...props.elementConfig}
                            value={props.value} onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                            className={classes.InputElement}
                            {...props.elementConfig}
                            value={props.value} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement =
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                    {
                        props.elementConfig.options.map((option, i) =>
                        <option key={i} value={option.value}>
                            {option.displayValue}
                        </option>)
                    }
                </select>
                break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return(
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;
