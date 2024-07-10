type ProductModel = {
  id?: string
  name: string
  price: number
  stock: number
  createdAt?: Date
  updatedAt?: Date
}

class Product {
  id?: string
  name: string
  price: number
  stock: number
  createdAt?: Date
  updatedAt?: Date

  constructor (props: ProductModel) {
    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.stock = props.stock
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
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
});