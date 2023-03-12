import { Db, FindCursor } from 'mongodb'

import { User } from '../models/User'
import { GenericDAO } from './GenericDAO'

export class UserDAO extends GenericDAO<User> {
  constructor(db: Db) {
    super(db, 'users')
  }

  async findByBirthdayPeriod(start: Date, end: Date) {
    const users = await this.find({
      birthday: {
        $gte: start,
        $lte: end,
      },
    })

    return users
  }
}
