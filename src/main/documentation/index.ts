import components from "./components";
import paths from "./paths";
import schemas from "./schemas";

export default {
  openapi: '3.0.0',
  info: {
    title: 'API para desafio técnico da empresa Lexart',
    description: 'Essa documentação é uma API para desafio técnico da empresa Lexart, onde temos que expor rotas externas para que o cliente possa consumir.',
    version: '1.0.0',
    contact: {
      name: 'Tarcio Rocha',
      email: 'tarcio_x@hotmail.com',
      url: 'https://www.linkedin.com/in/tarcio-rocha-79b487173/'
    },
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Register',
    description: 'APIs relacionadas a Registro de Usuários'
  }, {
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Products',
    description: 'APIs relacionadas a Produtos'
  }],
  paths,
  schemas,
  components
}
