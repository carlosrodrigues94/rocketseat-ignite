import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Diego" },
  ];

  return response.json(users);
};
