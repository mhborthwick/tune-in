import Layout from "../components/layout";
import { Card } from "../components/card";
import { Results } from "../components/results";
import { useState } from "react";
import { tarot } from "../utils/tarot";

export default function SelectCards() {
  const [isClicked, updateClick] = useState(false);
  const [cardState, setCardState] = useState({
    danceability: 0,
    energy: 0,
    loudness: 0,
    popularity: 0,
  });
  console.log(cardState, isClicked);
  return (
    <Layout>
      {isClicked ? (
        <Results cardState={cardState} />
      ) : (
        <div className="cards">
          <h1>Here are your cards</h1>
          <div className="cards__grid">
            <Card tarotInfo={tarot.artist} />
            <Card tarotInfo={tarot.debut} />
            <Card tarotInfo={tarot.icon} />
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
              updateClick(() => {
                return true;
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
