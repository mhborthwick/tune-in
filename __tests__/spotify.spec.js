import { Spotify } from "../lib/spotify";

describe("Class: Spotify", () => {
  describe("Method: init", () => {
    it("should throw if mutable ref object is not provided", () => {
      const notMutableRefObj = {
        access_token: "foo",
        refresh_token: "bar",
      };
      expect(() => Spotify.init(notMutableRefObj)).toThrow();
    });

    it("should create new instance of Spotify class with tokens", () => {
      const mockMutableRefObj = {
        current: {
          access_token: "foo",
          refresh_token: "bar",
        },
      };
      const client = Spotify.init(mockMutableRefObj);
      expect(client).toBeInstanceOf(Spotify);
      expect(client.tokens.current.access_token).toEqual("foo");
      expect(client.tokens.current.refresh_token).toEqual("bar");
    });
  });

  describe("API Routes", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() => {});
    });

    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });

    describe("Method: search", () => {
      it("should create request with correct information", async () => {
        const tokens = {
          current: {
            access_token: "foo",
            refresh_token: "bar",
          },
        };
        const client = Spotify.init(tokens);
        const data = { track: "come and play in the milky night" };
        await client.search(data);
        const api = "/api/v1/search";
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });

    describe("Method: getUserId", () => {
      it("should create request with correct information", async () => {
        const tokens = {
          current: {
            access_token: "foo",
            refresh_token: "bar",
          },
        };
        const client = Spotify.init(tokens);
        await client.getUserId();
        const api = "/api/v1/id";
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "GET",
        };
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });

    describe("Method: createPlaylist", () => {
      it("should create request with correct information", async () => {
        const tokens = {
          current: {
            access_token: "foo",
            refresh_token: "bar",
          },
        };
        const client = Spotify.init(tokens);
        const data = { id: "123", name: "test", description: "hello" };
        await client.createPlaylist(data);
        const api = "/api/v1/playlist/create";
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });

    describe("Method: addtoPlaylist", () => {
      it("should create request with correct information", async () => {
        const tokens = {
          current: {
            access_token: "foo",
            refresh_token: "bar",
          },
        };
        const client = Spotify.init(tokens);
        const data = { id: "123", uris: ["456"] };
        await client.addToPlaylist(data);
        const api = "/api/v1/playlist/add";
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });
  });
});
