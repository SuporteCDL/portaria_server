import { compare } from 'bcrypt'
import { hash } from 'bcrypt'
import { randomInt } from 'crypto'
import { db } from "../../database/knex.js" 
import { ISigIn, IUser } from '../../utils/interface.js';

async function list() {
  return await db('usuarios').select('*').orderBy('name')
}

export async function signIn(userBody: ISigIn) {
  const userDB = await db('usuarios')
    .select('*')
    .where({ email: userBody.email })
    .first();

    if (!userDB) {
    return null;
  }

  const correctPassword = await compare(userBody.password, userDB.password);
  if (!correctPassword) {
    return null;
  }
  const { password, ...dadosSemSenha } = userDB;

  return { user: dadosSemSenha };
}

async function create(dados: Omit<IUser, 'id'>) {
  const [usuario] = await db('usuarios')
    .insert({
      name: dados.name,
      email: dados.email,
      password: dados.password,
      role: dados.role
    })
    .returning('*')
  return usuario
}

async function updatePassword(
  id: number,
  currentPassword: string,
  newPassword: string
) {
  const userDB = await db('usuarios')
    .where({ id })
    .first()

  if (!userDB) return null

  const correctPassword = await compare(currentPassword, userDB.password)
  if (!correctPassword) return null

  const newHash = await hash(newPassword, 10)

  await db('usuarios')
    .where({ id })
    .update({ password: newHash })

  return true
}

async function update(dados: Omit<IUser, 'password'>) {
  const [user] = await db('usuarios')
    .where({ id: Number(dados.id) })
    .update({
      name: dados.name,
      email: dados.email,
      role: dados.role
    })
    .returning('*')

  return user
}

async function remove(id: Number) {
  const [usuario] = await db('usuarios')
    .where({ id: id })
    .delete()
    .returning('*')

  return usuario
}

export const userService = { list, signIn, create, updatePassword, update, remove }