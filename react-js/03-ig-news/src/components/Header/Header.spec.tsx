import { render, screen } from "@testing-library/react";

import { Header } from "./";

jest.mock("next/router", () => {
  return { useRouter: () => ({ asPath: "/" }) };
});

jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

describe("Header", () => {
  it("should be able to renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
