import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, X, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Para quem está começando e quer testar a plataforma.",
    features: [
      { text: "1 contrato ativo", included: true },
      { text: "Modelos básicos", included: true },
      { text: "Exportação em PDF", included: true },
      { text: "Todos os modelos", included: false },
      { text: "Personalização avançada", included: false },
      { text: "Exportação DOCX", included: false },
      { text: "Múltiplos usuários", included: false },
    ],
    cta: "Começar grátis",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    description: "Para profissionais e pequenas empresas.",
    features: [
      { text: "Contratos ilimitados", included: true },
      { text: "Todos os modelos", included: true },
      { text: "Exportação PDF e DOCX", included: true },
      { text: "Personalização avançada", included: true },
      { text: "Histórico de versões", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Múltiplos usuários", included: false },
    ],
    cta: "Assinar Pro",
    popular: true,
  },
  {
    name: "Business",
    price: "149",
    description: "Para empresas que precisam de gestão em equipe.",
    features: [
      { text: "Tudo do Pro", included: true },
      { text: "Múltiplos usuários", included: true },
      { text: "Gestão por empresa", included: true },
      { text: "Templates customizados", included: true },
      { text: "API de integração", included: true },
      { text: "Suporte dedicado", included: true },
      { text: "Treinamento incluído", included: true },
    ],
    cta: "Contatar vendas",
    popular: false,
  },
];

const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim! Você pode cancelar sua assinatura a qualquer momento. Não há multas ou taxas de cancelamento.",
  },
  {
    question: "Os contratos são válidos juridicamente?",
    answer:
      "Sim. Nossos modelos são revisados por advogados especializados e seguem a legislação brasileira vigente.",
  },
  {
    question: "Posso fazer upgrade ou downgrade do plano?",
    answer:
      "Sim, você pode alterar seu plano a qualquer momento. O valor será calculado proporcionalmente.",
  },
  {
    question: "Há período de teste para os planos pagos?",
    answer:
      "Oferecemos 14 dias de teste gratuito para o plano Pro, sem necessidade de cartão de crédito.",
  },
];

const Precos = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Planos para <span className="text-accent">cada necessidade</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Escolha o plano ideal para o seu negócio. Sem surpresas, sem taxas
              ocultas.
            </motion.p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm font-medium ${
                billing === "monthly"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Mensal
            </span>
            <button
              onClick={() =>
                setBilling(billing === "monthly" ? "yearly" : "monthly")
              }
              className="relative w-14 h-7 bg-muted rounded-full transition-colors"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-accent rounded-full transition-all ${
                  billing === "yearly" ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billing === "yearly"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Anual{" "}
              <span className="text-accent font-semibold">(-20%)</span>
            </span>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card rounded-2xl p-8 ${
                  plan.popular
                    ? "ring-2 ring-accent shadow-card-hover"
                    : "shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Mais popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-5xl font-bold text-foreground">
                      {billing === "yearly"
                        ? Math.round(parseInt(plan.price) * 0.8)
                        : plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-3 text-sm ${
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature.included ? (
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 shrink-0" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/auth?mode=signup">
                    {plan.cta}
                    {plan.popular && <ArrowRight className="w-4 h-4 ml-1" />}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Perguntas Frequentes
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 shadow-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-hero text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ainda tem dúvidas?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Entre em contato com nossa equipe. Estamos aqui para ajudar.
          </p>
          <Button
            size="xl"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Falar com especialista
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Precos;
