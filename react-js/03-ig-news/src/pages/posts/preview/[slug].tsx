import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import React, { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import { ISession } from "../../../types/session";
import styles from "../post.module.scss";
interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const [session] = useSession();
  const router = useRouter();
  const sessionTyped = (session as any) as ISession;

  useEffect(() => {
    if (sessionTyped?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default PostPreview;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "recoil---biblioteca-de-gerenciamento-de-estados-no-react",
        },
      },
    ],
    fallback: "blocking",
  };
};

type GetServerSide = { slug: string };

export const getStaticProps: GetStaticProps<unknown, GetServerSide> = async ({
  params,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", slug, {});

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
