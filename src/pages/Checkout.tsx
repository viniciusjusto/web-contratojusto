import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  CreditCard,
  QrCode,
  ArrowLeft,
  Check,
  Loader2,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { pagarme, CreateOrderData } from "@/lib/pagarme";

type PaymentMethod = "credit_card" | "pix";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const planPrice = 59; // Plano Start R$ 59
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [isLoading, setIsLoading] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    document: "",
    phone: "",
    // Credit card fields
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format inputs
    if (name === "document") {
      value = value.replace(/\D/g, "").slice(0, 11);
    } else if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 11);
    } else if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
    } else if (name === "cardExpiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    } else if (name === "cardCvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para continuar",
        variant: "destructive",
      });
      navigate("/auth?mode=signup");
      return;
    }

    setIsLoading(true);

    try {
      const phone = formData.phone;
      const orderData: CreateOrderData = {
        amount: planPrice * 100, // Convert to cents
        customer: {
          name: formData.name,
          email: formData.email,
          document: formData.document,
          document_type: "CPF",
          type: "individual",
          phones: {
            mobile_phone: {
              country_code: "55",
              area_code: phone.slice(0, 2),
              number: phone.slice(2),
            },
          },
        },
        items: [
          {
            amount: planPrice * 100,
            description: "Plano Start - ContratoJusto (Mensal)",
            quantity: 1,
          },
        ],
        payments: [
          paymentMethod === "pix"
            ? {
                payment_method: "pix",
                pix: {
                  expires_in: 3600, // 1 hour
                },
              }
            : {
                payment_method: "credit_card",
                credit_card: {
                  card: {
                    number: formData.cardNumber.replace(/\s/g, ""),
                    holder_name: formData.cardName,
                    exp_month: parseInt(formData.cardExpiry.split("/")[0]),
                    exp_year: parseInt("20" + formData.cardExpiry.split("/")[1]),
                    cvv: formData.cardCvv,
                  },
                  installments: 1,
                },
              },
        ],
      };

      const response = await pagarme.createOrder(orderData);
      setOrderId(response.id);

      if (paymentMethod === "pix") {
        const charge = response.charges[0];
        if (charge.last_transaction.qr_code) {
          setPixCode(charge.last_transaction.qr_code);
          setPixQrCode(charge.last_transaction.qr_code_url || "");
        }
      } else {
        // Credit card payment
        if (response.status === "paid") {
          toast({
            title: "Pagamento aprovado!",
            description: "Seu plano foi ativado com sucesso.",
          });
          navigate("/dashboard");
        } else {
          toast({
            title: "Pagamento pendente",
            description: "Aguardando confirmação do pagamento.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro no pagamento",
        description: error.message || "Ocorreu um erro ao processar o pagamento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Você precisa estar logado</h2>
          <Button asChild>
            <Link to="/auth?mode=signup">Criar conta</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (pixCode) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Pague com PIX</h1>
              <p className="text-muted-foreground">
                Escaneie o QR Code ou copie o código PIX
              </p>
            </div>

            {pixQrCode && (
              <div className="flex justify-center mb-6">
                <img
                  src={pixQrCode}
                  alt="QR Code PIX"
                  className="w-64 h-64 border-2 border-border rounded-lg"
                />
              </div>
            )}

            <div className="bg-muted rounded-lg p-4 mb-6">
              <Label className="text-sm font-medium mb-2 block">
                Código PIX Copia e Cola
              </Label>
              <div className="flex gap-2">
                <Input
                  value={pixCode}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(pixCode);
                    toast({
                      title: "Código copiado!",
                      description: "Cole no app do seu banco para pagar.",
                    });
                  }}
                >
                  Copiar
                </Button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent font-bold">1</span>
                </div>
                <p className="text-muted-foreground">
                  Abra o app do seu banco e escolha pagar com PIX
                </p>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent font-bold">2</span>
                </div>
                <p className="text-muted-foreground">
                  Escaneie o QR Code ou cole o código PIX
                </p>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent font-bold">3</span>
                </div>
                <p className="text-muted-foreground">
                  Confirme o pagamento. Seu acesso será liberado automaticamente
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Loader2 className="w-4 h-4 animate-spin" />
              Aguardando pagamento...
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard">Voltar ao Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <Link
          to="/precos"
          className="inline-flex items-center text-sm text-accent mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para planos
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h1 className="text-2xl font-bold mb-6">Finalizar assinatura</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Payment Method */}
                <div className="space-y-3">
                  <Label>Método de pagamento</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) =>
                      setPaymentMethod(value as PaymentMethod)
                    }
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label
                        htmlFor="pix"
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <QrCode className="w-5 h-5" />
                        PIX (Aprovação imediata)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label
                        htmlFor="credit_card"
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <CreditCard className="w-5 h-5" />
                        Cartão de crédito
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Personal Info */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="document">CPF</Label>
                    <Input
                      id="document"
                      name="document"
                      value={formData.document}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>

                {/* Credit Card Fields */}
                {paymentMethod === "credit_card" && (
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold">Dados do cartão</h3>
                    <div>
                      <Label htmlFor="cardNumber">Número do cartão</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome no cartão</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="NOME COMO NO CARTÃO"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="cardExpiry">Validade</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          placeholder="000"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Finalizar pagamento
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Pagamento seguro processado pela PagarMe
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-8">
              <h2 className="text-xl font-bold mb-6">Resumo do pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      Plano Start
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Assinatura mensal
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">R$ {planPrice}</div>
                    <div className="text-xs text-muted-foreground">/mês</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Geração ilimitada</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Histórico de versões</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span>PDF + Word editável</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span>Sem fidelidade</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-accent">
                  R$ {planPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                <Shield className="w-4 h-4 shrink-0" />
                <p>
                  Seus dados estão protegidos e a transação é 100% segura
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
