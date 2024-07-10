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

class Product {
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


describe('Domain: Product', () => {
  it('should be able to create a new product with a required fields', () => {
    const sut = new Product({
      name: 'any_name',
      price: 10,
      stock: 10
    })

    expect(sut).toEqual({
      name: 'any_name',
      price: 10,
      stock: 10
    })
  });

  it('should be able to create a new product with a required fields', () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    const sut = new Product({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt,
      updatedAt
    })

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt,
      updatedAt
    })
  });

  it('should be able to create a new product to factory method', () => {
    const sut = Product.create({
      name: 'any_name',
      price: 10,
      stock: 10,
    })

    expect(sut).toEqual({
      name: 'any_name',
      price: 10,
      stock: 10,
    })
  })

  it('should be able to update product stock', () => {
    const sut = new Product({
      name: 'any_name',
      price: 10,
      stock: 10
    })

    sut.changeStock(20)

    expect(sut.toJSON().stock).toBe(20)
  })

  it('should be able to update product name', () => {
    const sut = new Product({
      name: 'any_name',
      price: 10,
      stock: 10
    })

    sut.changeName('new_name')

    expect(sut.toJSON().name).toBe('new_name')
  })

  it('should be able to update product price', () => {
    const sut = new Product({
      name: 'any_name',
      price: 10,
      stock: 10
    })

    sut.changePrice(20)

    expect(sut.toJSON().price).toBe(20)
  })

  it('should be able to return the product as a json', () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    const sut = new Product({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt,
      updatedAt
    })

    expect(sut.toJSON()).toEqual({
      id: 'any_id',
      name: 'any_name',
      price: 10,
      stock: 10,
      createdAt,
      updatedAt
    })
  })
});