import { z } from "zod";
export declare const entryDaySchema: z.ZodObject<{
    dayEntry: z.ZodString;
}, z.core.$strip>;
export declare const entryPeriodSchema: z.ZodObject<{
    dayEntryBegin: z.ZodString;
    dayEntryEnd: z.ZodString;
}, z.core.$strip>;
export declare const entryCreateSchema: z.ZodObject<{
    atendimento: z.ZodString;
    qtde_pessoas: z.ZodNumber;
    data: z.ZodString;
    hora_entrada: z.ZodString;
    hora_saida: z.ZodOptional<z.ZodString>;
    permanencia: z.ZodOptional<z.ZodNumber>;
    observacao: z.ZodOptional<z.ZodString>;
    nome: z.ZodOptional<z.ZodString>;
    servico: z.ZodOptional<z.ZodString>;
    usuario: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const entryUpdateSchema: z.ZodObject<{
    atendimento: z.ZodString;
    qtde_pessoas: z.ZodNumber;
    data: z.ZodString;
    hora_entrada: z.ZodString;
    hora_saida: z.ZodOptional<z.ZodString>;
    permanencia: z.ZodOptional<z.ZodNumber>;
    observacao: z.ZodOptional<z.ZodString>;
    nome: z.ZodOptional<z.ZodString>;
    servico: z.ZodOptional<z.ZodString>;
    usuario: z.ZodOptional<z.ZodString>;
    id: z.ZodNumber;
}, z.core.$strip>;
export declare const entryLocalSchema: z.ZodObject<{
    atendimento: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EntryCreateSchema = z.infer<typeof entryCreateSchema>;
export type EntryDaySchema = z.infer<typeof entryDaySchema>;
export type EntryPeriodSchema = z.infer<typeof entryPeriodSchema>;
export type EntryUpdateSchema = z.infer<typeof entryUpdateSchema>;
export type EntryLocalSchema = z.infer<typeof entryLocalSchema>;
//# sourceMappingURL=entries.shcema.d.ts.map