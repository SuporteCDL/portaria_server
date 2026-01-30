import { FastifyReply, FastifyRequest } from "fastify";
import { entryService } from "./entries.service";
import { entryCreateSchema, entryDaySchema, entryUpdateSchema } from "./entries.shcema";

interface UpdateEntriesParams {
  id: number
}

interface DayEntryParams {
  dayEntry: string
}

export async function getEntries(request: FastifyRequest, reply: FastifyReply) {
  const entries = await entryService.list()
  return reply.send(entries)
}

export async function getEntriesByDay(request: FastifyRequest, reply: FastifyReply) {
  const { dayEntry } = entryDaySchema.parse(request.params)
  const entries = await entryService.listByDay(dayEntry)
  return reply.send(entries)
}

export async function getEntriesGroup10Days(request: FastifyRequest, reply: FastifyReply) {
  const entries = await entryService.listGroup10Days()
  return reply.send(entries)
}

export async function getEntriesGroupByDay(request: FastifyRequest, reply: FastifyReply) {
  const entries = await entryService.listGroupByDay()
  return reply.send(entries)
}

export async function createEntry(request: FastifyRequest, reply: FastifyReply) {
  const parsed = entryCreateSchema.safeParse(request.body)
  if(!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.message
    })
  }
  const newEntry = await entryService.create(parsed.data)
  return reply.code(201).send(newEntry)
}

export async function updateEntry(request: FastifyRequest<{ Params: UpdateEntriesParams }>, reply: FastifyReply) {
  const parsed = entryUpdateSchema.safeParse(request.body)
  if(!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.message
    })
  }
  const updatedEntry = await entryService.update(parsed.data)
  return reply.code(201).send(updatedEntry)
}

export async function removeEntry(request: FastifyRequest<{ Params: UpdateEntriesParams }>, reply: FastifyReply) {
  const { id } = request.params
  if (!id) {
    return reply.status(400).send({
      error: 'Erro de validação',
    })
  }
  await entryService.remove(id)
  return reply.code(201).send('Excluído com sucesso')
}
