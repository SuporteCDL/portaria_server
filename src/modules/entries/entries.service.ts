import { db } from "../../database/knex";
import { calcularPermanencia } from "../../utils/functions";

interface IEntry {
  id: number;
  atendimento: string
  qtde_pessoas: number
  data: string
  hora_entrada: string
  hora_saida?: string | undefined
  permanencia?: number | undefined
  observacao?: string | undefined
  nome?: string | undefined
  servico?: string | undefined
  usuario?: string | undefined
}
interface IGroupByDay {
  data: Date;
  total: string | number;
}

async function list() {
  return await db('atendimentos_recepcao').select('*')
}

// pesquisa no cadastro de entradas
async function listByDay(dayEntry: string) {
  return await db('atendimentos_recepcao')
  .where('data', dayEntry)
  .select('*')
  .orderBy('hora_entrada', 'asc')
}

// grafico quantidade de atendimentos (barras verticais)
async function listEntriesAmountDays(atendimento?: string) {
  const query = db('atendimentos_recepcao')
    .select(db.raw('DATE(data) as data'))
    .count({ total: 'id' })
    .whereRaw("data >= CURRENT_DATE - INTERVAL '60 days'")
  if (atendimento !== undefined && atendimento !== 'Todos' && atendimento !== '') {
    query.andWhere('atendimento', atendimento)
  }
  const rows = await query
    .groupByRaw('DATE(data)')
    .orderByRaw('DATE(data) ASC')
  return rows.map((row: any) => ({
    data: row.data,
    total: Number(row.total),
  }))
}

// grafico atendimentos por local (donut)
async function listByLocal() {
  const rows = await db('atendimentos_recepcao')
    .select(db.raw('atendimento'))
    .count({ qtde: 'id' })
    .whereRaw("data >= CURRENT_DATE - INTERVAL '60 days'")
    .groupByRaw('atendimento')
    .orderByRaw('atendimento ASC')

  return rows.map((row: any) => ({
    atendimento: row.atendimento,
    qtde: Number(row.qtde),
  }))
}

// relatório de entradas por periodo
async function listByPeriod(dayBegin: string, dayEnd: string) {
  return await db('atendimentos_recepcao')
  .whereBetween('data', [dayBegin, dayEnd])
  .select('*')
  .orderBy('hora_entrada', 'asc')
}

async function create(entryData: Omit<IEntry, 'id'>) {
  let permanence=0
  if (entryData.hora_saida) {
    permanence = calcularPermanencia(
      entryData.data.toString(),
      entryData.hora_entrada.toString(),
      entryData.hora_saida.toString()
    )
  }
  const [entrie] = await db('atendimentos_recepcao').insert({
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
  .returning('*')
  return entrie
}

async function update(entryData: IEntry) {
  const [entry] = await db('atendimentos_recepcao')
  .where({ id: Number(entryData.id)})
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
  .returning('*')
  return entry
}

async function remove(id: number) {
  await db('atendimentos_recepcao')
  .where({ id: id})
  .delete()
  return 
}

export const entryService = { 
  list, 
  listEntriesAmountDays, 
  listByPeriod, 
  listByLocal, 
  listByDay, 
  create, 
  update, 
  remove 
}
