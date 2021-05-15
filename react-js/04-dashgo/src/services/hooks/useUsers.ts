import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { User } from "../../types/user";
import { api } from "../api";

type GetUsersResponse = { users: User[]; totalCount: number };

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers }: AxiosResponse<{ users: User[] }> = await api.get(
    "/users",
    {
      params: {
        page,
      },
    }
  );

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}

export function useUsers(
  page: number,
  options: UseQueryOptions<GetUsersResponse>
) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5,
    ...options,
  });
}
