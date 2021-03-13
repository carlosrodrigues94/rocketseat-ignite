const express = require("express");

const app = express();

app.use(express.json());

app.get("/courses", (request, response) => {
  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
  console.log("body => ", request.body);
  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log("id => ", id);
  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.patch("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log("id => ", id);

  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.delete("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log("id => ", id);

  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.listen(3333, () => {
  console.log("App is listening on port 3333");
});
