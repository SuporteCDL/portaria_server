import { FastifyReply, FastifyRequest } from "fastify";
import { DepartmentDeleteSchema } from "./department..schema";
export declare function getDepartments(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function createDepartment(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function updateDepartment(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function deleteDepartment(request: FastifyRequest<{
    Params: DepartmentDeleteSchema;
}>, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=departments.controller.d.ts.map