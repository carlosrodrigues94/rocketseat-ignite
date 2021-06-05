import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";

jest.mock("next-auth/client");

describe("SignInButton", () => {
  it("should be able renders correctly when user is not auth", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("should be able renders correctly when user is auth", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "Jhon Doe", email: "john@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("Jhon Doe")).toBeInTheDocument();
  });
});
