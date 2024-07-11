export const signupPath = {
  post: {
    tags: ['Register'],
    summary: 'API para registrar usuário',
    description: 'Essa rota pode ser executada por **qualquer usuário** que deseja se registrar',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
  }
}
