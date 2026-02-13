import Fastify from 'fastify';
import jwt from "@fastify/jwt";
import { env } from './config/env.js';
import { RegisterRoutes } from './app/routes.js';
import cors from '@fastify/cors';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from "url";
const PORT = 5050;
const app = Fastify({
    logger: true
});
// 🔹 Necessário para usar __dirname no ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 🔹 JWT
app.register(jwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "1h"
    }
});
// 🔹 CORS (em produção pode remover)
app.register(cors, {
    origin: true
});
// 🔹 Rotas da API
app.register(RegisterRoutes, { prefix: "/api" });
// 🔥 Servir frontend (build do Vite)
app.register(fastifyStatic, {
    root: path.join(__dirname, "../../web/dist"), // ajuste se necessário
});
// 🔥 Fallback para SPA (React Router funcionar)
app.setNotFoundHandler((request, reply) => {
    if (!request.url.startsWith("/api")) {
        return reply.sendFile("index.html");
    }
    reply.status(404).send({ error: "Not Found" });
});
app.post("/api/refresh", async (request, reply) => {
    try {
        const { refreshToken } = request.body;
        if (!refreshToken) {
            return reply.status(401).send({ error: "Refresh token não enviado" });
        }
        // 🔐 Verifica refresh token
        const payload = app.jwt.verify(refreshToken);
        // 🔥 Gera novo access token
        const newAccessToken = app.jwt.sign({
            sub: payload.sub,
            role: payload.role
        }, { expiresIn: "1h" });
        return reply.send({ accessToken: newAccessToken });
    }
    catch (err) {
        return reply.status(401).send({ error: "Refresh token inválido" });
    }
});
app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
    console.log(`🚀 Sistema rodando na porta ${PORT}`);
});
//# sourceMappingURL=server.js.map