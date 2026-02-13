import { entryService } from "./entries.service.js";
import { entryCreateSchema, entryDaySchema, entryLocalSchema, entryPeriodSchema, entryUpdateSchema } from "./entries.shcema.js";
export async function getEntries(request, reply) {
    const entries = await entryService.list();
    return reply.send(entries);
}
export async function getEntriesByDay(request, reply) {
    const { dayEntry } = entryDaySchema.parse(request.params);
    const entries = await entryService.listByDay(dayEntry);
    return reply.send(entries);
}
export async function getEntriesByPeriod(request, reply) {
    const { dayEntryBegin, dayEntryEnd } = entryPeriodSchema.parse(request.query);
    const entries = await entryService.listByPeriod(dayEntryBegin, dayEntryEnd);
    return entries;
}
export async function getEntriesAmountDays(request, reply) {
    const { atendimento } = entryLocalSchema.parse(request.query);
    const entries = await entryService.listEntriesAmountDays(atendimento);
    return reply.send(entries);
}
export async function getEntriesByLocal(request, reply) {
    const entries = await entryService.listByLocal();
    return reply.send(entries);
}
export async function getEntriesByUser(request, reply) {
    const entries = await entryService.listByUser();
    return reply.send(entries);
}
export async function createEntry(request, reply) {
    const parsed = entryCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const newEntry = await entryService.create(parsed.data);
    return reply.code(201).send(newEntry);
}
export async function updateEntry(request, reply) {
    const parsed = entryUpdateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const updatedEntry = await entryService.update(parsed.data);
    return reply.code(201).send(updatedEntry);
}
export async function removeEntry(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.status(400).send({
            error: 'Erro de validação',
        });
    }
    await entryService.remove(id);
    return reply.code(201).send('Excluído com sucesso');
}
//# sourceMappingURL=entries.controller.js.map