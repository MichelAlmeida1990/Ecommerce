# 🚀 Guia de Início Rápido

## Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn** (vem com Node.js)
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

## 🏃‍♂️ Passo a Passo

### 1. Clone o Repositório

```bash
git clone <seu-repositorio>
cd ecommerce
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite o arquivo .env.local com suas configurações
```

**Exemplo de configuração mínima:**

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"

# NextAuth (gere uma chave secreta)
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configure o Banco de Dados

```bash
# Crie o banco de dados PostgreSQL
createdb ecommerce

# Execute as migrações
npm run db:migrate

# Gere o cliente Prisma
npm run db:generate

# Popule com dados de teste (opcional)
npm run db:seed
```

### 5. Execute o Projeto

```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 🔑 Credenciais de Teste

Após executar o seed, você terá acesso a:

- **Admin**: `admin@ecommerce.com` / `admin123`
- **Usuário**: `user@ecommerce.com` / `user123`
- **Cupom**: `PRIMEIRA10` (10% de desconto)

## 📱 Funcionalidades Disponíveis

### ✅ Implementadas
- ✅ Página inicial com hero section
- ✅ Navegação responsiva
- ✅ Sistema de carrinho
- ✅ Catálogo de produtos
- ✅ Sistema de categorias
- ✅ Newsletter
- ✅ Depoimentos
- ✅ Design responsivo
- ✅ Animações com Framer Motion

### 🚧 Em Desenvolvimento
- 🔄 Sistema de autenticação
- 🔄 Checkout completo
- 🔄 Painel administrativo
- 🔄 Sistema de pagamentos
- 🔄 Gestão de pedidos

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção

# Banco de dados
npm run db:generate  # Gera cliente Prisma
npm run db:migrate   # Executa migrações
npm run db:seed      # Popula banco com dados
npm run db:studio    # Abre Prisma Studio

# Qualidade de código
npm run lint         # Executa ESLint
npm run format       # Formata com Prettier
npm run type-check   # Verifica tipos TypeScript
```

## 🎨 Personalização

### Cores
As cores estão definidas em `tailwind.config.js`:

```js
colors: {
  primary: '#031f5f',      // Azul principal
  azure: '#00afee',        // Azure vívido
  neon: '#ca00ca',         // Rosa neon
  brown: '#c2af00',        // Marrom
  accent: '#ccff00',       // Verde amarelado
  background: '#000000',   // Fundo preto
}
```

### Fontes
- **Inter**: Para texto geral
- **Poppins**: Para títulos e display

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 14)
├── components/          # Componentes React
│   ├── layout/         # Header, Footer
│   ├── sections/       # Seções da página
│   ├── ui/             # Componentes básicos
│   ├── cart/           # Carrinho de compras
│   └── auth/           # Autenticação
├── contexts/            # Contextos React
├── hooks/               # Custom hooks
├── lib/                 # Utilitários
└── types/               # Tipos TypeScript
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Outras Opções
- **Netlify**: `npm run build && netlify deploy`
- **Railway**: Conecte seu repositório
- **DigitalOcean**: App Platform

## 🐛 Solução de Problemas

### Erro de Banco de Dados
```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status

# Recrie o banco se necessário
dropdb ecommerce
createdb ecommerce
npm run db:migrate
```

### Erro de Dependências
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build
```bash
# Verifique tipos TypeScript
npm run type-check

# Limpe cache do Next.js
rm -rf .next
npm run build
```

## 📚 Próximos Passos

1. **Configure autenticação** com NextAuth.js
2. **Integre pagamentos** com Stripe
3. **Implemente checkout** completo
4. **Adicione painel admin** para gestão
5. **Configure analytics** (Google Analytics, Hotjar)
6. **Implemente SEO** avançado
7. **Adicione testes** automatizados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📞 Suporte

- 📧 **Email**: suporte@seudominio.com
- 💬 **Discord**: [Link do servidor]
- 📖 **Documentação**: [Link da wiki]
- 🐛 **Issues**: [GitHub Issues]

---

**Boa sorte com seu e-commerce! 🎉**





