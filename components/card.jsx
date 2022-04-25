const tarot = {
  ARTIST: {
    label: "artist",
    danceability: 33,
    energy: 33,
    loudness: 33,
    popularity: 33,
  },
  BEAT: {
    label: "beat",
    danceability: 22,
    energy: 22,
    loudness: 22,
    popularity: 22,
  },
  DEBUT: {
    label: "debut",
    danceability: 11,
    energy: 11,
    loudness: 11,
    popularity: 11,
  },
};

const Card = ({ tarotInfo, setCardState, updateCount }) => {
  return (
    <span
      style={{
        border: "2px solid black",
        padding: "1rem",
        margin: "1rem",
      }}
      onClick={() => {
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
      }}
    >
      {tarotInfo.label}
    </span>
  );
};

export const Cards = ({ setCardState, updateCount }) => {
  return (
    <>
      <Card
        tarotInfo={tarot.ARTIST}
        setCardState={setCardState}
        updateCount={updateCount}
      />
      <Card
        tarotInfo={tarot.BEAT}
        setCardState={setCardState}
        updateCount={updateCount}
      />
      <Card
        tarotInfo={tarot.DEBUT}
        setCardState={setCardState}
        updateCount={updateCount}
      />
    </>
  );
};
