type ProductModel = {
  name: string
  price: number
  stock: number
}

class Product {
  name: string
  price: number
  stock: number

  constructor (props: ProductModel) {
    this.name = props.name
    this.price = props.price
    this.stock = props.stock
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
});