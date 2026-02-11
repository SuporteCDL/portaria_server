import { FastifyReply, FastifyRequest } from 'fastify';
interface UpdateUsuarioParam {
    id: number;
}
export declare function getUsers(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function signInUser(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function createUser(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function updateUser(request: FastifyRequest<{
    Params: UpdateUsuarioParam;
}>, reply: FastifyReply): Promise<never>;
export declare function removeUser(request: FastifyRequest<{
    Params: UpdateUsuarioParam;
}>, reply: FastifyReply): Promise<never>;
export {};
//# sourceMappingURL=users.controller.d.ts.map