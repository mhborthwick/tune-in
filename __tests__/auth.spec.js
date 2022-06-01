import {
  getCodeFromQuery,
  redirectToAuthUrl,
  getAuthParams,
  getCodeChallenge,
} from "../utils/auth";

describe("auth utils", () => {
  let windowSpy;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  describe("getCodeFromQuery", () => {
    it("should return code param", () => {
      windowSpy.mockImplementation(() => ({
        location: {
          search: "?code=test",
        },
      }));
      const code = getCodeFromQuery();
      expect(code).toEqual("test");
    });
  });

  describe("redirectToAuthUrl", () => {
    it("should redirect to authorize url", () => {
      const mockReplaceFn = jest.fn();
      windowSpy.mockImplementation(() => ({
        location: {
          replace: mockReplaceFn,
        },
      }));
      redirectToAuthUrl("test");
      expect(mockReplaceFn).toHaveBeenCalledWith(
        "https://accounts.spotify.com/authorize?test"
      );
    });
  });

  describe("getAuthParams", () => {
    it("should get auth params", () => {
      const params = getAuthParams("scope", "state", "challenge");
      expect(params).toEqual(
        expect.objectContaining({
          client_id: "foo",
          code_challenge: "challenge",
          code_challenge_method: "S256",
          redirect_uri: "bar",
          response_type: "code",
          scope: "scope",
          state: "state",
        })
      );
    });
  });

  describe("getCodeChallenge", () => {
    it("should return verifier and challenge", () => {
      const { verifier, challenge } = getCodeChallenge();
      expect(verifier).toBeDefined();
      expect(challenge).toBeDefined();
    });
  });
});
