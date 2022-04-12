import Layout from "../components/layout";
import { useRef } from "react";
import { Spotify } from "../lib/spotify";

// Temp page to test Spotify API functionality
// Make sure to access this from the front page
// by clicking Log In to Get Started
export default function GetData() {
  const tokens = useRef({ access_token: "", refresh_token: "" });
  const spotifyClient = Spotify.init(tokens);
  return (
    <Layout>
      <button
        onClick={async () => {
          const data = { track: "come and play in the milky night" };
          const response = await spotifyClient.search(data);
          const json = await response.json();
          console.log(json);
        }}
      >
        Search Track
      </button>
      <button
        onClick={async () => {
          const response = await spotifyClient.getUserId();
          const json = await response.json();
          console.log(json);
        }}
      >
        Get User ID
      </button>
      <button
        onClick={async () => {
          const getUserId = async () => {
            const response = await spotifyClient.getUserId();
            const json = await response.json();
            return json.id;
          };
          const id = await getUserId();
          const data = { id: id, name: "test", description: "hello" };
          const response = await spotifyClient.createPlaylist(data);
          const json = await response.json();
          console.log(json);
        }}
      >
        Create playlist - Be Careful
      </button>
      <button
        onClick={async () => {
          const getTrackUris = async () => {
            const data = { track: "come and play in the milky night" };
            const response = await spotifyClient.search(data);
            const json = await response.json();
            return json.uris;
          };
          const getUserId = async () => {
            const response = await spotifyClient.getUserId();
            const json = await response.json();
            return json.id;
          };
          const getPlaylistId = async (data) => {
            const response = await spotifyClient.createPlaylist(data);
            const json = await response.json();
            return json.id;
          };
          const id = await getUserId();
          const trackUris = await getTrackUris();
          const playlistData = { id: id, name: "test", description: "hello" };
          const playlistId = await getPlaylistId(playlistData);
          const data = { id: playlistId, uris: trackUris };
          const response = await spotifyClient.addToPlaylist(data);
          const json = await response.json();
          console.log(json);
        }}
      >
        Add to playlist - Be Careful
      </button>
    </Layout>
  );
}
