"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRoutes = void 0;
const departments_controller_1 = require("./departments.controller");
const departmentRoutes = async (app) => {
    app.get('/', departments_controller_1.getDepartments);
    app.post('/', departments_controller_1.createDepartment);
    app.put('/', departments_controller_1.updateDepartment);
    app.delete('/:id', departments_controller_1.deleteDepartment);
};
exports.departmentRoutes = departmentRoutes;
//# sourceMappingURL=department..routes.js.map