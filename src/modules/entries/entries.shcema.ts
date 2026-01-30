import { z } from "zod";

export const entryDaySchema = z.object({
  dayEntry: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
})

export const entryCreateSchema = z.object({
  atendimento: z.string().min(1),
  qtde_pessoas: z.number().int().positive(),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  hora_entrada: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Hora entrada inválida'),
  hora_saida: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Hora saída inválida").optional(),
  permanencia: z.number().optional(),
  observacao: z.string().optional(),
  nome: z.string().optional(),
  servico: z.string().optional()
})

export const entryUpdateSchema = entryCreateSchema.extend({
  id: z.number(),
})

export type EntryCreateSchema = z.infer<typeof entryCreateSchema>
export type EntryDaySchema = z.infer<typeof entryDaySchema>
export type EntryUpdateSchema = z.infer<typeof entryUpdateSchema>
