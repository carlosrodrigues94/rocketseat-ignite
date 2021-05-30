import { render } from "@testing-library/react";
import { ActiveLink } from "./";

jest.mock("next/router", () => {
  return { useRouter: () => ({ asPath: "/" }) };
});

describe("ActiveLink", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds a correctly class to link", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
