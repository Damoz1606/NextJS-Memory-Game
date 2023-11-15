import { Card as CardType } from '@/types'
import React, { useEffect, useRef } from 'react'
import styles from '@/styles/Card.module.css'
import animations from '@/styles/Animation.module.css'

type CardProps = {
    data: CardType;
    hide: boolean;
    match?: boolean;
    flipped?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ data, hide, match, flipped, onClick }) => {

    const handleClick = () => {
        if (!flipped && !match) {
            onClick?.();
        }
    }

    return (
        <div
            className={`${styles.card} ${hide ? styles.hide : ""}  ${flipped ? styles.open : ""} ${match ? styles.match : ""}`}
            onClick={handleClick}>
            {data.item}
        </div>
    )
}

export default Card