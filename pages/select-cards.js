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
      {count > 0 ? (
        <Results cardState={cardState} />
      ) : (
        <div className="cards">
          <h1>Here are your cards</h1>
          <div className="cards__grid">
            <Card
              tarotInfo={tarot.artist}
              setCardState={setCardState}
              // updateCount={updateCount}
            />
            <Card
              tarotInfo={tarot.debut}
              setCardState={setCardState}
              // updateCount={updateCount}
            />
            <Card
              tarotInfo={tarot.icon}
              setCardState={setCardState}
              // updateCount={updateCount}
            />
          </div>
          <button
            type="submit"
            className="btn center-block"
            onClick={() => {
              let tarotInfo = tarot.icon;
              setCardState((prev) => {
                return {
                  danceability: prev.danceability + tarotInfo.danceability,
                  energy: prev.energy + tarotInfo.energy,
                  loudness: prev.loudness + tarotInfo.loudness,
                  popularity: prev.popularity + tarotInfo.popularity,
                };
              });
              updateCount((prev) => {
                return (prev += 1);
              });
              console.log(cardState);
            }}
          >
            test
          </button>
        </div>
      )}
    </Layout>
  );
}
