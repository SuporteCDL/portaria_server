"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryService = void 0;
const knex_1 = require("../../database/knex");
const functions_1 = require("../../utils/functions");
async function list() {
    return await (0, knex_1.db)('atendimentos_recepcao').select('*');
}
// pesquisa no cadastro de entradas
async function listByDay(dayEntry) {
    return await (0, knex_1.db)('atendimentos_recepcao')
        .where('data', dayEntry)
        .select('*')
        .orderBy('hora_entrada', 'asc');
}
// grafico quantidade de atendimentos (barras verticais)
async function listEntriesAmountDays(atendimento) {
    const query = (0, knex_1.db)('atendimentos_recepcao')
        .select(knex_1.db.raw('DATE(data) as data'))
        .count({ total: 'id' })
        .whereRaw("data >= CURRENT_DATE - INTERVAL '60 days'");
    if (atendimento !== undefined && atendimento !== 'Todos' && atendimento !== '') {
        query.andWhere('atendimento', atendimento);
    }
    const rows = await query
        .groupByRaw('DATE(data)')
        .orderByRaw('DATE(data) ASC');
    return rows.map((row) => ({
        data: row.data,
        total: Number(row.total),
    }));
}
// grafico atendimentos por local (donut)
async function listByLocal() {
    const rows = await (0, knex_1.db)('atendimentos_recepcao')
        .select(knex_1.db.raw('atendimento'))
        .count({ qtde: 'id' })
        .whereRaw("data >= CURRENT_DATE - INTERVAL '60 days'")
        .groupByRaw('atendimento')
        .orderByRaw('atendimento ASC');
    return rows.map((row) => ({
        atendimento: row.atendimento,
        qtde: Number(row.qtde),
    }));
}
// relatório de entradas por periodo
async function listByPeriod(dayBegin, dayEnd) {
    return await (0, knex_1.db)('atendimentos_recepcao')
        .whereBetween('data', [dayBegin, dayEnd])
        .select('*')
        .orderBy('hora_entrada', 'asc');
}
async function create(entryData) {
    let permanence = 0;
    if (entryData.hora_saida) {
        permanence = (0, functions_1.calcularPermanencia)(entryData.data.toString(), entryData.hora_entrada.toString(), entryData.hora_saida.toString());
    }
    const [entrie] = await (0, knex_1.db)('atendimentos_recepcao').insert({
        atendimento: entryData.atendimento,
        qtde_pessoas: entryData.qtde_pessoas,
        data: entryData.data,
        hora_entrada: entryData.hora_entrada,
        hora_saida: entryData.hora_saida,
        permanencia: permanence,
        observacao: entryData.observacao,
        nome: entryData.nome,
        servico: entryData.servico,
        usuario: entryData.usuario
    })
        .returning('*');
    return entrie;
}
async function update(entryData) {
    const [entry] = await (0, knex_1.db)('atendimentos_recepcao')
        .where({ id: Number(entryData.id) })
        .update({
        atendimento: entryData.atendimento,
        qtde_pessoas: entryData.qtde_pessoas,
        data: entryData.data,
        hora_entrada: entryData.hora_entrada,
        hora_saida: entryData.hora_saida,
        permanencia: entryData.permanencia,
        observacao: entryData.observacao,
        nome: entryData.nome,
        servico: entryData.servico,
        usuario: entryData.usuario
    })
        .returning('*');
    return entry;
}
async function remove(id) {
    await (0, knex_1.db)('atendimentos_recepcao')
        .where({ id: id })
        .delete();
    return;
}
exports.entryService = {
    list,
    listEntriesAmountDays,
    listByPeriod,
    listByLocal,
    listByDay,
    create,
    update,
    remove
};
//# sourceMappingURL=entries.service.js.map