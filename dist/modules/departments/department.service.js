"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentService = void 0;
const knex_1 = require("../../database/knex");
async function list() {
    return await (0, knex_1.db)('departamentos').select('*').orderBy('descricao');
}
async function create(deptoData) {
    const [department] = await (0, knex_1.db)('departamentos')
        .insert({
        descricao: deptoData.descricao
    })
        .returning('*');
    return department;
}
async function update(deptoData) {
    const [department] = await (0, knex_1.db)('departamentos')
        .where({ id: deptoData.id })
        .update({
        descricao: deptoData.descricao
    })
        .returning('*');
    return department;
}
async function remove(id) {
    await (0, knex_1.db)('departamentos')
        .where({ id: id })
        .delete();
    return;
}
exports.departmentService = { list, create, update, remove };
//# sourceMappingURL=department.service.js.map