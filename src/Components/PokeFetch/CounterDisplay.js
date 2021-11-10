import React from "react";

const CounterDisplay = (props) => {
    return(
        <div>
            <h2>Counter: {props.counter}</h2>
        </div>
    )
}

export default CounterDisplay;