import { db } from "../../database/knex.js"

interface IDepartment {
  id: number
  descricao: string
}

async function list() {
  return await db('departamentos').select('*').orderBy('descricao')
}

async function create(deptoData: Omit<IDepartment, 'id'>) {
  const [department] = await db('departamentos')
  .insert({
    descricao: deptoData.descricao
  })
  .returning('*')
  return department
}

async function update(deptoData: IDepartment) {
  const [department] = await db('departamentos')
  .where({ id: deptoData.id })
  .update({
    descricao: deptoData.descricao
  })
  .returning('*')
  return department
}

async function remove(id: number) {
  await db('departamentos')
  .where({ id: id})
  .delete()
  return 
}

export const departmentService = { list, create, update, remove }
