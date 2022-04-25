import { useRef } from "react";
import useSWR from "swr";
import { Spotify } from "../lib/spotify";

export const Results = ({ cardState }) => {
  const tokens = useRef({ access_token: "", refresh_token: "" });
  const client = Spotify.init(tokens);
  const fetcher = async (_, params) => {
    const response = await client.getRecommendations(params);
    return await response.json();
  };
  const params = {
    seedArtists: "3XxNRirzbjfLdDli06zMaB,",
    seedGenres: "acoustic,breakbeat",
    seedTracks: "5B6Kjha6RRIMWGN7zGsAaT,6BGNjTZ8zp9MlsIydBa7A9",
    targetDanceability: cardState.danceability / 100,
    targetEnergy: cardState.energy / 100,
    targetLoudness: cardState.loudness / 100,
    targetPopularity: cardState.popularity,
  };
  const { data } = useSWR(["getTracks", params], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  if (!data) {
    return <div>Loading...</div>;
  } else if (data) {
    return <div>{data.tracks[0].name}</div>;
  }
};
