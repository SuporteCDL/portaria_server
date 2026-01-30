import { FastifyReply, FastifyRequest } from "fastify";
import { departmentService } from "./department.service";
import { departmentCreateSchema, DepartmentDeleteSchema, departmentUpdateSchema } from "./department..schema";

export async function getDepartments(request: FastifyRequest, reply: FastifyReply) {
  const departments = await departmentService.list()
  return reply.send(departments)
}

export async function createDepartment(request: FastifyRequest, reply: FastifyReply) {
  const parsed = departmentCreateSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.message
    })
  }
  const newDepartment = await departmentService.create(parsed.data)
  return reply.code(201).send(newDepartment)
}

export async function updateDepartment(request: FastifyRequest, reply: FastifyReply) {
  const parsed = departmentUpdateSchema.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.message
    })
  }
  const newDepartment = await departmentService.update(parsed.data)
  return reply.code(201).send(newDepartment)
}

export async function deleteDepartment(request: FastifyRequest<{ Params: DepartmentDeleteSchema}>, reply: FastifyReply) {
  const { id } = request.params
  if (!id) {
    return reply.status(400).send({
      error: 'Erro de validação',
    })
  }
  await departmentService.remove(id)
  return reply.code(201).send('Excluído com sucesso')
}