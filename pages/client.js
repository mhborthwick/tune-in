import Layout from "../components/layout";
import { getItemFromStorage, getTokens } from "../utils/authUtils";

// Temp page to test Spotify API functionality
// Make sure to access this from the front page
// by clicking Log In to Get Started
export default function GetData() {
  return (
    <Layout>
      <button
        onClick={async () => {
          const code = getItemFromStorage("code");
          const verifier = getItemFromStorage("verifier");
          const tokens = await getTokens(code, verifier);
          console.log(tokens);
        }}
      >
        Get Token
      </button>
    </Layout>
  );
}
