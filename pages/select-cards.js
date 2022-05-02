import Layout from "../components/layout";
import { Card } from "../components/card";
import { Results } from "../components/results";
import { useState } from "react";
import { tarot } from "../utils/tarot";

export default function SelectCards() {
  const [count, updateCount] = useState(0);
  const [cardState, setCardState] = useState({
    danceability: 0,
    energy: 0,
    loudness: 0,
    popularity: 0,
  });
  console.log(cardState, count);
  return (
    <Layout>
      {count === 3 ? (
        <Results cardState={cardState} />
      ) : (
        <>
          <Card
            tarotInfo={tarot.artist}
            setCardState={setCardState}
            updateCount={updateCount}
          />
          <Card
            tarotInfo={tarot.debut}
            setCardState={setCardState}
            updateCount={updateCount}
          />
          <Card
            tarotInfo={tarot.icon}
            setCardState={setCardState}
            updateCount={updateCount}
          />
        </>
      )}
    </Layout>
  );
}
