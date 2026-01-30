import { FastifyReply, FastifyRequest } from 'fastify'
import { signIn, userService } from './users.service' 
import { userCreateSchema, userSignInSchema } from './users.schema'
import { hash } from 'bcrypt'
import { randomInt } from 'crypto'

interface UpdateUsuarioParam {
  id: number
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await userService.list()
  return reply.send(users)
}

export async function signInUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await signIn(userSignInSchema.parse(request.body))
    
    if (!user) {
      return reply.status(401).send({ message: 'Email ou senha incorretos' });
    }

    return reply.send({ message: 'Login realizado com sucesso', user });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno no servidor' });
  }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const parsed = userCreateSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const randomSalt = randomInt(10, 16)
  const passwordHash = await hash(String(parsed.data.password), randomSalt)
  const userData = {
    name: parsed.data.name,
    email: parsed.data.email,
    password: passwordHash
  }
  const newUser = await userService.create(userData)
  return reply.code(201).send(newUser)
}

export async function updateUser(request: FastifyRequest<{ Params: UpdateUsuarioParam }>, reply: FastifyReply) {
  const { id } = request.params
  const parsed = userCreateSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const userUpdated = await userService.update({
    id: Number(id),
    ...parsed.data
  })
  return reply.code(201).send(userUpdated)
}

export async function removeUser(request: FastifyRequest<{ Params: UpdateUsuarioParam }>, reply: FastifyReply) {
  const { id } = request.params
  if (!id) {
    return reply.status(400).send({
      error: 'Erro de validação',
    })
  }
  await userService.remove(id)
  return reply.code(201).send('Excluído com sucesso')
}