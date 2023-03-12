import { Db } from 'mongodb';
import { User } from '../models/User';
import { GenericDAO } from './GenericDAO';
export declare class UserDAO extends GenericDAO<User> {
    constructor(db: Db);
    findByBirthdayPeriod(start: Date, end: Date): Promise<User[]>;
}
