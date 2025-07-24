# Testes E2E com Cypress

Este projeto inclui testes End-to-End (E2E) usando Cypress para testar o fluxo completo de autenticação.

## 📁 Estrutura

```
cypress/
├── e2e/                     # Testes E2E
│   ├── auth-flow.cy.ts      # Teste completo detalhado
│   └── auth-flow-simple.cy.ts # Teste simplificado com comandos customizados
├── support/
│   ├── commands.ts          # Comandos customizados
│   ├── e2e.ts              # Configuração principal
│   └── index.d.ts          # Tipos TypeScript
└── README.md               # Esta documentação
```

## 🚀 Como Executar

### Pré-requisitos

1. Certifique-se de que o projeto está rodando:
   ```bash
   npm run dev
   ```

### Executar Testes

#### Modo Interativo (recomendado para desenvolvimento)

```bash
npm run cypress:open
# ou
npm run e2e:open
```

#### Modo Headless (para CI/CD)

```bash
npm run cypress:run
# ou
npm run e2e
```

## 🧪 Testes Disponíveis

### 1. auth-flow.cy.ts

Teste completo e detalhado que cobre:

- ✅ Login com validação de campos
- ✅ Acesso à página /produtos
- ✅ Verificação de elementos da página
- ✅ Logout e limpeza de sessão
- ✅ Validação de acesso sem autenticação
- ✅ Validação de campos obrigatórios

### 2. auth-flow-simple.cy.ts

Teste simplificado usando comandos customizados:

- ✅ Fluxo básico: login → produtos → logout
- ✅ Login com credenciais customizadas

## 🛠️ Comandos Customizados

### `cy.login(username?, password?)`

Faz login automaticamente

```typescript
cy.login(); // Usa credenciais padrão
cy.login('admin', 'minhasenha'); // Credenciais customizadas
```

### `cy.logout()`

Faz logout automaticamente

```typescript
cy.logout();
```

## 🎯 Fluxo Testado

1. **Login**: Acessa `/login`, preenche credenciais e submete
2. **Redirecionamento**: Verifica redirecionamento para `/produtos`
3. **Autenticação**: Confirma presença de elementos do layout autenticado
4. **Logout**: Clica no botão "Sair" do header
5. **Limpeza**: Verifica redirecionamento para `/login` e remoção de cookies

## ⚙️ Configuração

O Cypress está configurado em `cypress.config.ts` com:

- URL base: `http://localhost:3000`
- Viewport: 1280x720
- Screenshots apenas em caso de falha
- Vídeos desabilitados

## 🐛 Troubleshooting

### Problema: Teste falha por timeout

**Solução**: Certifique-se de que o servidor de desenvolvimento está rodando na porta 3000

### Problema: Elementos não encontrados

**Solução**: Verifique se a aplicação carregou completamente antes dos testes

### Problema: Erro de cookies

**Solução**: Os testes limpam cookies automaticamente no `beforeEach`
