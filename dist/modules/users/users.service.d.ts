import { ISigIn, IUser } from '../../utils/interface';
declare function list(): Promise<any[]>;
export declare function signIn(userBody: ISigIn): Promise<{
    user: any;
} | null>;
declare function create(dados: Omit<IUser, 'id'>): Promise<any>;
declare function update(dados: IUser): Promise<any>;
declare function remove(id: Number): Promise<any>;
export declare const userService: {
    list: typeof list;
    signIn: typeof signIn;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export {};
//# sourceMappingURL=users.service.d.ts.map