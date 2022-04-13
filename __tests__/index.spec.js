import { render, screen, fireEvent } from "@testing-library/react";
import * as uuid from "uuid";
import Home from "../pages/index";
import * as auth from "../utils/auth";

jest.mock("uuid");

describe("Home", () => {
  it("renders a button that triggers redirect with query on click", () => {
    jest.spyOn(auth, "redirectToAuthUrl").mockImplementationOnce(jest.fn());
    jest.spyOn(uuid, "v4").mockReturnValueOnce("123abcABC");
    const values = { verifier: "foo", challenge: "bar" };
    jest.spyOn(auth, "getCodeChallenge").mockReturnValueOnce(values);
    render(<Home />);
    const button = screen.getByRole("button", {
      name: /Log in to Get Started/i,
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(auth.redirectToAuthUrl).toHaveBeenCalledTimes(1);
    const mockQuery =
      "response_type=code&client_id=foo&scope=user-read-private+user-read-email+playlist-modify-public&redirect_uri=bar&state=123abcABC&code_challenge_method=S256&code_challenge=bar";
    expect(auth.redirectToAuthUrl).toHaveBeenCalledWith(mockQuery);
  });
});
