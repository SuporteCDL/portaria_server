import { FastifyInstance } from "fastify"
import {
  getUsers,
  createUser,
  updateUser,
  removeUser,
  signInUser
} from "./users.controller"
import { authenticate } from "../../middlewares/authenticate"

interface UpdateUsuarioParam {
  id: number
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/signin', signInUser)

  app.get('/', {preHandler: authenticate}, getUsers)
  app.post('/', {preHandler: authenticate}, createUser)
  app.put<{
  Params: UpdateUsuarioParam
}>('/:id', {preHandler: authenticate}, updateUser)
  app.delete<{
  Params: UpdateUsuarioParam
}>('/:id', {preHandler: authenticate}, removeUser)
}
