import Layout from "../components/layout";
import { useRef } from "react";
import { getUserId, getRequestInitOptions, search } from "../lib/spotify";

// Temp page to test Spotify API functionality
// Make sure to access this from the front page
// by clicking Log In to Get Started
export default function GetData() {
  const tokens = useRef({ access_token: "", refresh_token: "" });
  return (
    <Layout>
      <button
        onClick={async () => {
          const data = {
            track: "come and play in the milky night",
          };
          const options = await getRequestInitOptions("POST", tokens, data);
          const response = await search(options);
          const json = await response.json();
          console.log(json);
        }}
      >
        Search Track
      </button>
      <button
        onClick={async () => {
          const options = await getRequestInitOptions("GET", tokens);
          const response = await getUserId(options);
          const json = await response.json();
          console.log(json);
        }}
      >
        Get User ID
      </button>
    </Layout>
  );
}
