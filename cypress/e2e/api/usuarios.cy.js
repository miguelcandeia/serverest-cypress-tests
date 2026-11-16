import { buildUser } from '../../factories/userFactory'
import { MESSAGES } from '../../support/messages'
import { SCHEMAS, expectSchema } from '../../support/schemas'

describe('API - Usuários', () => {
  const url = () => `${Cypress.env('apiUrl')}/usuarios`

  it('deve cadastrar um usuário e persistir os dados enviados', () => {
    const user = buildUser()

    cy.request('POST', url(), user).then(({ status, body }) => {
      expect(status).to.eq(201)
      expectSchema(body, SCHEMAS.criacao)
      expect(body.message).to.eq(MESSAGES.CADASTRO_SUCESSO)

      cy.request('GET', `${url()}/${body._id}`).then(({ status, body: criado }) => {
        expect(status).to.eq(200)
        expectSchema(criado, SCHEMAS.usuario)
        expect(criado).to.include({
          nome: user.nome,
          email: user.email,
          administrador: user.administrador,
          _id: body._id,
        })
      })
    })
  })

  it('não deve cadastrar usuário com e-mail já utilizado', () => {
    const user = buildUser()
    cy.createUserApi(user)

    cy.request({ method: 'POST', url: url(), body: user, failOnStatusCode: false }).then(
      ({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.message).to.eq(MESSAGES.EMAIL_DUPLICADO)
      }
    )
  })
})
