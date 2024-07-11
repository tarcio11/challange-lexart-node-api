export class InternalServerError extends Error {
  constructor () {
    super('Internal server error')
    this.name = 'InternalServerError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
  }
}