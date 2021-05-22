import { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type Credentials = {
  email: string;
  password: string;
};

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SessionResponse = {
  permissions: string[];
  roles: string[];
  token: string;
  refreshToken: string;
};

interface AuthContextData {
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
}

interface IAuthProviderProps {}

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export const signOut = () => {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  if (!process.browser) return console.log("Não é Browser no SignOut");

  authChannel.postMessage("signOut");

  Router.push("/");
};

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    email: "",
    permissions: [],
    roles: [],
  });

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        case "signIn":
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (!token) return;

    api
      .get("/me")
      .then((response) => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles });
      })
      .catch(() => {
        signOut();
      });
  }, []);

  const isAuthenticated = !!user.email;

  async function signIn({ email, password }: Credentials) {
    try {
      const response: AxiosResponse<SessionResponse> = await api.post(
        "/sessions",
        { email, password }
      );

      const { permissions, roles, token, refreshToken } = response.data;

      setUser({ email, permissions, roles });

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 1 month
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 1 month
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");

      authChannel.postMessage("signIn");
    } catch (err) {
      console.log("Erro do SIGNIN ==>", err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
