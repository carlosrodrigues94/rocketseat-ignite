import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import faker from "faker";
import { User } from "../../types/user";

import { isAfter } from "date-fns";

export function makeServer() {
  const Server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(index: number) {
          return `User ${index + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(server) {
      server.createList("user", 200); // second param is how many user do you want to create
    },

    routes() {
      this.namespace = "api";
      this.timing = 750; //delay to response in ms

      this.get("/users/:id");
      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user"))
          .users.sort((a: User, b: User) => {
            const userIsAfter = isAfter(
              new Date(a.createdAt),
              new Date(b.createdAt)
            );
            if (userIsAfter) {
              return 1;
            }
            if (!userIsAfter) {
              return -1;
            }
            return 0;
          })
          .slice(pageStart, pageEnd);

        return new Response(200, { "x-total-count": String(total) }, { users });
      });
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });

  return Server;
}
