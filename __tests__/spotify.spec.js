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

    describe("Method: getGenres", () => {
      it("should create request with correct information", async () => {
        const client = Spotify.init();
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "GET",
        };
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.getGenres();
        const api = "/api/v1/genres";
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

    describe("Method: getTopItems", () => {
      it("should create request with correct information", async () => {
        const client = Spotify.init();
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "GET",
        };
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.getTopItems("artists");
        const api = "/api/v1/items?type=artists";
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

    describe("Method: getRecommendations", () => {
      it("should create request with correct information", async () => {
        const client = Spotify.init();
        const data = {
          seedArtists: "3XxNRirzbjfLdDli06zMaB,",
          seedGenres: "acoustic,breakbeat",
          seedTracks: "5B6Kjha6RRIMWGN7zGsAaT,6BGNjTZ8zp9MlsIydBa7A9",
          targetDanceability: 0.7,
          targetEnergy: 0.4,
          targetLoudness: 0.3,
          targetPopularity: 85,
        };
        const params = {
          headers: { authorization: "foo", "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        };
        jest.spyOn(client, "_getRequestInitOptions").mockReturnValue(params);
        await client.getRecommendations(data);
        const api = "/api/v1/recommendations";
        expect(global.fetch).toHaveBeenCalledWith(api, params);
      });
    });
  });
});
