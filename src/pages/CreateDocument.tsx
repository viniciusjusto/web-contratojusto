import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Mail,
  MapPin,
  Globe,
  Phone,
  CheckCircle2,
  Loader2,
  Download,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { exportToPDF, exportToWord, getDocumentContent, type DocumentData } from "@/lib/documentGenerator";

type DocumentType = "termos-de-uso" | "politica-de-privacidade";
type PersonType = "pf" | "pj";

interface FormData {
  // Identificação
  documentType: DocumentType;
  personType: PersonType;
  companyName: string;
  tradingName: string;
  document: string; // CPF ou CNPJ
  
  // Contato
  email: string;
  phone: string;
  website: string;
  
  // Endereço
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Específicos do documento
  serviceDescription: string;
  dpoEmail: string;
  
  // Funcionalidades (para Termos de Uso)
  hasCookies: boolean;
  hasPayments: boolean;
  hasSocialLogin: boolean;
  hasAnalytics: boolean;
  hasUserContent: boolean;
  
  // LGPD (para Política de Privacidade)
  hasInternationalTransfer: boolean;
  dataRetentionPeriod: string;
  dataTypes: string[];
}

const DOCUMENT_TYPES = {
  "termos-de-uso": "Termos de Uso",
  "politica-de-privacidade": "Política de Privacidade",
};

const CreateDocument = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const documentTypeParam = searchParams.get("type") as DocumentType;
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  
  const [formData, setFormData] = useState<FormData>({
    documentType: documentTypeParam || "termos-de-uso",
    personType: "pj",
    companyName: "",
    tradingName: "",
    document: "",
    email: user?.email || "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceDescription: "",
    dpoEmail: "",
    hasCookies: false,
    hasPayments: false,
    hasSocialLogin: false,
    hasAnalytics: false,
    hasUserContent: false,
    hasInternationalTransfer: false,
    dataRetentionPeriod: "24 meses",
    dataTypes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format inputs
    if (name === "document") {
      value = value.replace(/\D/g, "");
      if (formData.personType === "pf") {
        value = value.slice(0, 11);
      } else {
        value = value.slice(0, 14);
      }
    } else if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 11);
    } else if (name === "zipCode") {
      value = value.replace(/\D/g, "").slice(0, 8);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (field: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleDataTypeToggle = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dataTypes: checked
        ? [...prev.dataTypes, type]
        : prev.dataTypes.filter((t) => t !== type),
    }));
  };

  const nextStep = () => {
    // Validation for current step
    if (currentStep === 1) {
      if (!formData.companyName || !formData.document) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.email || !formData.city || !formData.state) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);

    try {
      // Preparar dados para geração
      const documentData: DocumentData = {
        type: formData.documentType,
        personType: formData.personType === "pf" ? "PF" : "PJ",
        name: formData.companyName,
        cpfCnpj: formData.document,
        serviceDescription: formData.serviceDescription,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        dpoEmail: formData.dpoEmail,
      };

      // Adicionar dados específicos do tipo de documento
      if (formData.documentType === "termos-de-uso") {
        const features: string[] = [];
        if (formData.hasCookies) features.push("Uso de cookies e tecnologias de rastreamento");
        if (formData.hasPayments) features.push("Processamento de pagamentos");
        if (formData.hasSocialLogin) features.push("Login através de redes sociais");
        if (formData.hasAnalytics) features.push("Coleta de dados analíticos");
        if (formData.hasUserContent) features.push("Publicação de conteúdo por usuários");
        documentData.features = features;
      } else {
        const dataTypeLabels: Record<string, string> = {
          nome: "Nome completo",
          email: "Endereço de email",
          telefone: "Número de telefone",
          cpf: "CPF",
          endereco: "Endereço completo",
          pagamento: "Dados de pagamento (cartão, etc.)",
          navegacao: "Dados de navegação (IP, cookies, user agent)",
          localizacao: "Dados de localização geográfica",
        };
        documentData.dataTypes = formData.dataTypes.map(type => dataTypeLabels[type] || type);
      }

      // Gerar conteúdo do documento
      const content = getDocumentContent(documentData);
      setGeneratedContent(content);

      // Simular tempo de processamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsGenerating(false);
      setShowDownloadModal(true);

      toast({
        title: "Documento gerado!",
        description: "Seu documento está pronto para download.",
      });
    } catch (error) {
      console.error("Erro ao gerar documento:", error);
      toast({
        title: "Erro ao gerar documento",
        description: "Ocorreu um erro ao gerar o documento. Tente novamente.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const documentData: DocumentData = {
        type: formData.documentType,
        personType: formData.personType === "pf" ? "PF" : "PJ",
        name: formData.companyName,
        cpfCnpj: formData.document,
        serviceDescription: formData.serviceDescription,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        dpoEmail: formData.dpoEmail,
      };

      if (formData.documentType === "termos-de-uso") {
        const features: string[] = [];
        if (formData.hasCookies) features.push("Uso de cookies e tecnologias de rastreamento");
        if (formData.hasPayments) features.push("Processamento de pagamentos");
        if (formData.hasSocialLogin) features.push("Login através de redes sociais");
        if (formData.hasAnalytics) features.push("Coleta de dados analíticos");
        if (formData.hasUserContent) features.push("Publicação de conteúdo por usuários");
        documentData.features = features;
      } else {
        const dataTypeLabels: Record<string, string> = {
          nome: "Nome completo",
          email: "Endereço de email",
          telefone: "Número de telefone",
          cpf: "CPF",
          endereco: "Endereço completo",
          pagamento: "Dados de pagamento (cartão, etc.)",
          navegacao: "Dados de navegação (IP, cookies, user agent)",
          localizacao: "Dados de localização geográfica",
        };
        documentData.dataTypes = formData.dataTypes.map(type => dataTypeLabels[type] || type);
      }

      await exportToPDF(documentData);
      
      toast({
        title: "PDF baixado!",
        description: "O documento foi salvo em formato PDF.",
      });
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast({
        title: "Erro ao exportar PDF",
        description: "Ocorreu um erro ao exportar o documento.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadWord = async () => {
    try {
      const documentData: DocumentData = {
        type: formData.documentType,
        personType: formData.personType === "pf" ? "PF" : "PJ",
        name: formData.companyName,
        cpfCnpj: formData.document,
        serviceDescription: formData.serviceDescription,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        dpoEmail: formData.dpoEmail,
      };

      if (formData.documentType === "termos-de-uso") {
        const features: string[] = [];
        if (formData.hasCookies) features.push("Uso de cookies e tecnologias de rastreamento");
        if (formData.hasPayments) features.push("Processamento de pagamentos");
        if (formData.hasSocialLogin) features.push("Login através de redes sociais");
        if (formData.hasAnalytics) features.push("Coleta de dados analíticos");
        if (formData.hasUserContent) features.push("Publicação de conteúdo por usuários");
        documentData.features = features;
      } else {
        const dataTypeLabels: Record<string, string> = {
          nome: "Nome completo",
          email: "Endereço de email",
          telefone: "Número de telefone",
          cpf: "CPF",
          endereco: "Endereço completo",
          pagamento: "Dados de pagamento (cartão, etc.)",
          navegacao: "Dados de navegação (IP, cookies, user agent)",
          localizacao: "Dados de localização geográfica",
        };
        documentData.dataTypes = formData.dataTypes.map(type => dataTypeLabels[type] || type);
      }

      await exportToWord(documentData);
      
      toast({
        title: "Word baixado!",
        description: "O documento foi salvo em formato Word.",
      });
    } catch (error) {
      console.error("Erro ao exportar Word:", error);
      toast({
        title: "Erro ao exportar Word",
        description: "Ocorreu um erro ao exportar o documento.",
        variant: "destructive",
      });
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

  const totalSteps = formData.documentType === "termos-de-uso" ? 4 : 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/modelos"
            className="inline-flex items-center text-sm text-accent mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para modelos
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {DOCUMENT_TYPES[formData.documentType]}
              </h1>
              <p className="text-muted-foreground">
                Passo {currentStep} de {totalSteps}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-card rounded-2xl p-8 shadow-card">
          <AnimatePresence mode="wait">
            {/* Step 1: Identificação */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Identificação da empresa
                  </h2>
                  <p className="text-muted-foreground">
                    Informe os dados básicos da sua empresa ou pessoa física
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Tipo de pessoa</Label>
                    <RadioGroup
                      value={formData.personType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, personType: value as PersonType }))
                      }
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pj" id="pj" />
                        <Label htmlFor="pj" className="cursor-pointer">
                          Pessoa Jurídica (CNPJ)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pf" id="pf" />
                        <Label htmlFor="pf" className="cursor-pointer">
                          Pessoa Física (CPF)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="companyName">
                      {formData.personType === "pj" ? "Razão Social *" : "Nome Completo *"}
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder={formData.personType === "pj" ? "Empresa LTDA" : "João Silva"}
                      required
                    />
                  </div>

                  {formData.personType === "pj" && (
                    <div>
                      <Label htmlFor="tradingName">Nome Fantasia</Label>
                      <Input
                        id="tradingName"
                        name="tradingName"
                        value={formData.tradingName}
                        onChange={handleChange}
                        placeholder="Nome comercial da empresa"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="document">
                      {formData.personType === "pj" ? "CNPJ *" : "CPF *"}
                    </Label>
                    <Input
                      id="document"
                      name="document"
                      value={formData.document}
                      onChange={handleChange}
                      placeholder={
                        formData.personType === "pj"
                          ? "00.000.000/0000-00"
                          : "000.000.000-00"
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceDescription">
                      Descrição do serviço/produto *
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      name="serviceDescription"
                      value={formData.serviceDescription}
                      onChange={handleChange}
                      placeholder="Descreva brevemente o que sua plataforma/serviço oferece..."
                      rows={4}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Esta descrição será usada no documento
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contato e Endereço */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Informações de contato
                  </h2>
                  <p className="text-muted-foreground">
                    Dados para contato e localização
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email de contato *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contato@empresa.com"
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
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Site/URL da plataforma</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.seusite.com.br"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço completo</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado (UF) *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="SP"
                        maxLength={2}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>

                  {formData.documentType === "politica-de-privacidade" && (
                    <div>
                      <Label htmlFor="dpoEmail">
                        Email do DPO/Encarregado de Dados
                      </Label>
                      <Input
                        id="dpoEmail"
                        name="dpoEmail"
                        type="email"
                        value={formData.dpoEmail}
                        onChange={handleChange}
                        placeholder="dpo@empresa.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Conforme exigido pela LGPD
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Funcionalidades (Termos) ou Dados (Privacidade) */}
            {currentStep === 3 && formData.documentType === "termos-de-uso" && (
              <motion.div
                key="step3-termos"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Funcionalidades da plataforma
                  </h2>
                  <p className="text-muted-foreground">
                    Selecione as funcionalidades presentes no seu serviço
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="hasCookies"
                      checked={formData.hasCookies}
                      onCheckedChange={(checked) =>
                        handleCheckbox("hasCookies", checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="hasCookies" className="cursor-pointer font-medium">
                        Cookies e rastreamento
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Seu site utiliza cookies para melhorar a experiência
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="hasPayments"
                      checked={formData.hasPayments}
                      onCheckedChange={(checked) =>
                        handleCheckbox("hasPayments", checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="hasPayments" className="cursor-pointer font-medium">
                        Pagamentos e transações
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Plataforma processa pagamentos ou transações financeiras
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="hasSocialLogin"
                      checked={formData.hasSocialLogin}
                      onCheckedChange={(checked) =>
                        handleCheckbox("hasSocialLogin", checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="hasSocialLogin" className="cursor-pointer font-medium">
                        Login com redes sociais
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Login via Google, Facebook, etc.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="hasAnalytics"
                      checked={formData.hasAnalytics}
                      onCheckedChange={(checked) =>
                        handleCheckbox("hasAnalytics", checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="hasAnalytics" className="cursor-pointer font-medium">
                        Analytics e métricas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Google Analytics, Hotjar ou ferramentas similares
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="hasUserContent"
                      checked={formData.hasUserContent}
                      onCheckedChange={(checked) =>
                        handleCheckbox("hasUserContent", checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="hasUserContent" className="cursor-pointer font-medium">
                        Conteúdo gerado por usuários
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Usuários podem criar, enviar ou publicar conteúdo
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && formData.documentType === "politica-de-privacidade" && (
              <motion.div
                key="step3-privacy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Dados coletados
                  </h2>
                  <p className="text-muted-foreground">
                    Quais dados você coleta dos usuários?
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "nome", label: "Nome completo" },
                    { id: "email", label: "Endereço de email" },
                    { id: "telefone", label: "Telefone" },
                    { id: "cpf", label: "CPF" },
                    { id: "endereco", label: "Endereço" },
                    { id: "pagamento", label: "Dados de pagamento" },
                    { id: "navegacao", label: "Dados de navegação (IP, cookies)" },
                    { id: "localizacao", label: "Dados de localização" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={formData.dataTypes.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleDataTypeToggle(item.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={item.id} className="cursor-pointer flex-1">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="dataRetentionPeriod">
                    Período de retenção de dados
                  </Label>
                  <Input
                    id="dataRetentionPeriod"
                    name="dataRetentionPeriod"
                    value={formData.dataRetentionPeriod}
                    onChange={handleChange}
                    placeholder="Ex: 24 meses, 5 anos"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Por quanto tempo os dados são armazenados
                  </p>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="hasInternationalTransfer"
                    checked={formData.hasInternationalTransfer}
                    onCheckedChange={(checked) =>
                      handleCheckbox("hasInternationalTransfer", checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor="hasInternationalTransfer" className="cursor-pointer font-medium">
                      Transferência internacional de dados
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Os dados são compartilhados com servidores fora do Brasil
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Revisão */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Revisão final
                  </h2>
                  <p className="text-muted-foreground">
                    Confira as informações antes de gerar o documento
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold mb-3">Identificação</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {formData.personType === "pj" ? "Empresa" : "Nome"}:
                        </span>
                        <span className="font-medium">{formData.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {formData.personType === "pj" ? "CNPJ" : "CPF"}:
                        </span>
                        <span className="font-medium">{formData.document}</span>
                      </div>
                      {formData.tradingName && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nome Fantasia:</span>
                          <span className="font-medium">{formData.tradingName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold mb-3">Contato</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Localização:</span>
                        <span className="font-medium">
                          {formData.city}/{formData.state}
                        </span>
                      </div>
                      {formData.website && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Website:</span>
                          <span className="font-medium">{formData.website}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.documentType === "termos-de-uso" && (
                    <div className="p-4 bg-secondary rounded-lg">
                      <h3 className="font-semibold mb-3">Funcionalidades</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.hasCookies && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            Cookies
                          </span>
                        )}
                        {formData.hasPayments && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            Pagamentos
                          </span>
                        )}
                        {formData.hasSocialLogin && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            Login Social
                          </span>
                        )}
                        {formData.hasAnalytics && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            Analytics
                          </span>
                        )}
                        {formData.hasUserContent && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                            Conteúdo de Usuários
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.documentType === "politica-de-privacidade" && (
                    <div className="p-4 bg-secondary rounded-lg">
                      <h3 className="font-semibold mb-3">Dados coletados</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.dataTypes.map((type) => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-3 p-4 border-2 border-accent/20 rounded-lg bg-accent/5">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      Documento pronto para ser gerado
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Você poderá editar e personalizar o documento após a geração
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isGenerating}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {currentStep < totalSteps ? (
              <Button variant="hero" onClick={nextStep}>
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    Gerar documento
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Download Modal */}
        <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                Documento gerado com sucesso!
              </DialogTitle>
              <DialogDescription>
                Escolha o formato para fazer o download do seu documento
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Preview do Conteúdo */}
              <div className="border rounded-lg p-4 bg-secondary/50 max-h-[300px] overflow-y-auto">
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Preview:</h4>
                <pre className="text-xs whitespace-pre-wrap font-mono">
                  {generatedContent.substring(0, 500)}...
                </pre>
              </div>

              {/* Botões de Download */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadPDF}
                  className="h-auto py-6 flex flex-col items-center gap-3 hover:border-accent hover:bg-accent/5"
                >
                  <FileDown className="w-8 h-8 text-red-500" />
                  <div className="text-center">
                    <div className="font-semibold">Baixar PDF</div>
                    <div className="text-xs text-muted-foreground">Formato universal</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadWord}
                  className="h-auto py-6 flex flex-col items-center gap-3 hover:border-accent hover:bg-accent/5"
                >
                  <FileDown className="w-8 h-8 text-blue-500" />
                  <div className="text-center">
                    <div className="font-semibold">Baixar Word</div>
                    <div className="text-xs text-muted-foreground">Formato editável</div>
                  </div>
                </Button>
              </div>

              {/* Informações adicionais */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Documento em conformidade com LGPD</p>
                    <p className="text-muted-foreground text-xs">
                      Este documento foi gerado seguindo as diretrizes da Lei Geral de Proteção de Dados (Lei 13.709/2018).
                      Você pode editar o arquivo Word conforme necessário.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão para ir ao Dashboard */}
              <Button
                variant="hero"
                className="w-full"
                onClick={() => {
                  setShowDownloadModal(false);
                  navigate("/dashboard");
                }}
              >
                Ir para Meus Contratos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateDocument;
