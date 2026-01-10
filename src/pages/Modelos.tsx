import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  Users,
  Shield,
  Handshake,
  Building2,
  Search,
  Eye,
  ArrowRight,
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
    icon: Briefcase,
    title: "Contrato de Prestação de Serviços",
    description:
      "Ideal para formalizar a prestação de serviços entre empresas ou profissionais autônomos.",
    category: "Serviços",
    time: "3 min",
    popular: true,
    preview: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATANTE: [Nome da Empresa/Pessoa]
CONTRATADO: [Nome do Prestador]

CLÁUSULA PRIMEIRA - DO OBJETO
O presente contrato tem por objeto a prestação de serviços de [descrição dos serviços].

CLÁUSULA SEGUNDA - DO PRAZO
O prazo de vigência deste contrato será de [período], iniciando em [data] e terminando em [data].

CLÁUSULA TERCEIRA - DO VALOR
Pelos serviços prestados, o CONTRATANTE pagará ao CONTRATADO o valor de R$ [valor].

CLÁUSULA QUARTA - DAS OBRIGAÇÕES
4.1 - O CONTRATADO obriga-se a:
a) Executar os serviços com qualidade e dentro do prazo acordado;
b) Manter sigilo sobre informações confidenciais.

4.2 - O CONTRATANTE obriga-se a:
a) Efetuar o pagamento nas datas acordadas;
b) Fornecer as informações necessárias para execução dos serviços.`,
  },
  {
    id: 2,
    icon: Users,
    title: "Contrato de Freelancer",
    description:
      "Modelo específico para contratação de profissionais freelancers em projetos pontuais.",
    category: "Trabalho",
    time: "4 min",
    popular: true,
    preview: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS FREELANCER

CONTRATANTE: [Nome da Empresa]
FREELANCER: [Nome Completo]

1. OBJETO
Prestação de serviços de [tipo de serviço] conforme escopo definido.

2. ESCOPO DO PROJETO
[Descrição detalhada das atividades e entregáveis]

3. REMUNERAÇÃO
Valor total: R$ [valor]
Forma de pagamento: [condições]

4. PRAZO
Início: [data]
Conclusão: [data]

5. PROPRIEDADE INTELECTUAL
Todo trabalho desenvolvido será de propriedade exclusiva do CONTRATANTE.`,
  },
  {
    id: 3,
    icon: Building2,
    title: "Contrato Social",
    description:
      "Documento essencial para constituição de sociedades empresárias limitadas.",
    category: "Societário",
    time: "8 min",
    popular: false,
    preview: `CONTRATO SOCIAL

SÓCIOS:
1. [Nome], [nacionalidade], [estado civil], [profissão], CPF [número]
2. [Nome], [nacionalidade], [estado civil], [profissão], CPF [número]

CLÁUSULA 1ª - DENOMINAÇÃO SOCIAL
A sociedade girará sob a denominação de [Nome da Empresa] LTDA.

CLÁUSULA 2ª - SEDE E FORO
A sede social será na [endereço completo].

CLÁUSULA 3ª - OBJETO SOCIAL
A sociedade tem por objeto: [atividades da empresa]

CLÁUSULA 4ª - CAPITAL SOCIAL
O capital social é de R$ [valor], dividido em [número] quotas.`,
  },
  {
    id: 4,
    icon: Shield,
    title: "NDA / Confidencialidade",
    description:
      "Acordo de confidencialidade para proteção de informações sigilosas.",
    category: "Proteção",
    time: "2 min",
    popular: true,
    preview: `ACORDO DE CONFIDENCIALIDADE (NDA)

PARTE DIVULGADORA: [Nome/Empresa]
PARTE RECEPTORA: [Nome/Empresa]

1. DEFINIÇÃO DE INFORMAÇÃO CONFIDENCIAL
Considera-se "Informação Confidencial" toda e qualquer informação divulgada por uma parte à outra.

2. OBRIGAÇÕES DA PARTE RECEPTORA
a) Manter sigilo absoluto sobre as Informações Confidenciais;
b) Utilizar as informações apenas para os fins acordados;
c) Não divulgar a terceiros sem autorização prévia.

3. PRAZO DE CONFIDENCIALIDADE
O presente acordo vigorará pelo prazo de [período] anos.

4. PENALIDADES
O descumprimento ensejará multa de R$ [valor].`,
  },
  {
    id: 5,
    icon: Handshake,
    title: "Contrato de Parceria",
    description:
      "Formalize parcerias comerciais estratégicas com termos claros e definidos.",
    category: "Parcerias",
    time: "5 min",
    popular: false,
    preview: `CONTRATO DE PARCERIA COMERCIAL

PARCEIRO A: [Nome/Empresa]
PARCEIRO B: [Nome/Empresa]

CLÁUSULA 1ª - OBJETO
Estabelecer parceria comercial para [objetivo da parceria].

CLÁUSULA 2ª - RESPONSABILIDADES
2.1 - PARCEIRO A compromete-se a: [responsabilidades]
2.2 - PARCEIRO B compromete-se a: [responsabilidades]

CLÁUSULA 3ª - DIVISÃO DE RESULTADOS
Os resultados serão divididos na proporção de [%] para cada parte.

CLÁUSULA 4ª - PRAZO
A parceria terá duração de [período], podendo ser renovada.`,
  },
  {
    id: 6,
    icon: FileText,
    title: "Contrato de Licenciamento",
    description:
      "Licencie software, marcas ou propriedade intelectual com segurança jurídica.",
    category: "Propriedade",
    time: "6 min",
    popular: false,
    preview: `CONTRATO DE LICENCIAMENTO DE SOFTWARE

LICENCIANTE: [Nome/Empresa]
LICENCIADO: [Nome/Empresa]

1. OBJETO
Licenciamento de uso do software "[nome do software]".

2. MODALIDADE DA LICENÇA
[  ] Uso individual
[  ] Uso corporativo
[  ] Uso ilimitado

3. VALOR E PAGAMENTO
Valor da licença: R$ [valor] / [período]

4. RESTRIÇÕES
O LICENCIADO não poderá:
a) Sublicenciar o software;
b) Fazer engenharia reversa;
c) Utilizar para fins não autorizados.`,
  },
];

const categories = ["Todos", "Serviços", "Trabalho", "Societário", "Proteção", "Parcerias", "Propriedade"];

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
              Modelos de <span className="text-accent">Contratos</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Escolha entre diversos modelos prontos e personalize conforme sua
              necessidade. Todos revisados por advogados.
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
