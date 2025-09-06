# 🚀 Guia de Configuração Completa - E-commerce Top

Este guia te ajudará a configurar o projeto para rodar **100% GRATUITO** com Firebase e deploy no Vercel.

## 📋 Pré-requisitos

- Conta no Google (para Firebase e Google Cloud)
- Conta no Vercel (gratuita)
- Node.js 18+ instalado
- Git instalado

## 🔥 Passo 1: Configurar Firebase

### 1.1 Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Nome do projeto: `ecommerce-top` (ou o que preferir)
4. Desabilite Google Analytics (para manter gratuito)
5. Clique em "Criar projeto"

### 1.2 Configurar Authentication

1. No painel do Firebase, vá em "Authentication"
2. Clique em "Começar"
3. Vá na aba "Sign-in method"
4. Habilite "Email/Password"
5. Habilite "Google" e configure:
   - Nome do projeto: `E-commerce Top`
   - Email de suporte: `seu-email@gmail.com`
   - Domínios autorizados: `localhost` e seu domínio do Vercel

### 1.3 Configurar Firestore Database

1. Vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (gratuito)
4. Escolha a localização mais próxima (ex: `southamerica-east1`)

### 1.4 Obter Configurações do Firebase

1. Vá em "Configurações do projeto" (ícone de engrenagem)
2. Role para baixo até "Seus aplicativos"
3. Clique em "Adicionar app" > "Web" (ícone `</>`)
4. Nome do app: `ecommerce-top-web`
5. **NÃO** marque "Também configurar o Firebase Hosting"
6. Clique em "Registrar app"
7. Copie as configurações que aparecem

## 🌐 Passo 2: Configurar Google Cloud Console

### 2.1 Configurar OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione o projeto criado no Firebase
3. Vá em "APIs e serviços" > "Credenciais"
4. Clique em "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Tipo de aplicativo: "Aplicativo da Web"
6. Nome: `E-commerce Top Web`
7. URIs de redirecionamento autorizados:
   - `http://localhost:3002`
   - `https://seu-projeto.vercel.app`
8. Clique em "Criar"
9. Copie o "ID do cliente"

## 🚀 Passo 3: Deploy no Vercel

### 3.1 Preparar o Projeto

1. Faça push do código para o GitHub:
```bash
git add .
git commit -m "Configuração Firebase e deploy"
git push origin main
```

### 3.2 Deploy no Vercel

1. Acesse [Vercel](https://vercel.com/)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Clique em "Deploy"

### 3.3 Configurar Variáveis de Ambiente no Vercel

1. No painel do Vercel, vá em "Settings" > "Environment Variables"
2. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=seu_measurement_id
NEXT_PUBLIC_SITE_URL=https://seu-projeto.vercel.app
NEXT_PUBLIC_SITE_NAME=E-commerce Top
```

3. Clique em "Save"
4. Vá em "Deployments" e clique nos 3 pontos do último deploy
5. Clique em "Redeploy" para aplicar as variáveis

## 🔧 Passo 4: Configuração Local

### 4.1 Instalar Dependências

```bash
npm install
```

### 4.2 Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp env.example .env.local
```

2. Edite o arquivo `.env.local` com suas configurações do Firebase

### 4.3 Executar Localmente

```bash
npm run dev
```

## 🔒 Passo 5: Configurar Regras de Segurança do Firestore

1. No Firebase Console, vá em "Firestore Database" > "Regras"
2. Substitua as regras por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Produtos são públicos para leitura
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Pedidos são privados para cada usuário
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

3. Clique em "Publicar"

## 📊 Passo 6: Configurar Storage (Opcional)

1. No Firebase Console, vá em "Storage"
2. Clique em "Começar"
3. Escolha "Iniciar no modo de teste"
4. Escolha a localização mais próxima

## 🎯 Passo 7: Testar a Aplicação

### 7.1 Teste Local

1. Execute `npm run dev`
2. Acesse `http://localhost:3002`
3. Teste o cadastro e login
4. Teste o login com Google

### 7.2 Teste em Produção

1. Acesse sua URL do Vercel
2. Teste todas as funcionalidades
3. Verifique se os dados estão sendo salvos no Firestore

## 💰 Limites Gratuitos

### Firebase (Plano Spark - Gratuito)
- **Authentication**: Ilimitado
- **Firestore**: 1GB de armazenamento, 50K leituras/dia, 20K escritas/dia
- **Storage**: 5GB de armazenamento, 1GB/dia de download
- **Hosting**: 10GB de armazenamento, 10GB/mês de transferência

### Vercel (Plano Hobby - Gratuito)
- **Deploy**: Ilimitado
- **Bandwidth**: 100GB/mês
- **Build time**: 6000 minutos/mês
- **Domínios**: Domínios personalizados

## 🚨 Troubleshooting

### Erro de CORS
- Verifique se o domínio está configurado no Firebase Auth
- Adicione `localhost` e seu domínio do Vercel

### Erro de Permissão no Firestore
- Verifique as regras de segurança
- Certifique-se de que o usuário está autenticado

### Erro de Configuração do Google OAuth
- Verifique se o Client ID está correto
- Verifique se os domínios estão autorizados

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do Vercel
2. Verifique o console do navegador
3. Verifique o Firebase Console
4. Consulte a documentação oficial:
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Next.js Docs](https://nextjs.org/docs)

## 🎉 Pronto!

Seu e-commerce está rodando 100% gratuito com:
- ✅ Firebase Authentication (Google + Email/Password)
- ✅ Firestore Database
- ✅ Deploy no Vercel
- ✅ Domínio personalizado (opcional)
- ✅ SSL automático
- ✅ CDN global

**Custo total: R$ 0,00** 🎊
