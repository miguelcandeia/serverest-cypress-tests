import { buildUser } from '../../factories/userFactory'
import { MESSAGES } from '../../support/messages'
import { SCHEMAS, expectSchema } from '../../support/schemas'

describe('API - Login', () => {
  it('deve realizar login e retornar token no contrato esperado', () => {
    const user = buildUser()
    cy.createUserApi(user)

    cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
      email: user.email,
      password: user.password,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expectSchema(body, SCHEMAS.login)
      expect(body.message).to.eq(MESSAGES.LOGIN_SUCESSO)
      expect(body.authorization).to.match(/^Bearer /)
    })
  })
})
