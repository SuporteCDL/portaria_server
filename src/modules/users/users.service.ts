import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken';
import { db } from "../../database/knex" 

interface ISigIn {
  email: string
  password: string
}

interface IUser {
  id: number
  name: string
  email: string
  password: string
}

async function list() {
  return await db('usuarios').select('*').orderBy('name')
}

export async function signIn(userBody: ISigIn) {
  const userDB = await db('usuarios')
    .select('*')
    .where({ email: userBody.email })
    .first();

  if (!userDB) {
    return null; // Usuário não encontrado
  }
  const correctPassword = await compare(userBody.password, userDB.password);
  if (!correctPassword) {
    return null; // Senha incorreta
  }
  const { password, ...dadosSemSenha } = userDB;

  const token = jwt.sign(
    { id: userDB.id, email: userDB.email },
    process.env.JWT_SECRET || 'segredo_dev',
    { expiresIn: '1h' }
  );

  return { user: dadosSemSenha, token };
  // return dadosSemSenha;
}

async function create(dados: Omit<IUser, 'id'>) {
  const [usuario] = await db('usuarios')
    .insert({
      name: dados.name,
      email: dados.email,
      password: dados.password,
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