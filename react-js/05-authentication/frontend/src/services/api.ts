import axios, { AxiosError, AxiosResponse } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";

let cookies = parseCookies();

let isRefreshing = false;

let failedRequestsQueue = [];

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();

        const refreshToken = cookies["nextauth.refreshToken"];
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post("/refresh", { refreshToken })
            .then((response) => {
              const { token, refreshToken: newRefreshToken } = response.data;

              setCookie(undefined, "nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 1 month
                path: "/",
              });

              setCookie(undefined, "nextauth.refreshToken", newRefreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 1 month
                path: "/",
              });

              api.defaults.headers["Authorization"] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(token)
              );
              failedRequestsQueue = [];
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (newToken: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${newToken}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
          //renovar
        }
      } else {
        signOut();
      }
    }
    return Promise.reject(error);
  }
);

export { api };
