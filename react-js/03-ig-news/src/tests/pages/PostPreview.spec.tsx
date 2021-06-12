import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

jest.mock("next/router");
jest.mock("next-auth/client");
jest.mock("../../services/prismic");
jest.mock("prismic-dom", () => {
  return {
    RichText: {
      asHtml: jest.fn(() => "html-data"),
      asText: jest.fn(() => "text-data"),
    },
  } as any;
});

const post = {
  slug: "my-post",
  title: "post-title-2",
  excerpt: "post execerpt",
  updatedAt: "2020-05-05 00:00:00",
  content: "",
};

describe("Posts Preview", () => {
  it("should renders correctly", () => {
    const useSessionsMocked = mocked(useSession);
    useSessionsMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText("post-title-2")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const getSessionsMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    getSessionsMocked.mockReturnValueOnce([
      { activeSubscription: "fake-subscription" },
      false,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-post");
  });

  it("loads initial data", async () => {
    const prismic = mocked(getPrismicClient);

    const postMock = {
      uid: "my-new-post",
      data: {
        title: [{ type: "heading", text: "my-post" }],
        content: [{ type: "paragraph", text: "my-content-post" }],
      },
      last_publication_date: "04-01-2021",
    };

    prismic.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [postMock],
      }),
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: "my-new-post",
        data: {
          title: postMock.data.title,
          content: [{ type: "heading", text: "my-content-post" }],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getStaticProps({ params: { slug: "my-post" } });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            content: "html-data",
            slug: "my-new-post",
            title: "text-data",
            updatedAt: "01 de abril de 2021",
          },
        },
        revalidate: 1800,
      })
    );
  });
});
