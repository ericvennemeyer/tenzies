import React from "react";

export default function Die(props) {
    const classNames = `die ${props.isHeld ? "held" : ""}`;

    return (
        <div className={classNames} onClick={props.handleClick}>
            {props.number}
        </div>
    )
}