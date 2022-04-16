import { useRouter } from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/layout";
import {
  getAuthParams,
  getCodeChallenge,
  getCodeFromQuery,
  redirectToAuthUrl,
} from "../utils/auth";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const code = getCodeFromQuery();
    if (code) {
      document.cookie = `code=${code}`;
      router.push("/client");
    }
  });
  return (
    <Layout>
      <button
        onClick={() => {
          const { verifier, challenge } = getCodeChallenge();
          const scope =
            "user-read-private user-read-email playlist-modify-public user-top-read";
          const state = uuidv4(); // ⇨ e.g. '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
          const params = getAuthParams(scope, state, challenge);
          const query = new URLSearchParams(params).toString();
          document.cookie = `state=${state}`;
          document.cookie = `verifier=${verifier}`;
          redirectToAuthUrl(query);
        }}
      >
        Log in to Get Started
      </button>
    </Layout>
  );
}
