export const Card = ({ tarotInfo, setCardState, updateCount }) => {
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
