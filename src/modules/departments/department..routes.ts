import { FastifyPluginAsync } from "fastify";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "./departments.controller";

export const departmentRoutes: FastifyPluginAsync = async(app) => {
  app.get('/', getDepartments)
  app.post('/', createDepartment)
  app.put('/', updateDepartment)
  app.delete('/:id', deleteDepartment)
}