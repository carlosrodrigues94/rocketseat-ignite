export type User = {
  name: string;
  email: string;
  createdAt: string;
  id: string | number;
};

export type UseQueryData = {
  users: User[];
};
