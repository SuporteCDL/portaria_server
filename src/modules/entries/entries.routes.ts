import { FastifyPluginAsync } from "fastify";
import { 
  createEntry, 
  getEntries, 
  getEntriesByDay,
  getEntriesByPeriod, 
  getEntriesAmountDays, 
  getEntriesByLocal, 
  removeEntry, 
  updateEntry, 
  getEntriesByUser
} from "./entries.controller.js";

export const entryRoutes: FastifyPluginAsync = async(app) => {
  app.get('/', getEntries)                                  
  app.get('/:dayEntry', getEntriesByDay)                    //pesquisa no cadastro de entradas
  app.get('/entriesamountdays', getEntriesAmountDays)       //grafico quantidade de atendimentos (barras verticais)
  app.get('/entriesbylocal', getEntriesByLocal)             //grafico e lista atendimentos por local (donut)
  app.get('/entriesbyuser', getEntriesByUser)               //grafico atendimentos por usuário (barras horizontais)
  app.get('/entriesbyperiod', getEntriesByPeriod)           //relatório de entradas por periodo
  app.post('/', createEntry)
  app.put('/', updateEntry)
  app.delete('/:id', removeEntry)
}