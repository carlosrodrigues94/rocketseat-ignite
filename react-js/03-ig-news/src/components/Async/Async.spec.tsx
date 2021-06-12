import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Async from "./";

describe("Async", () => {
  it("should renders", async () => {
    render(<Async />);

    // will await the button to be removed of screen
  });
});
