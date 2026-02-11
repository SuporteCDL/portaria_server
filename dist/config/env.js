"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável de ambiente ${name} não definida`);
    }
    return value;
}
exports.env = {
    DB_CLIENT: process.env.DB_CLIENT ?? "pg",
    DB_HOST: required("DB_HOST"),
    DB_PORT: Number(required("DB_PORT")),
    DB_USER: required("DB_USER"),
    DB_PASS: required("DB_PASS"),
    DB_NAME: required("DB_NAME"),
    JWT_SECRET: required("JWT_SECRET")
};
//# sourceMappingURL=env.js.map