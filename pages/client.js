import Layout from "../components/layout";
import { useRef } from "react";
import { getRequestInitOptions, search } from "../lib/spotify";

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
          const options = await getRequestInitOptions(data, "POST", tokens);
          const response = await search(options);
          const json = await response.json();
          console.log(json);
        }}
      >
        Search Track
      </button>
    </Layout>
  );
}
