"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.signInUser = signInUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
const users_service_1 = require("./users.service");
const users_schema_1 = require("./users.schema");
const bcrypt_1 = require("bcrypt");
const crypto_1 = require("crypto");
async function getUsers(request, reply) {
    const users = await users_service_1.userService.list();
    return reply.send(users);
}
async function signInUser(request, reply) {
    const { email, password } = request.body;
    const result = await (0, users_service_1.signIn)({ email, password });
    if (!result) {
        return reply.status(401).send({
            message: "Email ou senha inválidos"
        });
    }
    const { user } = result;
    const token = await reply.jwtSign({
        sub: String(user.id),
        role: user.role
    });
    return reply.send({
        token,
        user
    });
}
async function createUser(request, reply) {
    const parsed = users_schema_1.userCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.format(),
        });
    }
    const randomSalt = (0, crypto_1.randomInt)(10, 16);
    const passwordHash = await (0, bcrypt_1.hash)(String(parsed.data.password), randomSalt);
    const userData = {
        name: parsed.data.name,
        email: parsed.data.email,
        password: passwordHash,
        role: String(parsed.data.role)
    };
    const newUser = await users_service_1.userService.create(userData);
    return reply.code(201).send(newUser);
}
async function updateUser(request, reply) {
    const { id } = request.params;
    const parsed = users_schema_1.userCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.format(),
        });
    }
    const userUpdated = await users_service_1.userService.update({
        id: id,
        ...parsed.data
    });
    return reply.code(201).send(userUpdated);
}
async function removeUser(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.status(400).send({
            error: 'Erro de validação',
        });
    }
    await users_service_1.userService.remove(id);
    return reply.code(201).send('Excluído com sucesso');
}
//# sourceMappingURL=users.controller.js.map