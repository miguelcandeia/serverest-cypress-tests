import cadastroPage from '../../pages/cadastroPage'
import { buildUser } from '../../factories/userFactory'
import { MESSAGES } from '../../support/messages'

describe('Frontend - Cadastro de usuário', () => {
  it('deve cadastrar um usuário administrador com sucesso', () => {
    cadastroPage.visit()
    cadastroPage.register(buildUser())

    cy.contains(MESSAGES.CADASTRO_SUCESSO).should('be.visible')
    cy.url().should('include', '/admin/home')
  })

  it('não deve cadastrar usuário com e-mail já utilizado', () => {
    const user = buildUser()
    cy.createUserApi(user)

    cadastroPage.visit()
    cadastroPage.register(user)

    cy.contains(MESSAGES.EMAIL_DUPLICADO).should('be.visible')
    cy.url().should('include', '/cadastrarusuarios')
  })
})
