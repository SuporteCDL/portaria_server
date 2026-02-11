"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const entries_routes_1 = require("../modules/entries/entries.routes");
const users_routes_1 = require("../modules/users/users.routes");
const department__routes_1 = require("../modules/departments/department..routes");
async function RegisterRoutes(app) {
    app.register(entries_routes_1.entryRoutes, { prefix: '/entries' });
    app.register(users_routes_1.userRoutes, { prefix: '/users' });
    app.register(department__routes_1.departmentRoutes, { prefix: '/departments' });
}
//# sourceMappingURL=routes.js.map