import useSWR from "swr";
import { useState } from "react";
import { Card, Layout, Results } from "../components/index";
import { tarot } from "../utils/tarot";

/**
 * Generates an array with 3 unique numbers
 *
 * @param {number} max
 * @returns {number[]} unique numbers
 */
function _getRandInts(max) {
  const nums = new Set();
  while (nums.size < 3) {
    nums.add(Math.floor(Math.random() * max));
  }
  return [...nums];
}

/**
 * Generates an array with 3 unique cards
 *
 * @returns {string[]} unique cards
 */
function getCards() {
  const keys = Object.keys(tarot);
  const randInts = _getRandInts(keys.length);
  const cards = randInts.map((v) => keys[v]);
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
    return <div style={{ color: "white" }}>Loading...</div>;
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
