export const NoContentSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      description: 'Status code of the response',
      example: 204
    },
    data: {
      type: 'string',
      example: null
    }
  },
  required: ['statusCode', 'data']
}
