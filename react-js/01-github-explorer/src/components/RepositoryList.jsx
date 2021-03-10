import React from "react";
import { Counter } from "./Counter";
import { RepositoryItem } from "./RepositoryItem";

const repository = {
  name: "unform2",
  description: "Forms in React",
  link: "http://google.com",
};

export function RepositoryList() {
  return (
    <section className="repostitory-list">
      <h1>Lista de repositorios</h1>

      <ul>
        <RepositoryItem repository={repository} />
        <Counter />
      </ul>
    </section>
  );
}
