export const ListProductsSchema = {
  type: 'object',
  properties: {
   data: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Id of the product',
              example: 'any_id'
            },
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
            },
            isExternal: {
              type: 'boolean',
              description: 'Indicates if the product is external',
              example: false
            },
            createdAt: {
              type: 'string',
              description: 'Product creation date',
              example: '2021-05-18T00:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              description: 'Product update date',
              example: '2021-05-18T00:00:00.000Z'
            }
          }
        }
      },
      total: {
        type: 'number'
      }
    }
   }
  },
  required: ['data', 'total']
}
