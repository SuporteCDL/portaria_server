import { compare } from 'bcrypt';
import { db } from "../../database/knex.js";
async function list() {
    return await db('usuarios').select('*').orderBy('name');
}
export async function signIn(userBody) {
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
async function create(dados) {
    const [usuario] = await db('usuarios')
        .insert({
        name: dados.name,
        email: dados.email,
        password: dados.password,
        role: dados.role
    })
        .returning('*');
    return usuario;
}
async function update(dados) {
    const [user] = await db('usuarios')
        .where({ id: Number(dados.id) })
        .update({
        name: dados.name,
        email: dados.email,
        role: dados.role
    })
        .returning('*');
    return user;
}
async function remove(id) {
    const [usuario] = await db('usuarios')
        .where({ id: id })
        .delete()
        .returning('*');
    return usuario;
}
export const userService = { list, signIn, create, update, remove };
//# sourceMappingURL=users.service.js.map