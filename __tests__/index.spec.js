import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/index";
import * as authUtil from "../utils/authUtils";

describe("Home", () => {
  it("renders a button that calls redirectToAuthorize on click", () => {
    jest
      .spyOn(authUtil, "redirectToAuthorize")
      .mockImplementationOnce(jest.fn());
    render(<Home />);
    const button = screen.getByRole("button", {
      name: /Log in to Get Started/i,
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(authUtil.redirectToAuthorize).toHaveBeenCalledTimes(1);
  });
});
