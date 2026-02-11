import { FastifyInstance } from "fastify";
import { entryRoutes } from "../modules/entries/entries.routes.js";
import { userRoutes } from "../modules/users/users.routes.js";
import { departmentRoutes } from "../modules/departments/department.routes.js";

export async function RegisterRoutes(app: FastifyInstance) {
  app.register(entryRoutes, {prefix: '/entries'})
  app.register(userRoutes, {prefix: '/users'})
  app.register(departmentRoutes, {prefix: '/departments'})
}
