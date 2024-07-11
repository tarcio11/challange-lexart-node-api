export const SignInSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      description: 'Status code of the response',
      example: 200
    },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User id',
              example: 'any_id'
            },
            name: {
              type: 'string',
              description: 'User name',
              example: 'any_name'
            },
            email: {
              type: 'string',
              description: 'User email',
              example: 'jho.doe@mail.com'
            },
            createdAt: {
              type: 'string',
              description: 'User creation date',
              example: '2021-05-18T00:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              description: 'User update date',
              example: '2021-05-18T00:00:00.000Z'
            }
          }
        },
        accessToken: {
          type: 'string',
          description: 'User access token',
          example: 'any_token'
        }
      }
    },
  },
  required: [
    'statusCode',
    'data'
  ]
}
