import { FastifyInstance } from "fastify";
import { getUsers, createUser, updateUser, removeUser, signInUser } from "./users.controller";

export async function userRoutes(app: FastifyInstance) {
  app.get('/', getUsers)
  app.post('/signin', signInUser)
  app.post('/', createUser)
  app.put('/', updateUser)
  app.delete('/', removeUser)
}