import { Document } from 'mongodb'

export class User implements Document {
  name: string
  email: string
  birthday?: Date

  constructor(name: string, email: string, birthday?: Date) {
    this.name = name
    this.email = email
    this.birthday = birthday
  }
}
