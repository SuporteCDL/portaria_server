"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = getEntries;
exports.getEntriesByDay = getEntriesByDay;
exports.getEntriesByPeriod = getEntriesByPeriod;
exports.getEntriesAmountDays = getEntriesAmountDays;
exports.getEntriesByLocal = getEntriesByLocal;
exports.createEntry = createEntry;
exports.updateEntry = updateEntry;
exports.removeEntry = removeEntry;
const entries_service_1 = require("./entries.service");
const entries_shcema_1 = require("./entries.shcema");
async function getEntries(request, reply) {
    const entries = await entries_service_1.entryService.list();
    return reply.send(entries);
}
async function getEntriesByDay(request, reply) {
    const { dayEntry } = entries_shcema_1.entryDaySchema.parse(request.params);
    const entries = await entries_service_1.entryService.listByDay(dayEntry);
    return reply.send(entries);
}
async function getEntriesByPeriod(request, reply) {
    const { dayEntryBegin, dayEntryEnd } = entries_shcema_1.entryPeriodSchema.parse(request.query);
    const entries = await entries_service_1.entryService.listByPeriod(dayEntryBegin, dayEntryEnd);
    return entries;
}
async function getEntriesAmountDays(request, reply) {
    const { atendimento } = entries_shcema_1.entryLocalSchema.parse(request.query);
    const entries = await entries_service_1.entryService.listEntriesAmountDays(atendimento);
    return reply.send(entries);
}
async function getEntriesByLocal(request, reply) {
    const entries = await entries_service_1.entryService.listByLocal();
    return reply.send(entries);
}
async function createEntry(request, reply) {
    const parsed = entries_shcema_1.entryCreateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const newEntry = await entries_service_1.entryService.create(parsed.data);
    return reply.code(201).send(newEntry);
}
async function updateEntry(request, reply) {
    const parsed = entries_shcema_1.entryUpdateSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            error: 'Erro de validação',
            details: parsed.error.message
        });
    }
    const updatedEntry = await entries_service_1.entryService.update(parsed.data);
    return reply.code(201).send(updatedEntry);
}
async function removeEntry(request, reply) {
    const { id } = request.params;
    if (!id) {
        return reply.status(400).send({
            error: 'Erro de validação',
        });
    }
    await entries_service_1.entryService.remove(id);
    return reply.code(201).send('Excluído com sucesso');
}
//# sourceMappingURL=entries.controller.js.map