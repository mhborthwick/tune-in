import { useState, useEffect } from "react" 
import styles from "../styles/card.module.css"

export function Card({ tarotInfo, setCardState, updateCount }) {
  // const [info, handleTarot] = useState('');
  // useEffect(() => { 
  //   handleTarot(tarotInfo);
  //   return () => handleTarot('')
  // }, [tarotInfo])
  return (
    <div>
      {tarotInfo.label}
      <img 
        className={styles.card} 
        alt="Tarot card, face up"
        src="../assets/card-1.png"
        width="1000"
        height="auto"
      />
    </div>
  );
};
