import { z } from 'zod'

export const userSignInSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
})

export const userCreateSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
  role: z.string().min(1, 'É necessário informar minimo de 1 caracter'),
})

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Informe a senha atual"),
  newPassword: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres")
})

export const userUpdateSchema = z.object({
  id: z.number().int().positive({ message: 'ID inválido' }),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email({ message: 'E-mail inválido' }),
  role: z.string().min(1, 'É necessário informar minimo de 1 caracter'),
})

export const userSchema = userCreateSchema.extend({
  id: z.number(),
})

export type UserSignInSchema = z.infer<typeof userSignInSchema>
export type UserCreateSchema = z.infer<typeof userCreateSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
export type UserSchema = z.infer<typeof userSchema>
