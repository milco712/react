import React, {useState} from 'react';

const Counter = () => {
    const [num, setNumber] = useState(0);
    const increase = () => {
        setNumber(num+1);
        console.log('state1', num)
    }
    console.log('state2', num)
    const decrease = () => {
        setNumber(num-1);
    }
    return (
        <div>
            <button onClick={increase}>+1</button>
            <button onClick={decrease}>-1</button>
            <p>{num}</p>
        </div>
    )
}


export default Counter;