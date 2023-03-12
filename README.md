# generic-mongodb-dao

A Generic Data Access Object (DAO) for MongoDB collections.

To install the package, run:

```
npm i generic-mongodb-dao
```

With Yarn:

```
yarn add generic-mongodb-dao
```

GenericDAO abstract class has the following methods:

```ts
public create(obj: T): Promise<string>
public update(id: string, obj: any): Promise<boolean>
public  delete(id: string): Promise<boolean>
public findOne(id: string): Promise<T>
public find(criteria: any, options?: any): Promise<T[]>
```

Example of use:

```ts
import { GenericDAO } from 'generic-mongodb-dao'
import { MongoClient } from 'mongodb'

class User {
  name: string
  email: string
  birthday: Date

  constructor(name: string, email: string, birthday?: Date) {
    this.name = name
    this.email = email
    this.birthday = birthday
  }
}

class UserDAO extends GenericDAO<User> {
  constructor(db: Db) {
    super(db, 'users')
  }
}

const user1 = new User(
  'Dwight Schrute',
  'dwight@dundermifflin.com',
  new Date('1970-01-20')
)

const connection = await MongoClient.connect('mongodb://localhost')
const db = connection.db('users_management')

const dao = new UserDAO(db)

const id = await dao.create(user1)
console.log(id)

const currentUser = await dao.findOne(id)
console.log(currentUser)

const users = await dao.find({
  name: {
    $regex: 'dwight',
    $options: 'i',
  },
})
console.log(users)

const updated = await dao.update(id, {
  email: 'salesman_number1@dundermifflin.com',
})
console.log(updated)

const deleted = await dao.delete(id)
console.log(deleted)
```

Using `find` method, you may implement custom query methods:

```ts
import { Db, FindCursor } from 'mongodb'
import { GenericDAO } from 'generic-mongodb-dao'

import { User } from '../models/User'

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
```
