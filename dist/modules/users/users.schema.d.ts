import { z } from 'zod';
export declare const userSignInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const userCreateSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const userUpdateSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
export declare const userSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
export type UserSignInSchema = z.infer<typeof userSignInSchema>;
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserSchema = z.infer<typeof userSchema>;
//# sourceMappingURL=users.schema.d.ts.map