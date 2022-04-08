import Layout from "../components/layout";
import { getItemFromStorage, getTokens } from "../utils/authUtils";
import { useRef } from "react";
import { search } from "../lib/spotify";

// Temp page to test Spotify API functionality
// Make sure to access this from the front page
// by clicking Log In to Get Started
export default function GetData() {
  const tokensRef = useRef({ access_token: "", refresh_token: "" });
  return (
    <Layout>
      <button
        onClick={async () => {
          const code = getItemFromStorage("code");
          const verifier = getItemFromStorage("verifier");
          const tokens = await getTokens(code, verifier, tokensRef);
          tokensRef.current.access_token = tokens.access_token;
          tokensRef.current.refresh_token = tokens.refresh_token;
          const data = await search(tokensRef.current.access_token);
          console.log(data);
        }}
      >
        Search Track
      </button>
    </Layout>
  );
}
