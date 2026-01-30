import { FastifyInstance } from "fastify";
import { entryRoutes } from "../modules/entries/entries.routes";
import { userRoutes } from "../modules/users/users.routes";
import { departmentRoutes } from "../modules/departments/department..routes";

export async function RegisterRoutes(app: FastifyInstance) {
  app.register(entryRoutes, {prefix: '/entries'})
  app.register(userRoutes, {prefix: '/users'})
  app.register(departmentRoutes, {prefix: '/departments'})
}
