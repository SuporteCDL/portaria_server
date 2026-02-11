"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const env_1 = require("./config/env");
const routes_1 = require("./app/routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const PORT = 5555;
const app = (0, fastify_1.default)({
    logger: true
});
app.register(jwt_1.default, {
    secret: env_1.env.JWT_SECRET,
    sign: {
        expiresIn: "1h"
    }
});
app.register(cors_1.default, {
    origin: ['http://localhost:5173', 'http://192.168.2.106:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // <-- importante
});
app.register(routes_1.RegisterRoutes);
app.listen({ host: '0.0.0.0', port: PORT }).then(() => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map