"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRoutes = void 0;
const entries_controller_1 = require("./entries.controller");
const entryRoutes = async (app) => {
    app.get('/', entries_controller_1.getEntries);
    app.get('/:dayEntry', entries_controller_1.getEntriesByDay); //pesquisa no cadastro de entradas
    app.get('/entriesamountdays', entries_controller_1.getEntriesAmountDays); //grafico quantidade de atendimentos (barras verticais)
    app.get('/entriesbylocal', entries_controller_1.getEntriesByLocal); //grafico atendimentos por local (donut)
    app.get('/entriesbyperiod', entries_controller_1.getEntriesByPeriod); //relatório de entradas por periodo
    app.post('/', entries_controller_1.createEntry);
    app.put('/', entries_controller_1.updateEntry);
    app.delete('/:id', entries_controller_1.removeEntry);
};
exports.entryRoutes = entryRoutes;
//# sourceMappingURL=entries.routes.js.map