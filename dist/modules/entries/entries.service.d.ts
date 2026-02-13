interface IEntry {
    id: number;
    atendimento: string;
    qtde_pessoas: number;
    data: string;
    hora_entrada: string;
    hora_saida?: string | undefined;
    permanencia?: number | undefined;
    observacao?: string | undefined;
    nome?: string | undefined;
    servico?: string | undefined;
    usuario?: string | undefined;
}
declare function list(): Promise<any[]>;
declare function listByDay(dayEntry: string): Promise<any[]>;
declare function listEntriesAmountDays(atendimento?: string): Promise<{
    data: any;
    total: number;
}[]>;
declare function listByLocal(): Promise<{
    atendimento: any;
    qtde: number;
}[]>;
declare function listByUser(): Promise<{
    usuario: any;
    qtde: number;
}[]>;
declare function listByPeriod(dayBegin: string, dayEnd: string): Promise<any[]>;
declare function create(entryData: Omit<IEntry, 'id'>): Promise<any>;
declare function update(entryData: IEntry): Promise<any>;
declare function remove(id: number): Promise<void>;
export declare const entryService: {
    list: typeof list;
    listEntriesAmountDays: typeof listEntriesAmountDays;
    listByPeriod: typeof listByPeriod;
    listByLocal: typeof listByLocal;
    listByUser: typeof listByUser;
    listByDay: typeof listByDay;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export {};
//# sourceMappingURL=entries.service.d.ts.map