import React from "react";

export default function Die(props) {
    const classNames = `die ${props.isHeld ? "held" : ""}`;

    const dotsArray = [];
    for (let i = 0; i < props.number; i++) {
        dotsArray.push(<span className="dot"></span>);
    }

    return (
        <div className={classNames} onClick={props.handleClick}>
            {dotsArray}
        </div>
    )
}