import Layout from "../components/layout";
import { Card } from "../components/card";
import { Results } from "../components/results";
import { useState } from "react";
import { tarot } from "../utils/tarot";
import useSWR from "swr";

function _getRandInts(max) {
  const nums = new Set();
  while (nums.size < 3) {
    nums.add(Math.floor(Math.random() * max));
  }
  return [...nums];
}

function getCards() {
  const keys = Object.keys(tarot);
  const randInts = _getRandInts(keys.length);
  const cards = [keys[randInts[0]], keys[randInts[1]], keys[randInts[2]]];
  return cards;
}

export default function SelectCards() {
  const [isClicked, updateClick] = useState(false);
  const [cardState, setCardState] = useState({
    danceability: 0,
    energy: 0,
    loudness: 0,
    popularity: 0,
  });

  // todo - look into refactoring
  const { data } = useSWR("cards", getCards);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {isClicked ? (
        <Results cardState={cardState} />
      ) : (
        <div className="cards">
          <h1>Here are your cards</h1>
          <div className="cards__grid">
            <Card tarotInfo={tarot[data[0]]} />
            <Card tarotInfo={tarot[data[1]]} />
            <Card tarotInfo={tarot[data[2]]} />
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
