import { User } from "../../../src/domain/entities/user"

describe('User', () => {
  it('should create a new user', () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(user).toBeInstanceOf(User)
  })

  it('should create a new user with fields optionals', () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    const user = new User({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      createdAt,
      updatedAt
    })
    expect(user.toJSON()).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      createdAt,
      updatedAt
    })
  })

  it('should return a user as json', () => {
    const user = new User({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(user.toJSON()).toEqual({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
  })
})