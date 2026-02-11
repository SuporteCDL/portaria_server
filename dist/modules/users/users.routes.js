import { getUsers, createUser, updateUser, removeUser, signInUser } from "./users.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";
export async function userRoutes(app) {
    app.post('/signin', signInUser);
    app.get('/', { preHandler: authenticate }, getUsers);
    app.post('/', { preHandler: authenticate }, createUser);
    app.put('/:id', { preHandler: authenticate }, updateUser);
    app.delete('/:id', { preHandler: authenticate }, removeUser);
}
//# sourceMappingURL=users.routes.js.map