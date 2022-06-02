import { Spotify } from "../lib/spotify";

describe("Class: Spotify", () => {
  describe("Method: init", () => {
    it("should create new instance of Spotify class", () => {
      const client = Spotify.init();
      expect(client).toBeInstanceOf(Spotify);
    });
  });

  describe("API Routes", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockReturnValue({
        status: 200,
      });
    });

    afterEach(() => {
      global.fetch.mockClear();
      delete global.fetch;
    });

    describe("Method: search", () => {
      it("should create request with correct information", async () => {
        const data = { track: "come and play in the milky night" };
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        const client = Spotify.init();
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.search(data);
        const api = "/api/v1/search";
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });

    describe("Method: getUserId", () => {
      it("should create request with correct information", async () => {
        const client = Spotify.init();
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "GET",
        };
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.getUserId();
        const api = "/api/v1/id";
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });

    describe("Method: createPlaylist", () => {
      it("should create request with correct information", async () => {
        const client = Spotify.init();
        const data = { id: "123", name: "test", description: "hello" };
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.createPlaylist(data);
        const api = "/api/v1/playlist/create";
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });

    describe("Method: addtoPlaylist", () => {
      it("should create request with correct information", async () => {
        const client = Spotify.init();
        const data = { id: "123", uris: ["456"] };
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.addToPlaylist(data);
        const api = "/api/v1/playlist/add";
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });
  });
});
