import React, { useEffect, useState } from 'react'
import styles from '@/styles/Game.module.css'
import animations from '@/styles/Animation.module.css'
import { cardsData } from '@/storage'
import Card from './Card'
import { Card as CardType } from '@/types'
import { useGame } from '@/hooks/useGame'

type SelectedCard = {
    index: number;
    key: string;
}

const Game: React.FC = () => {

    const [cards, setCards] = useState<CardType[]>([]);
    const [score, setScore] = useState<number>(0);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [gameover, setGameover] = useState<boolean>(false);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [clearedCards, setClearedCards] = useState<string[]>([]);

    useEffect(() => {
        start();
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const start = () => {
        setFlippedCards([]);
        setClearedCards([]);
        setGameover(false);
        shuffle();
    }

    const shuffle = () => {
        const newOrderedHand = cardsData.sort(() => Math.random() > .5 ? 2 : -1);
        setCards(newOrderedHand);
    }

    const evaluate = (index: number) => {
        if (flippedCards.length >= 1) {
            const [first] = flippedCards;
            if (cards[first].key === cards[index].key) {
                clearedCards.push(cards[first].key);
                clearedCards.push(cards[index].key);
                setScore(score + 2);
            }
            setTimeout(() => setFlippedCards([]), 500);
            checkGameEnd();
        }
    }

    const checkGameEnd = () => {
        if (cards.length === clearedCards.length) {
            setStartGame(false);
            setGameover(true);
        }
    }

    const isFlipped = (index: number) => flippedCards.includes(index);

    const isCleared = (key: string) => clearedCards.includes(key);

    const addFlipped = (index: number) => {
        if (isFlipped(index)) return;
        setFlippedCards([...flippedCards, index]);
    }

    const handleClick = () => {
        if (!startGame) {
            start();
            setStartGame(true);
        } else {
            setStartGame(false);
        }
    }

    return (
        <div className={styles.container}>
            {/* <div style={{ display: "flex", top: 0, right: 0, position: 'fixed' }}>{score}</div> */}
            <h2>{!gameover ? "Memory Game" : "Game Over"}</h2>
            <div className={`${styles.board} ${!startGame ? styles.shrink : ""}`}>
                {
                    cards.map((item, index) => (<Card
                        hide={!startGame}
                        match={isCleared(item.key)}
                        flipped={isFlipped(index)}
                        onClick={() => {
                            addFlipped(index);
                            evaluate(index);
                        }}
                        data={item}
                        key={`${index}-${item.key}`} />))
                }
            </div>
            <div className={`${styles.score} ${!gameover ? styles.shrink : ""}`}>
                <p>Your score is: {score}</p>
            </div>
            <button
                onClick={handleClick}
                className={`${animations.hover_shake} ${!startGame ? styles.full_width : ""}`}>{startGame ? "End" : "Start"}</button>
        </div>
    )
}

export { Game }