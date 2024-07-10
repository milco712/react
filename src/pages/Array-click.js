import React, { useState } from "react";
import "../App.css";


const ArrayList = () => {
    let data = ['First', 'Second', 'Third', 'Forth', 'Fifth'];

    let [btnActive, setBtnActive] = useState("");

    const toggleActive = (e) => {
        setBtnActive((prev) => {
        return e.target.value;
        });
    };

    return (
        <div className="container">
            {data.map((item, idx) => {
                return (

                    <button
                    value={idx}
                    className={"btn" + (idx == btnActive ? " active" : "")}
                    onClick={toggleActive}
                    >
                    {item}
                    </button>

                );
            })}
        </div>
    );
}

export default ArrayList;