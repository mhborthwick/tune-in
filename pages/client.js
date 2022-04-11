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
          const data = {
            track: "come and play in the milky night",
          };
          const response = await spotifyClient.search(data);
          const json = await response.json();
          console.log(json.tracks.items[0].uri);
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
            return { id: json.id };
          };
          const data = await getUserId();
          const response = await spotifyClient.createPlaylist(data);
          const json = await response.json();
          console.log(json);
        }}
      >
        Create playlist - Be Careful
      </button>
      <button
        onClick={async () => {
          const getTrackUri = async () => {
            const data = {
              track: "come and play in the milky night",
            };
            const response = await spotifyClient.search(data);
            const json = await response.json();
            return { uris: [json.tracks.items[0].uri] };
          };
          const getUserId = async () => {
            const response = await spotifyClient.getUserId();
            const json = await response.json();
            return { id: json.id };
          };
          const createPlaylist = async (data) => {
            const response = await spotifyClient.createPlaylist(data);
            const json = await response.json();
            return { id: json.id };
          };
          const trackUris = await getTrackUri();
          const userId = await getUserId();
          const playlistId = await createPlaylist(userId);
          const data = { ...trackUris, ...playlistId };

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
