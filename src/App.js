import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";
import Scoreboard from "./Scoreboard";

export default function App() {
    
    let bestScore;
    if (localStorage.getItem("bestScore")) {
        bestScore = localStorage.getItem("bestScore");
    } else {
        bestScore = 0;
    }

    const [allDice, setAllDice] = React.useState(createDice());
    const [scoreboard, setScoreboard] = React.useState(
        {
            currRolls: 0,
            bestRolls: bestScore
        }
    )
    const [tenzies, setTenzies] = React.useState(false);
    const [roll, setRoll] = React.useState(false);
    
    React.useEffect(() => {
        const matchNumber = allDice[0].number;
        const allSameNumber = allDice.every(die => (die.number === matchNumber));
        
        const allHeld = allDice.every(die => die.isHeld);
       
        if (allHeld && allSameNumber) {
            setTenzies(true);
        }

        localStorage.setItem("bestScore", scoreboard.bestRolls);

    }, allDice);

    function createDice() {
        const newDiceArray = [];
        for (let i = 0; i < 10; i++) {
            newDiceArray.push(randomDie());
        }

        return newDiceArray;
    }

    function randomDie() {
        return {
            number: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
           }   
    }

    function rollDice() {
        if (!tenzies) {
            setAllDice(prevDice => prevDice.map(die => {
                if (die.isHeld) {
                    return {...die}
                } else {
                    return randomDie();
                }
            }))

            setScoreboard(prevScoreboard => {
                return {...prevScoreboard, currRolls: prevScoreboard.currRolls + 1}
            })

            setRoll(true);

        } else {
            setScoreboard(prevScoreboard => {
                let tempRolls;
                if (prevScoreboard.bestRolls === 0 || prevScoreboard.currRolls < prevScoreboard.bestRolls) {
                    tempRolls = prevScoreboard.currRolls;
                } else {
                    tempRolls = prevScoreboard.bestRolls;
                }

                return {
                    currRolls: 0,
                    bestRolls: tempRolls
                }
            })
            
            setAllDice(createDice());
            setTenzies(false);
        }   
    }

    function holdDie(id) {
        setAllDice(prevDice => prevDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = allDice.map(die => {
        return (
            <Die 
                key={die.id}
                number={die.number} 
                isHeld={die.isHeld} 
                id={die.id} 
                roll={roll}
                handleClick={() => holdDie(die.id)} />
        )
    })

    return (
        <div className="app-container">
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <Scoreboard currRolls={scoreboard.currRolls} bestRolls={scoreboard.bestRolls} />
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={rollDice}>{tenzies ? "Play Again" : "Roll"}</button>
        </div>
    )
}