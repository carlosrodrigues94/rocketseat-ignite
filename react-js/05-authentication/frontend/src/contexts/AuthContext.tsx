import { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
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
  isAuthenticated: boolean;
  user: User;
}

interface IAuthProviderProps {}

const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  Router.push("/");
};

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    email: "",
    permissions: [],
    roles: [],
  });

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
    } catch (err) {
      console.log("Erro do SIGNIN ==>", err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
