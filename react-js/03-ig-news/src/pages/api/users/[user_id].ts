import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log("[user_id] request.query", request.query);

  const users = [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Diego" },
  ];

  return response.json(users);
};
