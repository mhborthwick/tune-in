import { cookies } from "../services/cookies";

describe("cookies service", () => {
  it("should set and remove cookie", () => {
    cookies.set("foo", "bar");
    expect(document.cookie).toEqual("foo=bar");
    cookies.remove("foo");
    expect(document.cookie).toEqual("");
  });
});
