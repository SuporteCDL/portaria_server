"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryLocalSchema = exports.entryUpdateSchema = exports.entryCreateSchema = exports.entryPeriodSchema = exports.entryDaySchema = void 0;
const zod_1 = require("zod");
exports.entryDaySchema = zod_1.z.object({
    dayEntry: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});
const isValidDate = (value) => !isNaN(Date.parse(value));
exports.entryPeriodSchema = zod_1.z
    .object({
    dayEntryBegin: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
        .refine(isValidDate, 'Data inválida'),
    dayEntryEnd: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
        .refine(isValidDate, 'Data inválida'),
})
    .refine(({ dayEntryBegin, dayEntryEnd }) => new Date(dayEntryBegin) <= new Date(dayEntryEnd), {
    message: 'Data inicial não pode ser maior que a final',
});
exports.entryCreateSchema = zod_1.z.object({
    atendimento: zod_1.z.string().min(1),
    qtde_pessoas: zod_1.z.number().int().positive(),
    data: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
    hora_entrada: zod_1.z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Hora entrada inválida'),
    hora_saida: zod_1.z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Hora saída inválida").optional(),
    permanencia: zod_1.z.number().optional(),
    observacao: zod_1.z.string().optional(),
    nome: zod_1.z.string().optional(),
    servico: zod_1.z.string().optional(),
    usuario: zod_1.z.string().optional()
});
exports.entryUpdateSchema = exports.entryCreateSchema.extend({
    id: zod_1.z.number(),
});
exports.entryLocalSchema = zod_1.z.object({
    atendimento: zod_1.z.string().optional()
});
//# sourceMappingURL=entries.shcema.js.map