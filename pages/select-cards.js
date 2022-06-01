import useSWR from "swr";
import { useReducer } from "react";
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

/**
 * Reducer fn for managing card state
 *
 * @param state
 * @param action
 */
function reducer(state, action) {
  const { cardState } = state;
  const { payload } = action;
  if (action.type === "click") {
    return {
      isClicked: true,
      cardState: {
        danceability: cardState.danceability + payload.danceability,
        energy: cardState.energy + payload.energy,
        loudness: cardState.loudness + payload.loudness,
        popularity: cardState.popularity + payload.popularity,
      },
    };
  }
}

export default function SelectCards() {
  const [state, dispatch] = useReducer(reducer, {
    isClicked: false,
    cardState: {
      danceability: 0,
      energy: 0,
      loudness: 0,
      popularity: 0,
    },
  });
  const { data } = useSWR("cards", getCards, {
    revalidateIfStale: false,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  if (!data) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
  return (
    <Layout>
      {state.isClicked ? (
        <Results cardState={state.cardState} />
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
              const tarotInfo = data.reduce(
                (prev, curr) => {
                  const danceability =
                    prev.danceability + tarot[curr].danceability;
                  const energy = prev.energy + tarot[curr].energy;
                  const loudness = prev.loudness + tarot[curr].loudness;
                  const popularity = prev.popularity + tarot[curr].popularity;
                  return {
                    danceability,
                    energy,
                    loudness,
                    popularity,
                  };
                },
                {
                  danceability: 0,
                  energy: 0,
                  loudness: 0,
                  popularity: 0,
                }
              );
              dispatch({ type: "click", payload: tarotInfo });
            }}
          >
            test
          </button>
        </div>
      )}
    </Layout>
  );
}
