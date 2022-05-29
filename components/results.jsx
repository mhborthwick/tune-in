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
  const getSeedData = async () => {
    const response = await client.getTopItems("artists");
    const json = await response.json();
    const artist = json.items[0].id;
    const genre1 = json.items[0].genres[0];
    const genre2 = json.items[1].genres[0];
    const genres = `${genre1},${genre2}`;
    const response2 = await client.getTopItems("tracks");
    const json2 = await response2.json();
    const track1 = json2.items[0].id;
    const track2 = json2.items[1].id;
    const seedTracks = `${track1},${track2}`;
    return { artist, genres, seedTracks };
  };
  const fetcher = async () => {
    const { artist, genres, seedTracks } = await getSeedData();
    const params = {
      seedArtists: artist,
      seedGenres: genres,
      seedTracks: seedTracks,
      targetDanceability: cardState.danceability / 100,
      targetEnergy: cardState.energy / 100,
      targetLoudness: cardState.loudness / 100,
      targetPopularity: cardState.popularity,
    };
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
  const { data } = useSWR("getTracks", fetcher, {
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
