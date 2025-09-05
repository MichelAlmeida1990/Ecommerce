# 🚀 Guia de Deploy para Vercel

Este guia explica como fazer o deploy do E-commerce Top na Vercel.

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Projeto no GitHub
- Node.js 18+ instalado localmente

## 🔧 Configuração do Projeto

### 1. Variáveis de Ambiente

Crie as seguintes variáveis de ambiente na Vercel:

```bash
# Database (opcional - se usar Prisma)
DATABASE_URL="postgresql://username:password@host:5432/database"

# NextAuth (opcional - se usar autenticação)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Stripe (opcional - para pagamentos)
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 2. Configurações de Build

O projeto já está configurado com:
- ✅ `vercel.json` - Configurações específicas da Vercel
- ✅ `next.config.js` - Otimizações para produção
- ✅ `.vercelignore` - Arquivos ignorados no deploy

## 🚀 Deploy via Dashboard da Vercel

### Método 1: Importar do GitHub

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte sua conta do GitHub
4. Selecione o repositório `Ecommerce`
5. Configure as variáveis de ambiente
6. Clique em "Deploy"

### Método 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## ⚙️ Configurações Recomendadas

### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables
Configure as seguintes variáveis no dashboard da Vercel:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `NODE_ENV` | `production` | Ambiente de produção |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | URL da aplicação |

## 🔍 Verificações Pós-Deploy

Após o deploy, verifique:

- ✅ Site carrega corretamente
- ✅ Imagens são otimizadas
- ✅ Animações funcionam
- ✅ Responsividade em mobile
- ✅ Performance no Lighthouse
- ✅ SEO básico

## 📊 Monitoramento

### Analytics
- Configure Google Analytics se necessário
- Monitore performance na Vercel Analytics

### Logs
- Acesse logs em: `vercel.com/dashboard/project/logs`

## 🛠️ Troubleshooting

### Problemas Comuns

**Build falha:**
```bash
# Verificar logs de build
vercel logs

# Build local para testar
npm run build
```

**Imagens não carregam:**
- Verificar domínios em `next.config.js`
- Configurar CDN se necessário

**Performance lenta:**
- Verificar otimizações de imagem
- Usar Vercel Edge Functions se necessário

## 🔄 Deploy Contínuo

O projeto está configurado para deploy automático:
- Push para `main` → Deploy automático
- Pull Requests → Preview deployments

## 📈 Otimizações de Performance

### Já Implementadas:
- ✅ Compressão gzip
- ✅ Otimização de imagens (WebP/AVIF)
- ✅ Minificação de CSS/JS
- ✅ Headers de cache
- ✅ Lazy loading de componentes

### Recomendações Adicionais:
- Use Vercel Edge Functions para APIs
- Configure CDN para assets estáticos
- Implemente Service Workers para cache

## 🎯 Domínio Customizado

Para usar domínio próprio:

1. Vá em Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Aguarde propagação (até 24h)

## 📞 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**🎉 Seu e-commerce estará online em minutos!**
