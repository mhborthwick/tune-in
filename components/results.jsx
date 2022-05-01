import { useRef } from "react";
import useSWR from "swr";
import { Spotify } from "../lib/spotify";

export const Results = ({ cardState }) => {
  const tokens = useRef({ access_token: "", refresh_token: "" });
  const client = Spotify.init(tokens);
  const getUserId = async () => {
    const response = await client.getUserId();
    const json = await response.json();
    return json.id;
  };
  const getPlaylistId = async (data) => {
    const response = await client.createPlaylist(data);
    const json = await response.json();
    return json.id;
  };
  const fetcher = async (_, params) => {
    const recResponse = await client.getRecommendations(params);
    const recJson = await recResponse.json();
    const { tracks } = recJson;
    const uris = tracks.map((t) => {
      return t.uri;
    });
    const id = await getUserId();
    const playlistData = { id: id, name: "test", description: "hello" };
    const playlistId = await getPlaylistId(playlistData);
    const data = { id: playlistId, uris: uris };
    console.log(data);
    const response = await client.addToPlaylist(data);
    const json = await response.json();
    return json;
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
    revalidateIfStale: false,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  if (!data) {
    return <div>Loading...</div>;
  } else if (data) {
    return <div>playlist created</div>;
  }
};
