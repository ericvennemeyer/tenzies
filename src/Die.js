import React from "react";

export default function Die(props) {
    const classNames = `die ${props.isHeld ? "held" : ""} ${props.roll ? "roll" : ""}`;

    const dotsArray = [];
    for (let i = 0; i < props.number; i++) {
        dotsArray.push(<span className="dot"></span>);
    }

    // onanimationend = () => alert("Animation ended!");

    return (
        <div className={classNames} onClick={props.handleClick}>
            {dotsArray}
        </div>
    )
}