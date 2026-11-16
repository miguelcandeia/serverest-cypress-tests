class CadastroPage {
  visit() {
    cy.visit('/cadastrarusuarios')
  }
  register({ nome, email, password, administrador }) {
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password, { log: false })
    if (administrador === 'true') cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()
  }
}

export default new CadastroPage()
