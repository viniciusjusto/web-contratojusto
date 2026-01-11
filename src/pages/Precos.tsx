import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, X, ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const plans = [
  {
    name: "Gratuito",
    price: "0",
    description: "Para conhecer a plataforma",
    tagline: "",
    features: [
      { text: "✅ Acesso à plataforma", included: true },
    ],
    cta: "Criar conta grátis",
    popular: false,
  },
  {
    name: "Plano Start",
    price: "59",
    description: "Para quem está construindo ou ajustando um produto digital",
    tagline: "Assine por um mês, gere tudo, cancele quando quiser.",
    features: [
      { text: "🔁 Geração ilimitada", included: true },
      { text: "🕓 Histórico de versões", included: true },
      { text: "📄 PDF + Word editável", included: true },
      { text: "❌ Sem fidelidade", included: true },
    ],
    cta: "Começar agora",
    popular: true,
  },
];

const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim! Não há fidelidade. Assine por um mês, gere todos os documentos que precisar e cancele quando quiser, sem multas ou taxas.",
  },
  {
    question: "Os documentos são válidos juridicamente?",
    answer:
      "Sim. Nossos documentos são elaborados seguindo a LGPD e a legislação brasileira vigente, prontos para uso.",
  },
  {
    question: "O que são os ajustes livres?",
    answer:
      "Você pode personalizar seus documentos com funcionalidades específicas como cookies, pagamentos, login social, analytics e muito mais, conforme as necessidades do seu produto.",
  },
  {
    question: "Posso gerar quantos documentos eu quiser?",
    answer:
      "Sim! Com o Plano Start você tem geração ilimitada de Termos de Uso e Política de Privacidade durante todo o período de assinatura.",
  },
];

const Precos = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6"
            >
              <Rocket className="w-4 h-4" />
              Simples e direto ao ponto
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Um plano, <span className="text-accent">tudo ilimitado</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Sem complicação. Sem pegadinhas. Apenas o que você precisa.
            </motion.p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Melhor escolha
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-6xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-base text-muted-foreground mb-2">
                    {plan.description}
                  </p>
                  {plan.tagline && (
                    <p className="text-sm font-medium text-accent italic">
                      "{plan.tagline}"
                    </p>
                  )}
                </div>

                <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-base ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to={plan.price === "0" ? "/auth?mode=signup" : "/checkout"}>
                    {plan.cta}
                    {plan.popular && <ArrowRight className="w-5 h-5 ml-2" />}
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
            Pronto para começar?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Assine hoje e tenha acesso ilimitado. Cancele quando quiser, sem compromisso.
          </p>
          <Button
            size="xl"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            asChild
          >
            <Link to="/auth?mode=signup">
              Começar agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Precos;
