"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.userUpdateSchema = exports.userCreateSchema = exports.userSignInSchema = void 0;
const zod_1 = require("zod");
exports.userSignInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'E-mail inválido' }),
    password: zod_1.z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
});
exports.userCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: zod_1.z.string().email({ message: 'E-mail inválido' }),
    password: zod_1.z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
    role: zod_1.z.string().min(1, 'É necessário informar minimo de 1 caracter'),
});
exports.userUpdateSchema = exports.userCreateSchema.extend({
    id: zod_1.z.number().int().positive({ message: 'ID inválido' }),
});
exports.userSchema = exports.userCreateSchema.extend({
    id: zod_1.z.number(),
});
//# sourceMappingURL=users.schema.js.map