import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Search,
  Eye,
  ArrowRight,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const contracts = [
  {
    id: 1,
    icon: FileText,
    title: "Termos de Uso",
    description:
      "Documento essencial que estabelece as regras e condições para uso de sua plataforma, aplicativo ou website.",
    category: "Startups",
    time: "5 min",
    popular: true,
    price: 29,
    preview: `TERMOS DE USO

Última atualização: [Data]

1. ACEITAÇÃO DOS TERMOS
Ao acessar e usar [Nome da Plataforma], você concorda com estes Termos de Uso e todas as leis e regulamentos aplicáveis.

2. DESCRIÇÃO DO SERVIÇO
[Nome da Plataforma] é uma plataforma/serviço que oferece [descrição dos serviços].

3. CADASTRO E CONTA DE ACESSO
3.1. Para utilizar determinadas funcionalidades, é necessário realizar cadastro.
3.2. Você é responsável por manter a confidencialidade de sua senha.
3.3. Você deve fornecer informações precisas, atuais e completas.
3.4. Você deve ter pelo menos 18 anos para usar este serviço.

4. USO ACEITÁVEL
Você concorda em NÃO:
a) Violar qualquer lei ou regulamento;
b) Transmitir conteúdo ilegal, ameaçador, abusivo ou difamatório;
c) Tentar obter acesso não autorizado ao sistema;
d) Usar o serviço para fins comerciais não autorizados;
e) Fazer engenharia reversa ou tentar extrair código-fonte.

5. PROPRIEDADE INTELECTUAL
5.1. Todo o conteúdo da plataforma (textos, gráficos, logos, imagens, software) é propriedade de [Nome da Empresa] ou de seus licenciadores.
5.2. É concedida uma licença limitada, não exclusiva e intransferível para uso pessoal.

6. CONTEÚDO DO USUÁRIO
6.1. Você mantém a propriedade do conteúdo que enviar.
6.2. Ao enviar conteúdo, você concede uma licença mundial, não exclusiva para usar, reproduzir e exibir esse conteúdo.

7. PRIVACIDADE E PROTEÇÃO DE DADOS
7.1. O uso de informações pessoais é regido por nossa Política de Privacidade.
7.2. Cumprimos a Lei Geral de Proteção de Dados (LGPD).

8. ISENÇÃO DE GARANTIAS
8.1. O serviço é fornecido "no estado em que se encontra".
8.2. Não garantimos que o serviço será ininterrupto ou livre de erros.

9. LIMITAÇÃO DE RESPONSABILIDADE
[Nome da Empresa] não será responsável por:
a) Danos indiretos, incidentais ou consequenciais;
b) Perda de lucros, dados ou uso;
c) Interrupção de negócios.

10. MODIFICAÇÕES DO SERVIÇO
Reservamo-nos o direito de modificar ou descontinuar o serviço a qualquer momento, com ou sem aviso prévio.

11. RESCISÃO
11.1. Podemos suspender ou encerrar sua conta por violação destes termos.
11.2. Você pode cancelar sua conta a qualquer momento.

12. ALTERAÇÕES DOS TERMOS
12.1. Podemos atualizar estes Termos periodicamente.
12.2. Mudanças significativas serão notificadas por email ou na plataforma.
12.3. O uso continuado após mudanças constitui aceitação dos novos termos.

13. LEI APLICÁVEL E FORO
13.1. Estes Termos são regidos pelas leis do Brasil.
13.2. Foro: [Cidade/Estado].

14. CONTATO
Para questões sobre estes Termos:
Email: [contato@empresa.com]
Endereço: [Endereço completo]

15. DISPOSIÇÕES GERAIS
15.1. Se qualquer disposição for considerada inválida, as demais permanecem em vigor.
15.2. A falha em exercer qualquer direito não constitui renúncia.`,
  },
  {
    id: 2,
    icon: Shield,
    title: "Política de Privacidade",
    description:
      "Informe seus usuários sobre como os dados pessoais são coletados, utilizados e protegidos, em conformidade com a LGPD.",
    category: "Startups",
    time: "5 min",
    popular: true,
    price: 29,
    preview: `POLÍTICA DE PRIVACIDADE

Última atualização: [Data]

1. INTRODUÇÃO
A [Nome da Empresa] ("nós", "nosso", "empresa") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política explica como coletamos, usamos, armazenamos e protegemos suas informações.

2. DEFINIÇÕES (LGPD)
- Dados Pessoais: informações relacionadas a pessoa natural identificada ou identificável
- Titular: pessoa natural a quem se referem os dados pessoais
- Controlador: [Nome da Empresa]
- Tratamento: operação realizada com dados pessoais

3. DADOS QUE COLETAMOS
3.1. Dados fornecidos por você:
- Nome completo
- Endereço de email
- Telefone
- CPF/CNPJ
- Dados de pagamento
- [Outros dados específicos]

3.2. Dados coletados automaticamente:
- Endereço IP
- Tipo de navegador
- Páginas visitadas
- Tempo de permanência
- Dados de localização (se autorizado)
- Cookies e tecnologias similares

4. COMO USAMOS SEUS DADOS
Utilizamos seus dados pessoais para:
a) Fornecer e melhorar nossos serviços
b) Processar transações e pagamentos
c) Enviar comunicações sobre sua conta
d) Personalizar sua experiência
e) Cumprir obrigações legais
f) Prevenir fraudes e garantir segurança
g) Realizar análises e pesquisas
h) Enviar marketing (com seu consentimento)

5. BASE LEGAL PARA PROCESSAMENTO (LGPD)
Processamos seus dados com base em:
a) Consentimento do titular
b) Execução de contrato
c) Obrigação legal ou regulatória
d) Legítimo interesse
e) Proteção da vida ou incolumidade física
f) Exercício regular de direitos

6. COMPARTILHAMENTO DE DADOS
6.1. Não vendemos seus dados pessoais.
6.2. Podemos compartilhar com:
- Provedores de serviços (hospedagem, pagamento, analytics)
- Parceiros de negócios autorizados
- Autoridades legais quando exigido por lei
- Em caso de fusão, aquisição ou venda de ativos

7. COOKIES E TECNOLOGIAS DE RASTREAMENTO
7.1. Usamos cookies para:
- Manter você conectado
- Lembrar preferências
- Entender como você usa nosso serviço
- Exibir anúncios relevantes

7.2. Você pode gerenciar cookies através das configurações do navegador.

8. RETENÇÃO DE DADOS
8.1. Mantemos seus dados pelo tempo necessário para:
- Cumprir os fins descritos nesta Política
- Atender requisitos legais
- Resolver disputas

8.2. Após esse período, os dados serão excluídos ou anonimizados.

9. SEUS DIREITOS (LGPD)
Você tem direito a:
a) Confirmar a existência de tratamento
b) Acessar seus dados
c) Corrigir dados incompletos, inexatos ou desatualizados
d) Solicitar anonimização, bloqueio ou eliminação
e) Solicitar portabilidade
f) Revogar consentimento
g) Informar-se sobre compartilhamento
h) Solicitar revisão de decisões automatizadas

Para exercer seus direitos: [email@empresa.com]

10. SEGURANÇA
10.1. Implementamos medidas técnicas e organizacionais:
- Criptografia de dados
- Controles de acesso
- Monitoramento de segurança
- Treinamento de equipe

10.2. Nenhum método de transmissão é 100% seguro.

11. TRANSFERÊNCIA INTERNACIONAL
11.1. Seus dados podem ser transferidos para servidores fora do Brasil.
11.2. Garantimos proteção adequada conforme LGPD.

12. DADOS DE MENORES
12.1. Não coletamos intencionalmente dados de menores de 18 anos.
12.2. Se descobrirmos que um menor forneceu dados, excluiremos imediatamente.

13. ALTERAÇÕES DESTA POLÍTICA
13.1. Podemos atualizar esta Política periodicamente.
13.2. Notificaremos sobre mudanças significativas.
13.3. A data de "Última atualização" será modificada.

14. ENCARREGADO DE DADOS (DPO)
Nome: [Nome do DPO]
Email: [dpo@empresa.com]
Telefone: [Telefone]

15. CONTATO
Para questões sobre privacidade:
Email: [privacidade@empresa.com]
Endereço: [Endereço completo]

16. AUTORIDADE DE FISCALIZAÇÃO
Você pode contatar a Autoridade Nacional de Proteção de Dados (ANPD):
Website: www.gov.br/anpd

17. CONSENTIMENTO
Ao usar nossos serviços, você consente com esta Política de Privacidade.`,
  },
];

const categories = ["Todos", "Startups"];

const Modelos = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "Todos" || contract.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Documentos <span className="text-accent">Essenciais</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comece com os documentos fundamentais para sua startup: Termos de Uso e Política de Privacidade em conformidade com a LGPD.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar modelos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Contracts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract, index) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                {contract.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <contract.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {contract.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {contract.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-accent">R$ {contract.price}</span>
                      <span className="text-sm text-muted-foreground">/documento</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      ~{contract.time} para preencher
                    </span>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <contract.icon className="w-5 h-5 text-accent" />
                              {contract.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 p-4 bg-muted rounded-lg">
                            <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                              {contract.preview}
                            </pre>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="hero" asChild>
                              <Link to="/auth?mode=signup">
                                Usar este modelo
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="accent" size="sm" asChild>
                        <Link to="/auth?mode=signup">Usar</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum modelo encontrado para sua busca.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Modelos;
