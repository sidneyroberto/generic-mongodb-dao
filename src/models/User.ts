export class User {
  name: string
  email: string
  birthday?: Date

  constructor(name: string, email: string, birthday?: Date) {
    this.name = name
    this.email = email
    this.birthday = birthday
  }
}
