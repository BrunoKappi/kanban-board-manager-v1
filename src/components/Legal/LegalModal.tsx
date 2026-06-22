import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, Scale, Cookie } from "lucide-react";
import { useSelector } from "react-redux";

interface LegalModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export default function LegalModal({ open, onOpenChange, trigger }: LegalModalProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const [activeTab, setActiveTab] = useState("privacy");
  const legalTrans = Translations.Legal || {
    LegalTitle: "Políticas e Privacidade (LGPD)",
    TermsOfUseTitle: "Termos de Uso",
    PrivacyPolicyTitle: "Política de Privacidade",
    CookiePolicyTitle: "Política de Cookies",
    ReadMore: "Ler Políticas"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-[700px] w-[90vw] h-[80vh] bg-background dark:bg-card-foreground border dark:border-border-dark p-6 flex flex-col gap-4">
        <DialogHeader className="border-b pb-2 dark:border-border-dark flex-shrink-0">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
            <ShieldCheck className="size-6 text-primary" />
            {legalTrans.LegalTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-grow flex flex-col overflow-hidden">
          {/* Custom Premium Tabs List */}
          <div className="grid grid-cols-3 bg-secondary/50 dark:bg-zinc-800/50 p-1 rounded-lg flex-shrink-0">
            <button
              onClick={() => setActiveTab("terms")}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                activeTab === "terms"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Scale className="size-4" />
              <span className="hidden sm:inline">{legalTrans.TermsOfUseTitle}</span>
              <span className="sm:hidden">{legalTrans.TermsOfUseTitle.split(" ")[0]}</span>
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                activeTab === "privacy"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="size-4" />
              <span className="hidden sm:inline">{legalTrans.PrivacyPolicyTitle}</span>
              <span className="sm:hidden">{legalTrans.PrivacyPolicyTitle.split(" ").pop()}</span>
            </button>
            <button
              onClick={() => setActiveTab("cookies")}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                activeTab === "cookies"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cookie className="size-4" />
              <span className="hidden sm:inline">{legalTrans.CookiePolicyTitle}</span>
              <span className="sm:hidden">{legalTrans.CookiePolicyTitle.split(" ").pop()}</span>
            </button>
          </div>

          {/* Tabs Content */}
          <div className="flex-grow overflow-hidden mt-4 border dark:border-border-dark rounded-lg bg-card/30">
            <ScrollArea className="h-full p-4">
              {activeTab === "terms" && (
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <h3 className="text-base font-semibold text-foreground">1. Termos e Condições Gerais</h3>
                  <p>
                    Bem-vindo ao Kanban App. Ao acessar ou usar nosso serviço, você concorda em cumprir e ser regido por estes Termos de Uso. O Kanban App é uma ferramenta voltada para a organização e gestão de tarefas pessoais e de projetos em equipe.
                  </p>
                  <h3 className="text-base font-semibold text-foreground">2. Contas de Usuário</h3>
                  <p>
                    Para acessar recursos avançados como sincronização na nuvem e colaboração, é necessária a criação de uma conta. Você é responsável por manter a segurança da sua conta e senha. O aplicativo oferece recursos para exclusão definitiva de sua conta e dados a qualquer momento, conforme garantido pela LGPD.
                  </p>
                  <h3 className="text-base font-semibold text-foreground">3. Limitação de Responsabilidade</h3>
                  <p>
                    O aplicativo é fornecido "como está". Nos esforçamos para garantir alta disponibilidade e segurança, mas não garantimos que o serviço será ininterrupto ou livre de erros. Recomenda-se realizar backups periódicos de seus dados caso julgue necessário.
                  </p>
                  <h3 className="text-base font-semibold text-foreground">4. Alterações nos Termos</h3>
                  <p>
                    Reservamo-nos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão notificadas através do próprio aplicativo.
                  </p>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <h3 className="text-base font-semibold text-foreground">1. Introdução à LGPD</h3>
                  <p>
                    Esta Política de Privacidade descreve como o Kanban App coleta, utiliza, armazena e protege seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) no Brasil e diretrizes do GDPR internacional.
                  </p>
                  <h3 className="text-base font-semibold text-foreground">2. Dados Coletados</h3>
                  <p>
                    Coletamos apenas informações essenciais para o funcionamento do aplicativo:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dados de cadastro: Nome, e-mail e foto do perfil (quando fornecidos pelo provedor Google ou inseridos no formulário).</li>
                    <li>Dados do aplicativo: Quadros (boards), listas, cartões, comentários e preferências que você cria e gerencia dentro da ferramenta.</li>
                  </ul>
                  <h3 className="text-base font-semibold text-foreground">3. Seus Direitos sob a LGPD</h3>
                  <p>
                    Você possui os seguintes direitos garantidos por lei:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Acesso e Portabilidade:</strong> Direito de exportar todos os seus dados gerados (disponível no menu Minha Conta).</li>
                    <li><strong>Eliminação (Esquecimento):</strong> Direito de excluir permanentemente sua conta e todos os dados a ela associados (disponível no menu Minha Conta).</li>
                    <li><strong>Correção:</strong> Direito de alterar seu nome de usuário e dados cadastrais no seu perfil.</li>
                  </ul>
                  <h3 className="text-base font-semibold text-foreground">4. Compartilhamento de Dados</h3>
                  <p>
                    Não comercializamos nem compartilhamos seus dados com terceiros para fins publicitários. Os dados são mantidos de forma segurança no Firebase/Firestore. Caso você opte por compartilhar publicamente um quadro, a URL pública permitirá que terceiros visualizem (e editem, se assim configurado) o conteúdo daquele quadro específico.
                  </p>
                </div>
              )}

              {activeTab === "cookies" && (
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <h3 className="text-base font-semibold text-foreground">1. O que são Cookies?</h3>
                  <p>
                    Cookies são pequenos arquivos de texto armazenados no seu navegador para reter informações sobre suas preferências, sessões ativas e interações com a aplicação.
                  </p>
                  <h3 className="text-base font-semibold text-foreground">2. Uso de Cookies neste Aplicativo</h3>
                  <p>
                    Utilizamos cookies estritamente necessários e de preferência:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Sessão e Autenticação:</strong> Usados para mantê-lo logado em sua conta de forma segura.</li>
                    <li><strong>Preferências do Usuário:</strong> Usados para armazenar configurações locais como idioma preferido, tema selecionado (claro/escuro) e status da barra lateral.</li>
                  </ul>
                  <h3 className="text-base font-semibold text-foreground">3. Gerenciamento de Consentimento</h3>
                  <p>
                    Você pode gerenciar ou recusar os cookies através da barra de consentimento. Note que a recusa de cookies essenciais de sessão impedirá a permanência de login e sincronização de dados online.
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
