import { FastifyReply, FastifyRequest } from "fastify";
import { EntryLocalSchema, EntryPeriodSchema } from "./entries.shcema.js";
interface UpdateEntriesParams {
    id: number;
}
interface DayEntryParams {
    dayEntry: string;
}
export declare function getEntries(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function getEntriesByDay(request: FastifyRequest<{
    Params: DayEntryParams;
}>, reply: FastifyReply): Promise<never>;
export declare function getEntriesByPeriod(request: FastifyRequest<{
    Querystring: EntryPeriodSchema;
}>, reply: FastifyReply): Promise<any[]>;
export declare function getEntriesAmountDays(request: FastifyRequest<{
    Querystring: EntryLocalSchema;
}>, reply: FastifyReply): Promise<never>;
export declare function getEntriesByLocal(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function createEntry(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function updateEntry(request: FastifyRequest<{
    Params: UpdateEntriesParams;
}>, reply: FastifyReply): Promise<never>;
export declare function removeEntry(request: FastifyRequest<{
    Params: UpdateEntriesParams;
}>, reply: FastifyReply): Promise<never>;
export {};
//# sourceMappingURL=entries.controller.d.ts.map