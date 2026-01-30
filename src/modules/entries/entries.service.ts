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
}
interface IGroupByDay {
  data: Date;
  total: string | number;
}

async function list() {
  return await db('atendimentos_recepcao').select('*')
}

// listar atendimentos por data
async function listByDay(dayEntry: string) {
  return await db('atendimentos_recepcao')
  .where('data', dayEntry)
  .select('*')
  .orderBy('hora_entrada', 'asc')
}

// listar atendimentos dos últimos 10 dias
async function listGroup10Days() {
  const rows = await db('atendimentos_recepcao')
  .select('data', 'atendimento')
  .sum({ total: 'qtde_pessoas' })
  .where('data', '>=', db.raw(`CURRENT_DATE - INTERVAL '10 days'`))
  .groupBy('data', 'atendimento')
  .orderBy('data')
  return rows
}

// quantidade de atendimentos por dia
async function listGroupByDay() {
  const rows = await db('atendimentos_recepcao')
  .select('data')
  .count({ total: 'id'})
  .groupBy('data')
  .orderBy('data')
  return rows
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
    servico: entryData.servico
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

export const entryService = { list, listGroup10Days, listGroupByDay, listByDay, create, update, remove }