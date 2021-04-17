import Prismic from "@prismicio/client";

export function getPrismicClient<T>(req?: T) {
  const prismic = Prismic.client(process.env.PRISMIC_ENDPOINT, {
    req,
    accessToken: process.env.PRIMIC_ACCESS_TOKEN,
  });

  return prismic;
}
