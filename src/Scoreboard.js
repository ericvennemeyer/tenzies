import React from "react";

export default function Scoreboard(props) {
    return (
        <div className="scoreboard">
            <h4 className="score-element">This Game</h4>
            <h4 className="score-element">Best Game</h4>
            <h4 className="score-element">Rolls</h4>
            <h4 className="score-element score">{props.currRolls}</h4>
            <h4 className="score-element score">{props.bestRolls}</h4>
        </div>
    )
}