import styles from "../styles/card.module.css"

export function Card({ tarotInfo, setCardState, updateCount }) {
  return (
    <span>
      <img 
        className={styles.card} 
        alt="Tarot card, face up"
        src="../assets/card-1.png"
        width="1000"
        height="auto"
      />
    </span>
  );
};
