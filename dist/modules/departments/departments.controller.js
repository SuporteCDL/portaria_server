"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartments = getDepartments;
exports.createDepartment = createDepartment;
exports.updateDepartment = updateDepartment;
exports.deleteDepartment = deleteDepartment;
const department_service_1 = require("./department.service");
const department__schema_1 = require("./department..schema");
async function getDepartments(request, reply) {
    const departments = await department_service_1.departmentService.list();
    return reply.send(departments);
}
async function createDepartment(request, reply) {
    const parsed = department__schema_1.departmentCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const newDepartment = await department_service_1.departmentService.create(parsed.data);
    return reply.code(201).send(newDepartment);
}
async function updateDepartment(request, reply) {
    const parsed = department__schema_1.departmentUpdateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const newDepartment = await department_service_1.departmentService.update(parsed.data);
    return reply.code(201).send(newDepartment);
}
async function deleteDepartment(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.status(400).send({
            error: 'Erro de validação',
        });
    }
    await department_service_1.departmentService.remove(id);
    return reply.code(201).send('Excluído com sucesso');
}
//# sourceMappingURL=departments.controller.js.map