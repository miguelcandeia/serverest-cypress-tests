import { faker } from '@faker-js/faker'

export const buildUser = (overrides = {}) => ({
  nome: faker.person.fullName(),
  email: faker.internet.email({ provider: 'qa.com' }).toLowerCase(),
  password: faker.internet.password({ length: 10 }),
  administrador: 'true',
  ...overrides,
})

export const buildProduct = (overrides = {}) => ({
  nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(6)}`,
  preco: faker.number.int({ min: 10, max: 1000 }),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 1, max: 100 }),
  ...overrides,
})
