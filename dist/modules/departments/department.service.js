import { db } from "../../database/knex.js";
async function list() {
    return await db('departamentos').select('*').orderBy('descricao');
}
async function create(deptoData) {
    const [department] = await db('departamentos')
        .insert({
        descricao: deptoData.descricao
    })
        .returning('*');
    return department;
}
async function update(deptoData) {
    const [department] = await db('departamentos')
        .where({ id: deptoData.id })
        .update({
        descricao: deptoData.descricao
    })
        .returning('*');
    return department;
}
async function remove(id) {
    await db('departamentos')
        .where({ id: id })
        .delete();
    return;
}
export const departmentService = { list, create, update, remove };
//# sourceMappingURL=department.service.js.map