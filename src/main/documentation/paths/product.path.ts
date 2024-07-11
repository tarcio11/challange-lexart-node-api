export const productPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Products'],
    summary: 'API para criar um novo produto',
    description: 'Essa rota pode ser executada por **qualquer usuário** autenticado',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createProductParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/noContent'
            }
          }
        }
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
}
