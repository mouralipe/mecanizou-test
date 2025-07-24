describe('Fluxo de Autenticação E2E - Versão Simplificada', () => {
  beforeEach(() => {
    // Limpar cookies antes de cada teste
    cy.clearCookies();
  });

  it('deve completar o fluxo: login → produtos → logout', () => {
    // 1. Fazer login usando comando customizado
    cy.login();

    // 2. Verificar que está na página de produtos
    cy.url().should('include', '/produtos');
    cy.contains('h1', 'Produtos').should('be.visible');
    cy.contains('h1', 'Mecanizou').should('be.visible');

    // 3. Fazer logout usando comando customizado
    cy.logout();

    // 4. Verificar que voltou para o login
    cy.url().should('include', '/login');
    cy.getCookie('auth').should('not.exist');
  });

  it('deve fazer login com credenciais customizadas', () => {
    cy.login('admin', 'minhasenha');

    cy.url().should('include', '/produtos');
    cy.contains('h1', 'Produtos').should('be.visible');
  });
});
