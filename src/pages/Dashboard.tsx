import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Copy,
  Download,
  Trash2,
  User,
  Crown,
  LogOut,
  ChevronDown,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type ContractStatus = "draft" | "completed";

interface Contract {
  id: number;
  title: string;
  type: string;
  status: ContractStatus;
  updatedAt: string;
  createdAt: string;
}

const statusConfig = {
  draft: {
    label: "Rascunho",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  completed: {
    label: "Finalizado",
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-100",
  },
};

const Dashboard = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ContractStatus>("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "all" || contract.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDuplicate = (contract: Contract) => {
    const newContract = {
      ...contract,
      id: Date.now(),
      title: `${contract.title} (cópia)`,
      status: "draft" as ContractStatus,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setContracts((prev) => [newContract, ...prev]);
    toast({
      title: "Contrato duplicado",
      description: "Uma cópia do contrato foi criada com sucesso.",
    });
  };

  const handleDelete = () => {
    if (deleteId) {
      setContracts((prev) => prev.filter((c) => c.id !== deleteId));
      toast({
        title: "Contrato excluído",
        description: "O contrato foi removido permanentemente.",
      });
      setDeleteId(null);
    }
  };

  const handleExport = (format: "pdf" | "docx") => {
    toast({
      title: `Exportando ${format.toUpperCase()}`,
      description: "Seu arquivo será baixado em instantes.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block">
              Contrato<span className="text-accent">Justo</span>
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-secondary rounded-lg p-2 transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">
                  {user?.user_metadata?.full_name || 'Usuário'}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Meu perfil
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/precos" className="flex items-center">
                  <Crown className="w-4 h-4 mr-2" />
                  <span>Meu Plano</span>
                  <span className="ml-auto text-xs text-accent">Ver planos</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Meus Contratos
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os seus contratos em um só lugar
            </p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/modelos">
              <Plus className="w-4 h-4 mr-2" />
              Novo contrato
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar contratos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "draft", "completed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {status === "all"
                  ? "Todos"
                  : status === "draft"
                  ? "Rascunhos"
                  : "Finalizados"}
              </button>
            ))}
          </div>
        </div>

        {/* Contracts List */}
        {filteredContracts.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              {search ? (
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              ) : (
                <FileText className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {search ? "Nenhum contrato encontrado" : "Você ainda não tem contratos"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {search
                ? "Tente buscar por outro termo"
                : "Crie seu primeiro contrato para começar"}
            </p>
            <Button variant="hero" asChild>
              <Link to="/modelos">
                <Plus className="w-4 h-4 mr-2" />
                Criar primeiro contrato
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContracts.map((contract, index) => {
              const status = statusConfig[contract.status];
              return (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {contract.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {contract.type} • Atualizado em{" "}
                      {new Date(contract.updatedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.color}`}
                  >
                    <status.icon className="w-3.5 h-3.5" />
                    {status.label}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDuplicate(contract)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleExport("pdf")}>
                        <Download className="w-4 h-4 mr-2" />
                        Exportar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport("docx")}>
                        <Download className="w-4 h-4 mr-2" />
                        Exportar DOCX
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteId(contract.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Plan Banner - Only show if user has no contracts */}
        {contracts.length === 0 && (
          <div className="mt-8 bg-gradient-hero rounded-2xl p-6 text-primary-foreground">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5" />
                  <span className="font-semibold">Bem-vindo ao ContratoJusto!</span>
                </div>
                <p className="text-primary-foreground/80 text-sm">
                  Escolha um plano e comece a criar documentos profissionais agora mesmo.
                </p>
              </div>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
                asChild
              >
                <Link to="/precos">Ver planos</Link>
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir contrato?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Esta ação não pode ser desfeita. O contrato será removido
            permanentemente.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
