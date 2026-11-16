// Schemas simples (campo -> tipo) usados para validar o contrato das respostas da API.
export const SCHEMAS = {
  usuario: {
    nome: 'string',
    email: 'string',
    password: 'string',
    administrador: 'string',
    _id: 'string',
  },
  produto: {
    nome: 'string',
    preco: 'number',
    descricao: 'string',
    quantidade: 'number',
    _id: 'string',
  },
  login: {
    message: 'string',
    authorization: 'string',
  },
  criacao: {
    message: 'string',
    _id: 'string',
  },
}

// Valida que o objeto possui exatamente os campos do schema, com os tipos esperados.
export const expectSchema = (body, schema) => {
  expect(body, 'campos da resposta').to.have.all.keys(Object.keys(schema))
  Object.entries(schema).forEach(([campo, tipo]) => {
    expect(body[campo], `tipo do campo "${campo}"`).to.be.a(tipo)
  })
}
