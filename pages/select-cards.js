import Layout from "../components/layout";
import { Cards } from "../components/card";
import { Results } from "../components/results";
import { useState } from "react";

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
        <Cards setCardState={setCardState} updateCount={updateCount} />
      )}
    </Layout>
  );
}
