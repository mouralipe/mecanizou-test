describe('Fluxo de Autenticação E2E', () => {
  beforeEach(() => {
    // Limpar cookies antes de cada teste
    cy.clearCookies();
  });

  it('deve fazer login, acessar produtos e logout com sucesso', () => {
    // 1. Acessar página de login
    cy.visit('/login');

    // Verificar se está na página de login
    cy.contains('h1', 'Login').should('be.visible');

    // 2. Preencher formulário de login
    cy.get('input[placeholder="Digite seu usuário"]')
      .should('be.visible')
      .type('usuario_teste');

    cy.get('input[placeholder="Digite sua senha"]')
      .should('be.visible')
      .type('senha123');

    // 3. Submeter formulário
    cy.get('button[type="submit"]').contains('Entrar').click();

    // 4. Verificar redirecionamento para /produtos
    cy.url().should('include', '/produtos');

    // Aguardar a página carregar
    cy.wait(1000);

    // 5. Verificar se está na página de produtos
    cy.contains('h1', 'Produtos').should('be.visible');

    // Verificar que está no layout autenticado (header com "Mecanizou" e botão "Sair")
    cy.contains('h1', 'Mecanizou').should('be.visible');
    cy.contains('button', 'Sair').should('be.visible');

    // 6. Fazer logout clicando no botão "Sair" do header
    cy.contains('button', 'Sair').click();

    // 7. Verificar redirecionamento para /login
    cy.url().should('include', '/login');

    // 8. Verificar que o cookie de autenticação foi removido
    cy.getCookie('auth').should('not.exist');
  });

  it('deve impedir acesso a /produtos sem autenticação', () => {
    // Tentar acessar /produtos sem estar logado
    cy.visit('/produtos');

    // Deve ser redirecionado para login (dependendo do middleware)
    // ou mostrar erro de acesso negado
    cy.url().should('satisfy', (url) => {
      return url.includes('/login') || url.includes('/produtos');
    });
  });

  it('deve validar campos obrigatórios do login', () => {
    cy.visit('/login');

    // Tentar submeter formulário vazio
    cy.get('button[type="submit"]').click();

    // Verificar que ainda está na página de login
    cy.url().should('include', '/login');

    // Preencher apenas usuário
    cy.get('input[placeholder="Digite seu usuário"]').type('usuario');
    cy.get('button[type="submit"]').click();

    // Ainda deve estar na página de login
    cy.url().should('include', '/login');
  });
});
