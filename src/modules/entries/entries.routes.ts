import { FastifyPluginAsync } from "fastify";
import { 
  createEntry, 
  getEntries, 
  getEntriesByDay, 
  getEntriesGroup10Days, 
  getEntriesGroupByDay, 
  removeEntry, 
  updateEntry 
} from "./entries.controller";

export const entryRoutes: FastifyPluginAsync = async(app) => {
  app.get('/', getEntries)
  app.post('/', createEntry)
  app.put('/', updateEntry)
  app.delete('/:id', removeEntry)
  app.get('/entries10Days', getEntriesGroup10Days)
  app.get('/entriesgroupbyday', getEntriesGroupByDay)
  app.get('/:dayEntry', getEntriesByDay)
}