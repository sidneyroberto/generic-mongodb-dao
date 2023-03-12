import { IGenericDAO } from './IGenericDAO';
import { Db, Collection, Document, FindCursor } from 'mongodb';
export declare abstract class GenericDAO<T extends Document> implements IGenericDAO<T> {
    readonly _collection: Collection<T>;
    constructor(db: Db, collectionName: string);
    create(obj: T): Promise<string>;
    update(id: string, obj: any): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findOne(id: string): Promise<T>;
    find(criteria: any, options?: any): Promise<T[]>;
    protected _fetchCursor(cursor: FindCursor): Promise<T[]>;
}
