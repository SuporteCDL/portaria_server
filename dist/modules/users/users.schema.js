import { z } from 'zod';
export const userSignInSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
});
export const userCreateSchema = z.object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
    role: z.string().min(1, 'É necessário informar minimo de 1 caracter'),
});
export const userUpdateSchema = userCreateSchema.extend({
    id: z.number().int().positive({ message: 'ID inválido' }),
});
export const userSchema = userCreateSchema.extend({
    id: z.number(),
});
//# sourceMappingURL=users.schema.js.map