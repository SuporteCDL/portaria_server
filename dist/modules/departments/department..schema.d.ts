import z from "zod";
export declare const departmentCreateSchema: z.ZodObject<{
    descricao: z.ZodString;
}, z.core.$strip>;
export declare const departmentUpdateSchema: z.ZodObject<{
    descricao: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
export declare const departmentDeleteSchema: z.ZodObject<{
    id: z.ZodNumber;
}, z.core.$strip>;
export type DepartmentCreateSchema = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdateSchema = z.infer<typeof departmentUpdateSchema>;
export type DepartmentDeleteSchema = z.infer<typeof departmentDeleteSchema>;
//# sourceMappingURL=department..schema.d.ts.map