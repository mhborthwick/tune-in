import Layout from "../components/layout";
import { useRef } from "react";
import { search } from "../lib/spotify";

// Temp page to test Spotify API functionality
// Make sure to access this from the front page
// by clicking Log In to Get Started
export default function GetData() {
  const tokensRef = useRef({ access_token: "", refresh_token: "" });
  async function setTokensRef() {
    if (!tokensRef.current.access_token) {
      const response = await fetch("/api/v1/tokens");
      const tokens = await response.json();
      tokensRef.current.access_token = tokens.access_token;
      tokensRef.current.refresh_token = tokens.refresh_token;
    }
  }
  return (
    <Layout>
      <button
        onClick={async () => {
          await setTokensRef();
          const response = await search(tokensRef.current.access_token);
          const json = await response.json();
          console.log(json);
        }}
      >
        Search Track
      </button>
    </Layout>
  );
}
