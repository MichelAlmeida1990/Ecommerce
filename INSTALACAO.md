# 🚀 Guia de Instalação - E-commerce Top

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download aqui](https://nodejs.org/))
- **npm** ou **yarn** (vem com Node.js)
- **PostgreSQL** 12+ ([Download aqui](https://www.postgresql.org/download/))
- **Git** ([Download aqui](https://git-scm.com/))

## 🏃‍♂️ Instalação Passo a Passo

### 1. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd ecommerce
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite o arquivo .env.local com suas configurações
```

**Configuração mínima necessária:**

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"

# NextAuth (gere uma chave secreta)
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

**Para gerar uma chave secreta:**

```bash
# No terminal, execute:
openssl rand -base64 32
```

### 4. Configure o Banco de Dados PostgreSQL

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE ecommerce;

# Saia do PostgreSQL
\q
```

**Alternativa via terminal:**

```bash
createdb -U postgres ecommerce
```

### 5. Execute as Migrações do Banco

```bash
# Gere o cliente Prisma
npm run db:generate

# Execute as migrações
npm run db:migrate

# (Opcional) Popule com dados de teste
npm run db:seed
```

### 6. Execute o Projeto

```bash
npm run dev
```

🎉 **Pronto! Acesse: http://localhost:3000**

## 🔑 Credenciais de Teste

Após executar o seed, você terá acesso a:

- **👨‍💼 Admin**: `admin@ecommerce.com` / `admin123`
- **👤 Usuário**: `user@ecommerce.com` / `user123`
- **🎫 Cupom**: `PRIMEIRA10` (10% de desconto)

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção

# Banco de dados
npm run db:generate  # Gera cliente Prisma
npm run db:migrate   # Executa migrações
npm run db:seed      # Popula banco com dados de teste
npm run db:studio    # Abre Prisma Studio (interface do banco)

# Qualidade de código
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
npm run type-check   # Verifica tipos TypeScript
```

## 🎨 Personalização

### Cores do Tema

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

## 🐛 Solução de Problemas Comuns

### Erro: "Cannot find module 'prisma'"

```bash
npm install prisma --save-dev
npm run db:generate
```

### Erro: "Database connection failed"

1. Verifique se o PostgreSQL está rodando:
```bash
sudo service postgresql status
```

2. Verifique suas credenciais no `.env.local`

3. Teste a conexão:
```bash
psql -U seu_usuario -d ecommerce -h localhost
```

### Erro: "Port 3000 is already in use"

```bash
# Encontre o processo usando a porta 3000
lsof -i :3000

# Mate o processo
kill -9 <PID>

# Ou use uma porta diferente
npm run dev -- -p 3001
```

### Erro de Build

```bash
# Limpe o cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

## 📱 Funcionalidades Disponíveis

### ✅ Implementadas
- 🏠 Página inicial com hero section
- 🧭 Navegação responsiva
- 🛒 Sistema de carrinho funcional
- 📱 Design mobile-first
- 🎨 Animações suaves
- 📧 Newsletter funcional
- ⭐ Sistema de depoimentos
- 🏷️ Categorias e produtos

### 🚧 Em Desenvolvimento
- 🔐 Sistema de autenticação
- 💳 Checkout e pagamentos
- 📊 Painel administrativo
- 🚚 Sistema de envio
- 📈 Analytics e métricas

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Faça upload da pasta .next
```

### Outras Opções
- **Railway**: Conecte seu repositório
- **DigitalOcean**: App Platform
- **Heroku**: Container deployment

## 📚 Próximos Passos

1. **Configure autenticação** com NextAuth.js
2. **Integre pagamentos** com Stripe
3. **Implemente checkout** completo
4. **Adicione painel admin** para gestão
5. **Configure analytics** (Google Analytics, Hotjar)

## 🤝 Suporte

- 📖 **Documentação**: `/docs` neste repositório
- 🐛 **Issues**: GitHub Issues para bugs
- 💬 **Discussions**: GitHub Discussions para dúvidas
- 📧 **Email**: suporte@seudominio.com

## 🎯 Dicas Importantes

- **Teste em diferentes dispositivos** regularmente
- **Mantenha o banco atualizado** com as migrações
- **Use commits semânticos** para melhor organização
- **Documente mudanças** importantes
- **Faça backup** do banco regularmente

---

**🎉 Parabéns! Você configurou com sucesso o E-commerce Top. Agora é hora de personalizar e expandir as funcionalidades!**


