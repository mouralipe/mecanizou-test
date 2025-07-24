## 📋 Índice

- [Setup e Execução](#-setup-e-execução)
- [Dúvidas Técnicas](#-dúvidas-técnicas-abordadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [CI/CD](#-cicd)
- [Próximos Passos](#-próximos-passos-para-produção)
- [Scripts Disponíveis](#-scripts-disponíveis)

## 🚀 Setup e Execução

### Pré-requisitos

- **Node.js**: versão 18 ou superior
- **npm**: versão 9 ou superior

### Instalação

```bash
# Clone o repositório
git clone https://github.com/mouralipe/mecanizou-test.git
cd mecanizou-test

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Acesse a aplicação
# http://localhost:3000
```

### Outros comandos úteis

```bash
# Build para produção
npm run build
npm start

# Executar testes
npm run test
npm run test:coverage

# Testes E2E
npm run e2e
npm run cypress:open

# Linting e formatação
npm run lint
npm run format
npm run format:check
```

### Credenciais de Acesso

A aplicação aceita qualquer combinação de usuário/senha para login. Exemplos:

- **Usuário**: `admin` | **Senha**: `123456`
- **Usuário**: `user` | **Senha**: `password`
- Ou qualquer outra combinação

## 🤔 Dúvidas Técnicas Abordadas

### 1. **Estratégia de Renderização**

- **Questão**: SSR vs SSG vs ISG vs CSR para páginas de produtos?
- **Decisão**: SSR para páginas de detalhes (`/produtos/[id]`)
- **Justificativa**: Produtos podem ter dados dinâmicos (estoque, preços) que precisam estar sempre atualizados, além dos benefícios de SEO.
- **Observação**: Podemos usar ISG como meio termo e colocar um tempo de revalidação caso a loja não tenha atualizações frequentes de estoque e preços.
- **Observação 2**: Nesse projeto foi utilizado CSR devido aos dados serem estáticos.

### 2. **Gerenciamento de Estado**

- **Questão**: Como gerenciar estado global mínimo e performático?
- **Decisão**: Zustand para tema + hooks locais para dados
- **Justificativa**: Permite certo nível de escala e evita a sobrecarga desnecessária da Context API para estados simples

## 📁 Estrutura do Projeto

```
mecanizou-test/
├── 📁 src/
│   ├── 📁 app/              # Next.js App Router
│   │   ├── 📁 (auth)/       # Rotas protegidas
│   │   │   ├── layout.tsx   # Layout autenticado
│   │   │   └── produtos/    # Páginas de produtos
│   │   ├── 📁 (default)/    # Rotas públicas
│   │   │   ├── layout.tsx   # Layout público
│   │   │   └── login/       # Página de login
│   │   └── 📁 api/          # API Routes
│   ├── 📁 components/       # Componentes UI
│   ├── 📁 hooks/            # Hooks customizados
│   ├── 📁 layouts/          # Layouts reutilizáveis
│   ├── 📁 services/         # Serviços de API
│   ├── 📁 stores/           # Stores Zustand
│   └── 📁 types/            # Tipos TypeScript
├── 📁 public/data/          # Dados estáticos
├── 📁 cypress/              # Testes E2E
└── 📁 .github/workflows/    # CI/CD
```

## 🔄 CI/CD

Pipeline automatizada no GitHub Actions:

```yaml
┌─ 🔍 Linting & Formatação
├─ 🧪 Testes Unitários (+ Coverage)
├─ 🔄 Testes E2E
├─ 🏗️ Build
└─ 📋 Resumo
```

**Executa em**:

- Push: `main`, `develop`, `feat/*`
- Pull Requests: `main`, `develop`

**Ferramentas**:

- ESLint + Prettier
- Jest
- Cypress E2E
- Build verification

## 🚀 Próximos Passos para Produção

### **1. Performance 🏃‍♂️**

**Otimizações**:

- [ ] **Image Optimization**: Implementar `next/image` com srcSet otimizado
- [ ] **Bundle Analysis**: Analisar e reduzir tamanho do bundle
- [ ] **Code Splitting**: Lazy loading de componentes pesados
- [ ] **API Caching**: React query para chamadas client
- [ ] **CDN**: CloudFront/Cloudflare para assets estáticos

### **2. Acessibilidade ♿**

**Implementações Necessárias**:

- [ ] **ARIA Labels**: Completar semântica para screen readers
- [ ] **Navegação por Teclado**: Tab order otimizada
- [ ] **Contraste**: Validação WCAG AA (4.5:1)
- [ ] **Foco Visível**: Indicadores claros de foco
- [ ] **Texto Alternativo**: Alt text descritivo para todas as imagens

**Ferramentas**:

- axe-core para testes automatizados
- Lighthouse accessibility audit
- Testes manuais com screen readers

### **3. Internacionalização (i18n) 🌍**

**Estrutura**:

```typescript
// next-i18next ou next-intl
const messages = {
  'pt-BR': { login: 'Entrar', products: 'Produtos' },
  'en-US': { login: 'Login', products: 'Products' },
  'es-ES': { login: 'Iniciar', products: 'Productos' },
};
```

**Implementação**:

- [ ] Configuração next-intl
- [ ] Extração de strings para arquivos de tradução
- [ ] Formatação de moeda por localização
- [ ] Roteamento por idioma (`/pt/produtos`, `/en/products`)

### **4. Segurança 🔒**

**Melhorias**:

- [ ] **Autenticação Real**: JWT + refresh tokens
- [ ] **CORS**: Configuração adequada para produção
- [ ] **Headers de Segurança**: CSP, HSTS, X-Frame-Options
- [ ] **Validação de Input**: Sanitização e validação server-side

### **5. Monitoramento 📊**

**Observabilidade**:

- [ ] **Error Tracking**: Sentry ou Datadog para monitoramento de erros
- [ ] **Analytics**: Google Analytics

### **6. Infraestrutura ☁️**

**Deploy e Escalabilidade**:

- [ ] **Vercel/Netlify**: Deploy contínuo com preview branches
- [ ] **Environment Variables**: Configuração de variáveis de ambiente
- [ ] **Database**: Banco de dados para dados reais

### **7. SEO e Marketing 📈**

**Otimizações**:

- [ ] **Metadata Dinâmica**: Open Graph
- [ ] **Sitemap XML**: Geração automática
- [ ] **Schema.org**: Structured data para produtos
- [ ] **Core Web Vitals**: Otimização para ranking Google

### **8. Testes Avançados 🧪**

**Ampliação da Cobertura**:

- [ ] **Performance Tests**: Lighthouse CI
- [ ] **Mais fluxos de testes**: Cypress e Jest

## 📚 Scripts Disponíveis

| Script                  | Descrição                    |
| ----------------------- | ---------------------------- |
| `npm run dev`           | Servidor de desenvolvimento  |
| `npm run build`         | Build para produção          |
| `npm run start`         | Servidor de produção         |
| `npm run lint`          | Executar ESLint              |
| `npm run format`        | Formatar código com Prettier |
| `npm run format:check`  | Verificar formatação         |
| `npm run test`          | Testes unitários             |
| `npm run test:watch`    | Testes em modo watch         |
| `npm run test:coverage` | Testes com cobertura         |
| `npm run e2e`           | Testes E2E (headless)        |
| `npm run cypress:open`  | Cypress interface gráfica    |

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4
- **Estado**: Zustand
- **Testes**: Jest + Cypress
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

---
