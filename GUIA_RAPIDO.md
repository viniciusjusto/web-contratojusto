# 🚀 Guia Rápido - ContratoJusto

## Análise do Modelo de Negócio

### ✅ Tipo: SaaS (Software as a Service)

**Por que é um SaaS?**
- Software centralizado na nuvem
- Acesso via navegador web
- Modelo de receita recorrente (assinatura mensal)
- Plataforma fornece o serviço diretamente aos usuários
- Sem intermediação entre compradores/vendedores

**Por que NÃO é um Marketplace?**
- Não há vendedores e compradores na plataforma
- Não há comissões sobre transações entre usuários
- Não há listagens de produtos de terceiros
- O serviço é fornecido diretamente pela plataforma

---

## 📥 Download de Documentos - NOVO!

Após gerar um documento, você terá acesso a um modal com:

### Opções de Download

1. **PDF (Formato Universal)**
   - Ideal para compartilhamento
   - Não pode ser editado
   - Visualização consistente em qualquer dispositivo
   - Assinatura digital compatível

2. **Word (Formato Editável)**
   - Permite edição posterior
   - Personalizações adicionais
   - Formatação mantida
   - Ideal para ajustes finais

### Como Funciona

1. Preencha o formulário de criação em 4 passos
2. Clique em "Gerar documento"
3. Aguarde a geração (1-2 segundos)
4. Modal aparecerá com preview do conteúdo
5. Escolha PDF ou Word para download
6. O arquivo será baixado automaticamente

---

## 🎯 Fluxo Completo do Usuário

### 1. Cadastro
- Acesse `/auth?mode=signup`
- Preencha email e senha
- Confirme email (Supabase)

### 2. Escolha do Documento
- Acesse "Modelos"
- Escolha entre:
  - Termos de Uso (R$29)
  - Política de Privacidade (R$29)

### 3. Preenchimento do Formulário

**Passo 1 - Identificação**
- Tipo: Pessoa Física ou Jurídica
- Nome/Razão Social
- CPF/CNPJ (formatação automática)
- Descrição do serviço

**Passo 2 - Contato**
- Email (pré-preenchido)
- Telefone (formatação automática)
- Website
- Endereço completo
- Email do DPO (Encarregado de Dados)

**Passo 3 - Detalhes Específicos**

Para Termos de Uso:
- ☑️ Uso de cookies
- ☑️ Processamento de pagamentos
- ☑️ Login com redes sociais
- ☑️ Analytics
- ☑️ Conteúdo de usuários

Para Política de Privacidade:
- ☑️ Tipos de dados coletados
- ☑️ Período de retenção
- ☑️ Transferência internacional

**Passo 4 - Revisão**
- Confirme todos os dados
- Visualize resumo
- Gere o documento

### 4. Download
- **Baixe em PDF**: Clique no botão PDF
- **Baixe em Word**: Clique no botão Word
- Vá para "Meus Contratos"

### 5. Pagamento (Opcional)
- Assine o Plano Start (R$59/mês)
- Geração ilimitada
- Pagamento via PIX ou Cartão

---

## 📊 Planos Disponíveis

| Recurso | Gratuito | Pay-per-use | Start (R$59/mês) |
|---------|----------|-------------|------------------|
| Acesso à plataforma | ✅ | ✅ | ✅ |
| Visualizar modelos | ✅ | ✅ | ✅ |
| Gerar documentos | ❌ | ✅ R$29/doc | ✅ Ilimitado |
| Download PDF | ❌ | ✅ | ✅ |
| Download Word | ❌ | ✅ | ✅ |
| Suporte | ❌ | ❌ | ✅ |

---

## 🔐 Segurança e LGPD

### Conformidade
- ✅ Documentos seguem LGPD (Lei 13.709/2018)
- ✅ Cláusulas atualizadas
- ✅ Direitos dos titulares incluídos
- ✅ Informações sobre DPO obrigatórias

### Dados Coletados
- Email e senha (Supabase Auth)
- Informações da empresa/pessoa
- Dados para geração de documentos
- Histórico de documentos criados

### Armazenamento
- Autenticação: Supabase (criptografado)
- Documentos: Gerados sob demanda
- Pagamentos: PagarMe (PCI-DSS compliant)

---

## 🛠️ Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Executar
npm run dev

# 4. Acessar
# http://localhost:5173
```

---

## 📝 Documentos Gerados - Conteúdo

### Termos de Uso Incluem:
1. Informações Gerais
2. Objeto
3. Cadastro e Conta de Acesso
4. Obrigações do Usuário
5. Serviços Oferecidos
6. Pagamentos e Assinaturas
7. Propriedade Intelectual
8. Privacidade e Proteção de Dados
9. Modificações dos Termos
10. Rescisão
11. Limitação de Responsabilidade
12. Disposições Gerais
13. Lei Aplicável e Foro
14. Contato

### Política de Privacidade Inclui:
1. Informações Gerais
2. Definições (Controlador, Titular, DPO, etc.)
3. Dados Coletados (personalizados)
4. Finalidade do Tratamento
5. Base Legal para o Tratamento
6. Compartilhamento de Dados
7. Armazenamento e Segurança
8. Retenção de Dados
9. Direitos do Titular (acesso, correção, exclusão, etc.)
10. Cookies e Tecnologias Similares
11. Transferência Internacional de Dados
12. Menores de Idade
13. Alterações na Política
14. Encarregado de Dados (DPO)
15. ANPD (Autoridade Nacional)
16. Contato
17. Lei Aplicável

---

## 🎨 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Estilização**: Tailwind CSS
- **Componentes**: Radix UI (shadcn/ui)
- **Roteamento**: React Router v6
- **Animações**: Framer Motion
- **Autenticação**: Supabase Auth
- **Banco**: Supabase (PostgreSQL)
- **Pagamentos**: PagarMe API
- **Geração PDF**: jsPDF
- **Geração Word**: docx.js
- **Download**: file-saver

---

## ✨ Próximas Funcionalidades

- [ ] Salvar documentos no banco de dados
- [ ] Editar documentos após geração
- [ ] Compartilhar documentos por link
- [ ] Histórico de versões
- [ ] Templates personalizados
- [ ] Mais tipos de documentos (NDA, Contrato de Prestação, etc.)
- [ ] Assinatura digital integrada
- [ ] API para integração
- [ ] WhatsApp notifications

---

## 📞 Suporte

Para dúvidas ou problemas:
- Email: contato@contratojusto.com.br
- Documentação: README_PROJETO.md

---

**ContratoJusto** - Geração de documentos jurídicos em conformidade com LGPD, rápido e fácil! 🚀
