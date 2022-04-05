import Layout from "../components/layout";
import { redirectToAuthorize } from "../utils/authUtils";

export default function Home() {
  return (
    <Layout>
      <button onClick={() => redirectToAuthorize()}>
        Log in to Get Started
      </button>
    </Layout>
  );
}
