# ServeRest - Testes automatizados com Cypress

Testes E2E (frontend) e de API para o [ServeRest](https://serverest.dev), desenvolvidos com Cypress e JavaScript.

- Frontend: https://front.serverest.dev/
- API: https://serverest.dev/

## Pré-requisitos
- Node.js LTS
- npm

## Como rodar
```bash
npm install
npm run cy:open    # modo interativo
npm run cy:run     # todos os testes (headless) e geração do relatório
npm run cy:api     # somente API
npm run cy:front   # somente frontend
```

## Relatório
Ao rodar os testes em modo headless, é gerado um relatório HTML em `cypress/reports/index.html`, com gráficos, resultado por teste e screenshots das falhas. No GitHub Actions, o relatório fica disponível como artefato (`cypress-report`) da execução.

## Cenários
**Frontend (4)**
- Cadastro de usuário administrador com sucesso
- Cadastro com e-mail já utilizado
- Login com senha inválida
- Login de usuário comum (não administrador), direcionado para fora da área admin

**API (4)**
- Cadastro de usuário, com validação do contrato e conferência dos dados persistidos
- Cadastro com e-mail já utilizado
- Login válido, com validação do contrato da resposta
- Cadastro de produto com token de administrador, com validação do contrato e conferência dos dados persistidos

## Estrutura
```
cypress/
  e2e/
    api/        testes de API (cy.request)
    front/      testes E2E de interface
  pages/        Page Objects (loginPage, cadastroPage)
  factories/    geração de dados dinâmicos (faker)
  support/
    commands.js   comandos customizados (criar usuário/produto, login via API)
    messages.js   mensagens esperadas centralizadas
    schemas.js    schemas e helper de validação de contrato
    e2e.js        arquivo de suporte carregado antes dos testes
.github/workflows/cypress.yml   execução automática no GitHub Actions
```

## Decisões técnicas
- **Page Object:** concentra seletores e ações de cada tela, facilitando a manutenção e a leitura dos testes.
- **Factory de dados:** cada execução usa dados únicos (faker), então os testes são independentes entre si e não dependem de dados pré-existentes.
- **Comandos customizados:** pré-condições (criar usuário, obter token, criar produto) são feitas pela API, o que deixa os testes de interface mais rápidos e focados no que realmente testam.
- **Mensagens centralizadas:** textos esperados ficam em um único arquivo (`messages.js`).
- **Validação de contrato:** a API é validada por schema (campos e tipos), além de status e mensagem, e os dados criados são conferidos com um `GET` posterior.
- **Sem esperas fixas:** sincronização por asserções (por exemplo, URL), sem `cy.wait()` com tempo fixo.
- **Relatório HTML:** `cypress-mochawesome-reporter` para facilitar a leitura dos resultados, inclusive no CI.

## Melhorias futuras
- Cenários de frontend em BDD com Cucumber (Gherkin)
- ESLint e Prettier
- Cenários de PUT e DELETE de usuário e produto, listagem e produto sem token
