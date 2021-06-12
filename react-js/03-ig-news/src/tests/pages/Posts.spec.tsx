import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";
jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "my-post",
    title: "post-title",
    excerpt: "post execerpt",
    updatedAt: "2020-05-05 00:00:00",
  },
];

describe("Posts Page", () => {
  it("should renders correctly", () => {
    const { unmount } = render(<Posts posts={posts} />);

    expect(screen.getByText("post-title")).toBeInTheDocument();

    unmount();
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
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              excerpt: postMock.data.content[0].text,
              slug: postMock.uid,
              title: postMock.data.title[0].text,
              updatedAt: "01 de abril de 2021",
            },
          ],
        },
      })
    );
  });
});
