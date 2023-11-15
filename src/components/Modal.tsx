import React from 'react'
import styles from '@/styles/Modal.module.css'

const Modal: React.FC = () => {
    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.backdrop}`}></div>
            <div className={`${styles.body} .${styles.modal_body}`}>
                <div className={`${styles.header}`}>
                    <p className={`${styles.title}`}>GameOver</p>
                </div>
                <div className={`${styles.content}`}>
                    <p className={`${styles.paragraph}`}>Description</p>
                </div>
                <button>Close</button>
            </div>
        </div>
    )
}

export default Modal