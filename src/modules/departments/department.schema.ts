import z from "zod";

export const departmentCreateSchema = z.object({
  descricao: z.string().min(1),
})

export const departmentUpdateSchema = departmentCreateSchema.extend({
  id: z.number()
})

export const departmentDeleteSchema = z.object({
  id: z.number()
})

export type DepartmentCreateSchema = z.infer<typeof departmentCreateSchema>
export type DepartmentUpdateSchema = z.infer<typeof departmentUpdateSchema>
export type DepartmentDeleteSchema = z.infer<typeof departmentDeleteSchema>