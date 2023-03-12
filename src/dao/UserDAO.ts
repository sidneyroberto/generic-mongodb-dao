import { Db, FindCursor } from 'mongodb'

import { User } from '../models/User'
import { GenericDAO } from './GenericDAO'

export class UserDAO extends GenericDAO<User> {
  constructor(db: Db) {
    super(db, 'users')
  }

  async findByBirthdayPeriod(start: Date, end: Date) {
    const cursor = this._collection.find({
      birthday: {
        $gte: start,
        $lte: end,
      },
    })

    const users = await this._fetchCursor(cursor)
    return users
  }

  protected async _fetchCursor(cursor: FindCursor): Promise<User[]> {
    const users: User[] = []
    await cursor.forEach((result) => {
      const { _id, name, email, birthday } = result
      const user = new User(name, email, birthday)
      ;(user as any)._id = _id
      users.push(user)
    })

    return users
  }
}
