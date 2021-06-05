import { fireEvent, render, screen } from "@testing-library/react";
import SubscribeButton from "./";
import { signIn, useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import { NextRouter, useRouter } from "next/router";
import { Session } from "next-auth";

jest.mock("next-auth/client");

jest.mock("next/router");

describe("SubscribeButton", () => {
  it("should be able to renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton priceId="price-id" />);

    expect(screen.getByText("Subscribe Now"));
  });

  it("should be able redirects user to sign when not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    const mockedSignIn = mocked(signIn);

    render(<SubscribeButton priceId="price-id" />);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton);

    expect(mockedSignIn).toHaveBeenCalled();
  });

  it("should be able redirects to post when user has active subscription", () => {
    const mockedUseRouter = mocked(useRouter);

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },

        activeSubscription: "fake",
        expires: "fake-expires",
      } as any as Session,
      false,
    ]);

    const mockedPush = jest.fn();

    mockedUseRouter.mockReturnValueOnce({
      push: mockedPush,
    } as unknown as NextRouter);

    const { getByText } = render(<SubscribeButton priceId="price-id" />);

    const subscribeButton = getByText("Subscribe Now");

    fireEvent.click(subscribeButton);

    expect(mockedPush).toHaveBeenCalled();
  });
});
