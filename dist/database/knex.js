"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = __importDefault(require("knex"));
const env_1 = require("../config/env");
// Exemplo para PostgreSQL
exports.db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: env_1.env.DB_HOST,
        port: Number(env_1.env.DB_PORT),
        user: env_1.env.DB_USER,
        password: env_1.env.DB_PASS,
        database: env_1.env.DB_NAME,
    },
    useNullAsDefault: true,
});
//# sourceMappingURL=knex.js.map