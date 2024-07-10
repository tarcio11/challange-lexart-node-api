export interface Validator<T = any, R = any> {
  validate: (data: T) => Promise<R>
}