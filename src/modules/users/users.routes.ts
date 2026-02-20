import { FastifyInstance } from "fastify"
import {
  getUsers,
  createUser,
  updateUser,
  removeUser,
  signInUser,
  updatePasswordUser
} from "./users.controller.js"
import { authenticate } from "../../middlewares/authenticate.js"

interface IdUsuarioParam {
  id: number
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/signin', signInUser)
  app.get('/', {preHandler: authenticate}, getUsers)
  app.post('/', {preHandler: authenticate}, createUser)
  app.patch<{ 
    Params: IdUsuarioParam 
  }>('/:id/password', {preHandler: authenticate}, updatePasswordUser)
  app.put('/', {preHandler: authenticate}, updateUser)
  app.delete<{
  Params: IdUsuarioParam
}>('/:id', {preHandler: authenticate}, removeUser)
}
