interface IDepartment {
    id: number;
    descricao: string;
}
declare function list(): Promise<any[]>;
declare function create(deptoData: Omit<IDepartment, 'id'>): Promise<any>;
declare function update(deptoData: IDepartment): Promise<any>;
declare function remove(id: number): Promise<void>;
export declare const departmentService: {
    list: typeof list;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export {};
//# sourceMappingURL=department.service.d.ts.map