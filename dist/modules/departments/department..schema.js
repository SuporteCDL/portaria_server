"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentDeleteSchema = exports.departmentUpdateSchema = exports.departmentCreateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.departmentCreateSchema = zod_1.default.object({
    descricao: zod_1.default.string().min(1),
});
exports.departmentUpdateSchema = exports.departmentCreateSchema.extend({
    id: zod_1.default.number()
});
exports.departmentDeleteSchema = zod_1.default.object({
    id: zod_1.default.number()
});
//# sourceMappingURL=department..schema.js.map