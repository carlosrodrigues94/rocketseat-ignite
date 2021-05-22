import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

type Context = GetServerSidePropsContext;

function withSSRGuest<T>(fn: GetServerSideProps<T>): GetServerSideProps {
  return async (ctx: Context): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);

    if (cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false, // that occurs because a condition
        },
      };
    }

    return fn(ctx);
  };
}
export { withSSRGuest };
