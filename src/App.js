import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

export default function App() {

    const [allDice, setAllDice] = React.useState(createDice());
    const [tenzies, setTenzies] = React.useState(false);
    
    React.useEffect(() => {
        const matchNumber = allDice[0].number;
        const allSameNumber = allDice.every(die => (die.number === matchNumber));
        
        const allHeld = allDice.every(die => die.isHeld);
       
        if (allHeld && allSameNumber) {
            setTenzies(true);
            console.log("You Won!");
        }
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
        } else {
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
                handleClick={() => holdDie(die.id)} />
        )
    })

    return (
        <div className="app-container">
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={rollDice}>{tenzies ? "Play Again" : "Roll"}</button>
        </div>
    )
}