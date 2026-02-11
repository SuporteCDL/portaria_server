import { departmentService } from "./department.service.js";
import { departmentCreateSchema, departmentUpdateSchema } from "./department.schema.js";
export async function getDepartments(request, reply) {
    const departments = await departmentService.list();
    return reply.send(departments);
}
export async function createDepartment(request, reply) {
    const parsed = departmentCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const newDepartment = await departmentService.create(parsed.data);
    return reply.code(201).send(newDepartment);
}
export async function updateDepartment(request, reply) {
    const parsed = departmentUpdateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const newDepartment = await departmentService.update(parsed.data);
    return reply.code(201).send(newDepartment);
}
export async function deleteDepartment(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.status(400).send({
            error: 'Erro de validação',
        });
    }
    await departmentService.remove(id);
    return reply.code(201).send('Excluído com sucesso');
}
//# sourceMappingURL=departments.controller.js.map