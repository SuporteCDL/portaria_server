import { compare } from 'bcrypt'
import { db } from "../../database/knex" 
import { ISigIn, IUser } from '../../utils/interface';

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

async function update(dados: IUser) {
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

export const userService = { list, signIn, create, update, remove }