import Modal from "@/components/Modal";
import { ReactNode, createContext, useState } from "react";

type GameContextProps = {
    start: boolean;
    gameOver: boolean;
    score: number;
    AddScore: (value: number) => void;
    TriggerGameOver: () => void;
    TriggerNewGame: () => void;
}

const GameContext = createContext<GameContextProps>({
    start: false,
    gameOver: false,
    score: 0,
    AddScore: () => { },
    TriggerGameOver: () => { },
    TriggerNewGame: () => { }
});

type GameProviderProps = {
    children: ReactNode
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {

    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const AddScore = (value: number = 0) => {
        setScore(score + value);
    }

    const TriggerGameOver = () => {
        setGameOver(true);
        setStart(false);
    }

    const TriggerNewGame = () => {
        setScore(0);
        setStart(true);
        setGameOver(false);
    }

    const value: GameContextProps = {
        start,
        gameOver,
        score,
        AddScore,
        TriggerGameOver,
        TriggerNewGame
    }

    return <GameContext.Provider value={value}>
        <Modal />
        {children}
    </GameContext.Provider>
}

export { GameProvider, GameContext };