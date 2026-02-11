"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const users_controller_1 = require("./users.controller");
const authenticate_1 = require("../../middlewares/authenticate");
async function userRoutes(app) {
    app.post('/signin', users_controller_1.signInUser);
    app.get('/', { preHandler: authenticate_1.authenticate }, users_controller_1.getUsers);
    app.post('/', { preHandler: authenticate_1.authenticate }, users_controller_1.createUser);
    app.put('/:id', { preHandler: authenticate_1.authenticate }, users_controller_1.updateUser);
    app.delete('/:id', { preHandler: authenticate_1.authenticate }, users_controller_1.removeUser);
}
//# sourceMappingURL=users.routes.js.map