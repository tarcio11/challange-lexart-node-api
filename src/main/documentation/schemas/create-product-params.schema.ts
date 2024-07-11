export const CreateProductParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Name of the product',
      example: 'any_name'
    },
    price: {
      type: 'number',
      description: 'Price of the product',
      example: 100
    },
    stock: {
      type: 'number',
      description: 'Stock of the product',
      example: 10
    }
  },
  required: ['name', 'price', 'stock']
}
