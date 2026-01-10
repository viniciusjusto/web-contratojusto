import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const stats = [
  { value: "10K+", label: "Contratos criados" },
  { value: "2.5K+", label: "Empresas ativas" },
  { value: "99.9%", label: "Uptime garantido" },
  { value: "< 5min", label: "Tempo médio" },
];

const features = [
  {
    icon: Zap,
    title: "Rápido e Simples",
    description:
      "Crie contratos profissionais em menos de 5 minutos com nosso editor guiado.",
  },
  {
    icon: Shield,
    title: "Segurança Jurídica",
    description:
      "Modelos revisados por advogados especializados e atualizados conforme a legislação.",
  },
  {
    icon: FileText,
    title: "Modelos Prontos",
    description:
      "Biblioteca com dezenas de modelos para diferentes tipos de negócios e situações.",
  },
  {
    icon: Users,
    title: "Colaboração",
    description:
      "Trabalhe em equipe com gestão de usuários e permissões personalizadas.",
  },
];

const contractTypes = [
  "Prestação de Serviços",
  "Freelancer",
  "NDA / Confidencialidade",
  "Contrato Social",
  "Parceria",
  "Licenciamento",
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Novo: Exportação para DOCX disponível
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Crie contratos{" "}
              <span className="text-gradient">profissionais</span> em minutos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Simplifique a gestão de contratos da sua empresa. Modelos prontos,
              personalização fácil e segurança jurídica para startups e PMEs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=signup">
                  Criar contrato agora
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/precos">Ver planos</Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card shadow-card"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa para{" "}
              <span className="text-accent">gerenciar contratos</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas poderosas e intuitivas para criar, personalizar e
              gerenciar seus contratos de forma profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Types Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Modelos para{" "}
                <span className="text-accent">todas as necessidades</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Escolha entre dezenas de modelos de contratos prontos e
                personalize conforme sua necessidade. Todos revisados por
                especialistas.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {contractTypes.map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm">{type}</span>
                  </div>
                ))}
              </div>

              <Button variant="hero" asChild>
                <Link to="/modelos">
                  Ver todos os modelos
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-3xl blur-2xl" />
              <div className="relative bg-card rounded-3xl shadow-card-hover p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Contrato de Prestação de Serviços
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Modelo mais utilizado
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 bg-muted rounded-full w-full" />
                  <div className="h-3 bg-muted rounded-full w-4/5" />
                  <div className="h-3 bg-muted rounded-full w-3/4" />
                  <div className="h-3 bg-muted rounded-full w-5/6" />
                  <div className="h-3 bg-muted rounded-full w-2/3" />
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>~3 min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>PDF / DOCX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero text-primary-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comece a criar contratos profissionais hoje
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              Cadastre-se gratuitamente e crie seu primeiro contrato em menos de
              5 minutos. Sem cartão de crédito necessário.
            </p>
            <Button
              size="xl"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-glow"
              asChild
            >
              <Link to="/auth?mode=signup">
                Criar conta gratuita
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
