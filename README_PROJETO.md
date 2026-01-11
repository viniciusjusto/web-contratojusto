# ContratoJusto - SaaS de Geração de Documentos Jurídicos

ContratoJusto é uma plataforma **SaaS (Software as a Service)** que automatiza a criação de documentos jurídicos em conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018) para empresas brasileiras.

## 🎯 Modelo de Negócio: SaaS

Este projeto é um **Software as a Service** porque:
- Oferece software centralizado acessível via web
- Modelo de receita por assinatura (R$59/mês) e pay-per-use (R$29/documento)
- Os usuários não transacionam entre si (não é marketplace)
- A plataforma fornece o serviço diretamente aos clientes finais
- Infraestrutura hospedada na nuvem

## 📋 Documentos Disponíveis

- **Termos de Uso**: Documento completo com todas as cláusulas necessárias
- **Política de Privacidade**: Em conformidade com LGPD

## 💰 Planos e Preços

### Plano Gratuito
- Acesso à plataforma
- Visualização de modelos

### Plano Start - R$59/mês
- Geração ilimitada de documentos
- Download em PDF e Word
- Suporte por email
- Documentos em conformidade com LGPD

### Pay-per-use
- R$29 por documento gerado
- Sem compromisso mensal

## 🚀 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + Radix UI (shadcn/ui)
- **Autenticação**: Supabase Auth
- **Banco de Dados**: Supabase (PostgreSQL)
- **Pagamentos**: PagarMe (PIX e Cartão de Crédito)
- **Geração de Documentos**: 
  - PDF: jsPDF
  - Word: docx.js
- **Animações**: Framer Motion

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
# Adicione suas credenciais do Supabase e PagarMe

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## ⚙️ Configuração

### Supabase

1. Crie uma conta em [https://supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a URL e a chave pública (anon key)
4. Configure no arquivo `.env`:

```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

### PagarMe

1. Crie uma conta em [https://pagar.me](https://pagar.me)
2. Acesse o dashboard e gere suas chaves de API
3. Configure no arquivo `.env`:

```env
VITE_PAGARME_API_KEY=sua_api_key_aqui
VITE_PAGARME_PUBLIC_KEY=sua_public_key_aqui
VITE_PAGARME_ACCOUNT_ID=seu_account_id_aqui
VITE_PAGARME_ENVIRONMENT=prod
```

## 📱 Funcionalidades

### Para Usuários

- ✅ Cadastro e login com email/senha
- ✅ Recuperação de senha
- ✅ Seleção de tipo de documento
- ✅ Formulário inteligente em 4 etapas
- ✅ Validação e formatação automática (CPF/CNPJ, telefone, CEP)
- ✅ Geração de documentos personalizados
- ✅ **Download em PDF e Word**
- ✅ Pagamento via PIX ou Cartão de Crédito
- ✅ Dashboard com histórico de contratos

### Fluxo de Criação de Documentos

1. **Passo 1 - Identificação**: Tipo de pessoa (PF/PJ), nome, CPF/CNPJ, descrição do serviço
2. **Passo 2 - Contato**: Email, telefone, site, endereço completo, email do DPO
3. **Passo 3 - Detalhes**:
   - Termos de Uso: Funcionalidades (cookies, pagamentos, login social, analytics, conteúdo de usuários)
   - Política de Privacidade: Tipos de dados coletados, período de retenção, transferência internacional
4. **Passo 4 - Revisão**: Confirmação de todos os dados antes da geração

### Após Geração

- Modal com preview do conteúdo
- Botões para download em **PDF** (formato universal)
- Botões para download em **Word** (formato editável)
- Informação sobre conformidade com LGPD
- Redirecionamento para dashboard

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx  # Contexto de autenticação
├── hooks/               # Custom React hooks
├── lib/
│   ├── supabase.ts      # Cliente Supabase
│   ├── pagarme.ts       # Cliente PagarMe
│   ├── documentGenerator.ts # Geração de documentos PDF/Word
│   └── utils.ts         # Funções utilitárias
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── Modelos.tsx      # Página de modelos
│   ├── Precos.tsx       # Página de preços
│   ├── Auth.tsx         # Login/Cadastro
│   ├── ForgotPassword.tsx
│   ├── ResetPassword.tsx
│   ├── Dashboard.tsx    # Área logada
│   ├── CreateDocument.tsx # Wizard de criação
│   └── Checkout.tsx     # Pagamento
└── App.tsx              # Rotas e configuração
```

## 🔒 Segurança e Conformidade

- ✅ Autenticação segura via Supabase
- ✅ Documentos em conformidade com LGPD
- ✅ Criptografia de dados sensíveis
- ✅ Validação de formulários
- ✅ Proteção contra XSS e CSRF
- ✅ Variáveis de ambiente para credenciais

## 📄 Licença

Este projeto é proprietário e confidencial.

## 🤝 Contato

Para dúvidas ou suporte, entre em contato através do email: contato@contratojusto.com.br

---

**ContratoJusto** - Documentos jurídicos simples, rápidos e em conformidade com a lei.
