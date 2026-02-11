"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
exports.signIn = signIn;
const bcrypt_1 = require("bcrypt");
const knex_1 = require("../../database/knex");
async function list() {
    return await (0, knex_1.db)('usuarios').select('*').orderBy('name');
}
async function signIn(userBody) {
    const userDB = await (0, knex_1.db)('usuarios')
        .select('*')
        .where({ email: userBody.email })
        .first();
    if (!userDB) {
        return null;
    }
    const correctPassword = await (0, bcrypt_1.compare)(userBody.password, userDB.password);
    if (!correctPassword) {
        return null;
    }
    const { password, ...dadosSemSenha } = userDB;
    return { user: dadosSemSenha };
}
async function create(dados) {
    const [usuario] = await (0, knex_1.db)('usuarios')
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
    const [user] = await (0, knex_1.db)('usuarios')
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
    const [usuario] = await (0, knex_1.db)('usuarios')
        .where({ id: id })
        .delete()
        .returning('*');
    return usuario;
}
exports.userService = { list, signIn, create, update, remove };
//# sourceMappingURL=users.service.js.map