import { z } from "zod";

export const entryDaySchema = z.object({
  dayEntry: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
})

const isValidDate = (value: string) =>
  !isNaN(Date.parse(value))

export const entryPeriodSchema = z
.object({
  dayEntryBegin: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
    .refine(isValidDate, 'Data inválida'),
  dayEntryEnd: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
    .refine(isValidDate, 'Data inválida'),
})
.refine(
  ({ dayEntryBegin, dayEntryEnd }) =>
    new Date(dayEntryBegin) <= new Date(dayEntryEnd),
  {
    message: 'Data inicial não pode ser maior que a final',
  }
)

export const entryCreateSchema = z.object({
  atendimento: z.string().min(1),
  qtde_pessoas: z.number().int().positive(),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  hora_entrada: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Hora entrada inválida'),
  hora_saida: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Hora saída inválida").optional(),
  permanencia: z.number().optional(),
  observacao: z.string().optional(),
  nome: z.string().optional(),
  servico: z.string().optional(),
  usuario: z.string().optional()
})

export const entryUpdateSchema = entryCreateSchema.extend({
  id: z.number(),
})

export const entryLocalSchema = z.object({
  atendimento: z.string().optional()
})

export type EntryCreateSchema = z.infer<typeof entryCreateSchema>
export type EntryDaySchema = z.infer<typeof entryDaySchema>
export type EntryPeriodSchema = z.infer<typeof entryPeriodSchema>
export type EntryUpdateSchema = z.infer<typeof entryUpdateSchema>
export type EntryLocalSchema = z.infer<typeof entryLocalSchema>
