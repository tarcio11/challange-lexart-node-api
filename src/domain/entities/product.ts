type ProductModel = {
  id?: string
  name: string
  price: number
  stock: number
  createdAt?: Date
  updatedAt?: Date
}

type CreateCommand = {
  name: string
  price: number
  stock: number
}

export class Product {
  private id?: string
  private name: string
  private price: number
  private stock: number
  private createdAt?: Date
  private updatedAt?: Date

  constructor (props: ProductModel) {
    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.stock = props.stock
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create (command: CreateCommand): Product {
    return new Product(command)
  }

  changeStock (stock: number): void {
    this.stock = stock
  }

  changeName (name: string): void {
    this.name = name
  }

  changePrice (price: number): void {
    this.price = price
  }

  toJSON (): ProductModel {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}