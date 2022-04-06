import { render, screen, fireEvent } from "@testing-library/react";
import * as uuid from "uuid";
import Home from "../pages/index";
import * as authUtil from "../utils/authUtils";

jest.mock("uuid");

describe("Home", () => {
  it("renders a button that triggers redirect with query on click", () => {
    jest.spyOn(authUtil, "redirectToAuthUrl").mockImplementationOnce(jest.fn());
    jest.spyOn(uuid, "v4").mockReturnValueOnce("123abcABC");
    const values = { verifier: "foo", challenge: "bar" };
    jest.spyOn(authUtil, "getCodeChallenge").mockReturnValueOnce(values);
    render(<Home />);
    const button = screen.getByRole("button", {
      name: /Log in to Get Started/i,
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(authUtil.redirectToAuthUrl).toHaveBeenCalledTimes(1);
    const mockQuery =
      "response_type=code&client_id=foo&scope=user-read-private+user-read-email&redirect_uri=bar&state=123abcABC&code_challenge_method=S256&code_challenge=bar";
    expect(authUtil.redirectToAuthUrl).toHaveBeenCalledWith(mockQuery);
  });
});
