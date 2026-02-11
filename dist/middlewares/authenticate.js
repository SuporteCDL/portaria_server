export async function authenticate(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch {
        return reply.status(401).send({
            message: "Token inválido ou ausente"
        });
    }
}
//# sourceMappingURL=authenticate.js.map