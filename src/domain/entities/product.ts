export type ProductModel = {
  id?: string
  name: string
  price: number
  stock: number
  isExternal?: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

type CreateCommand = {
  name: string
  price: number
  stock: number
  isExternal?: boolean
}

export class Product {
  private id?: string
  private name: string
  private price: number
  private stock: number
  private isExternal?: boolean
  private createdAt?: Date
  private updatedAt?: Date
  private deletedAt?: Date

  constructor (props: ProductModel) {
    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.stock = props.stock
    this.isExternal = props.isExternal ?? false
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.deletedAt = props.deletedAt
  }

  static create (command: CreateCommand): Product {
    return new Product(command)
  }

  changeStock (stock?: number): void {
    if(stock) this.stock = stock
  }

  changeName (name?: string): void {
    if (name) this.name = name
  }

  changePrice (price?: number): void {
    if (price) this.price = price
  }

  update (props: Partial<CreateCommand>): void {
    this.changeName(props.name)
    this.changePrice(props.price)
    this.changeStock(props.stock)
  }

  toJSON (): ProductModel {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      isExternal: this.isExternal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}