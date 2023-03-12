import { MongoClient } from 'mongodb'
import { User } from './models/User'
import { UserDAO } from './dao/UserDAO'
import { faker } from '@faker-js/faker'

const main = async () => {
  const connection = await MongoClient.connect('mongodb://localhost')
  const db = connection.db('users_management')

  faker.locale = 'pt_BR'

  let firstName = faker.name.firstName()
  let lastName = faker.name.lastName()
  let fullName = `${firstName} ${lastName}`
  let email = faker.internet.email(firstName, lastName)
  let birthday = faker.date.past(50)

  const user1 = new User(fullName, email, birthday)

  const dao = new UserDAO(db)

  let id = await dao.create(user1)
  console.log(id)

  const users: User[] = await dao.findByBirthdayPeriod(
    new Date('1980-01-01T00:00:00.000Z'),
    new Date()
  )
  users.forEach((u) => console.log(u))

  let currentUser = await dao.findOne(id)
  console.log(currentUser)

  const newEmail = faker.internet.email(firstName, lastName)
  const updated = await dao.update(id, { email: newEmail })
  console.log(updated)

  currentUser = await dao.findOne(id)
  console.log(currentUser)

  firstName = faker.name.firstName()
  lastName = faker.name.lastName()
  fullName = `${firstName} ${lastName}`
  email = faker.internet.email(firstName, lastName)
  birthday = faker.date.past(50)

  const newUser = new User(fullName, email, birthday)

  id = await dao.create(newUser)
  console.log(id)

  const deleted = await dao.delete(id)
  console.log(deleted)
}

main().then(() => process.exit(0))
