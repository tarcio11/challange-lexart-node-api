export const getProductsPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Products'],
    summary: 'API para listar todos os produtos',
    description: 'Essa rota pode ser executada por **qualquer usuário** autenticado',
    parameters: [
      {
        in: 'query',
        name: 'page',
        description: 'Página que deseja visualizar',
        required: false,
        schema: {
          type: 'number',
          default: 1
        }
      },
      {
        in: 'query',
        name: 'perPage',
        description: 'Quantidade de itens por página',
        required: false,
        schema: {
          type: 'number',
          default: 10
        }
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/listProducts'
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
  }
}
