import { Product } from '../../../src/domain/entities/product'

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