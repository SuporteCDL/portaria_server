import { signIn, userService } from './users.service.js';
import { userCreateSchema } from './users.schema.js';
import { hash } from 'bcrypt';
import { randomInt } from 'crypto';
export async function getUsers(request, reply) {
    const users = await userService.list();
    return reply.send(users);
}
export async function signInUser(request, reply) {
    const { email, password } = request.body;
    const result = await signIn({ email, password });
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
export async function createUser(request, reply) {
    const parsed = userCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.format(),
        });
    }
    const randomSalt = randomInt(10, 16);
    const passwordHash = await hash(String(parsed.data.password), randomSalt);
    const userData = {
        name: parsed.data.name,
        email: parsed.data.email,
        password: passwordHash,
        role: String(parsed.data.role)
    };
    const newUser = await userService.create(userData);
    return reply.code(201).send(newUser);
}
export async function updateUser(request, reply) {
    const { id } = request.params;
    const parsed = userCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.format(),
        });
    }
    const userUpdated = await userService.update({
        id: id,
        ...parsed.data
    });
    return reply.code(201).send(userUpdated);
}
export async function removeUser(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.status(400).send({
            error: 'Erro de validação',
        });
    }
    await userService.remove(id);
    return reply.code(201).send('Excluído com sucesso');
}
//# sourceMappingURL=users.controller.js.map