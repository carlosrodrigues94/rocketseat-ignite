import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

import decode from "jwt-decode";
import { validateUserPermissions } from "./validateUserPermissions";

type Context = GetServerSidePropsContext;

type Options = {
  permissions?: string[];
  roles?: string[];
};

type TokenPayload = {
  permissions: string[];
  roles?: string[];
};

function withSSRAuth<T>(
  fn: GetServerSideProps<T>,
  options: Options = null
): GetServerSideProps {
  return async (ctx: Context): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["nextauth.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false, // that occurs because a condition
        },
      };
    }

    if (options) {
      const user = decode<TokenPayload>(token);

      const userHasPermissions = validateUserPermissions({
        permissions: options.permissions,
        roles: options.roles,
        user,
      });

      if (!userHasPermissions) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
    }

    try {
      return fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "nextauth.token");
        destroyCookie(ctx, "nextauth.refreshToken");
      }
    }
  };
}
export { withSSRAuth };
