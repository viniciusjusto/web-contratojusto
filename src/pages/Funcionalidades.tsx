import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Wand2,
  Save,
  Download,
  History,
  LayoutDashboard,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const mainFeatures = [
  {
    icon: Wand2,
    title: "Geração Guiada",
    description:
      "Crie contratos de forma intuitiva com um formulário passo a passo que guia você por todas as cláusulas necessárias.",
    highlights: [
      "Perguntas simples e objetivas",
      "Validação automática de dados",
      "Sugestões inteligentes",
    ],
  },
  {
    icon: FileText,
    title: "Personalização de Cláusulas",
    description:
      "Edite e personalize cada cláusula do contrato para atender às necessidades específicas do seu negócio.",
    highlights: [
      "Editor visual intuitivo",
      "Cláusulas opcionais",
      "Texto livre quando necessário",
    ],
  },
  {
    icon: Save,
    title: "Salvamento Automático",
    description:
      "Nunca perca seu progresso. Seus contratos são salvos automaticamente a cada alteração.",
    highlights: [
      "Sincronização em tempo real",
      "Recuperação de rascunhos",
      "Acesso de qualquer dispositivo",
    ],
  },
  {
    icon: Download,
    title: "Exportação Flexível",
    description:
      "Exporte seus contratos finalizados nos formatos mais utilizados do mercado.",
    highlights: [
      "PDF profissional",
      "DOCX editável",
      "Formatação preservada",
    ],
  },
  {
    icon: History,
    title: "Histórico e Versionamento",
    description:
      "Acompanhe todas as alterações feitas em seus contratos e restaure versões anteriores quando necessário.",
    highlights: [
      "Histórico completo de edições",
      "Comparação entre versões",
      "Restauração com um clique",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Gestão Centralizada",
    description:
      "Organize todos os seus contratos em um único lugar com filtros, busca e categorização.",
    highlights: [
      "Dashboard intuitivo",
      "Status de cada contrato",
      "Busca avançada",
    ],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Economia de Tempo",
    description: "Reduza em até 90% o tempo gasto na criação de contratos.",
  },
  {
    icon: Shield,
    title: "Segurança Jurídica",
    description: "Modelos revisados e atualizados por advogados especializados.",
  },
  {
    icon: Save,
    title: "Redução de Custos",
    description: "Elimine a necessidade de contratar advogados para contratos simples.",
  },
];

const Funcionalidades = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Funcionalidades que{" "}
              <span className="text-accent">simplificam</span> sua vida
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Conheça todas as ferramentas disponíveis para criar, gerenciar e
              personalizar seus contratos de forma profissional.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-5">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher o{" "}
              <span className="text-accent">Contrato Justo</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-hero text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Experimente todas as funcionalidades gratuitamente. Crie sua conta
            agora e faça seu primeiro contrato.
          </p>
          <Button
            size="xl"
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-glow"
            asChild
          >
            <Link to="/auth?mode=signup">
              Criar conta grátis
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Funcionalidades;
