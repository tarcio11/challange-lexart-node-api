export type UserModel = {
  id?: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

type CreateCommand = {
  name: string
  email: string
  password: string
}

export class User {
  private id?: string
  private name: string
  private email: string
  private password: string
  private createdAt?: Date
  private updatedAt?: Date

  constructor (props: UserModel) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create (command: CreateCommand): User {
    return new User(command)
  }

  toJSON (): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}