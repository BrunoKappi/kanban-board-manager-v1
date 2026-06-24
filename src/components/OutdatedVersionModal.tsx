import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const TRANSLATIONS: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  featuresTitle: string;
  feature1: string;
  feature1Desc: string;
  feature2: string;
  feature2Desc: string;
  feature3: string;
  feature3Desc: string;
  btnPrimary: string;
  btnSecondary: string;
}> = {
  English: {
    title: "New Version Available",
    subtitle: "Upgrade to the latest experience",
    description: "You are currently viewing an older version of Kanban. We have rebuilt the application from the ground up to bring you a faster, safer, and more powerful tool.",
    badge: "RECOMMENDED",
    featuresTitle: "What's new in v2?",
    feature1: "More Features & Customizations",
    feature1Desc: "Enhanced boards, tags, advanced task sorting, and richer settings.",
    feature2: "Up to 5x Faster Performance",
    feature2Desc: "Instant loading, smoother transitions, and highly optimized rendering.",
    feature3: "Enterprise-grade Security",
    feature3Desc: "A completely modernized backend architecture ensuring data safety.",
    btnPrimary: "Go to new version",
    btnSecondary: "Maybe later",
  },
  "Portuguese-br": {
    title: "Nova Versão Disponível",
    subtitle: "Atualize para a melhor experiência",
    description: "Você está visualizando uma versão antiga do Kanban. Reconstruímos o aplicativo do zero para trazer a você uma ferramenta mais rápida, segura e poderosa.",
    badge: "RECOMENDADO",
    featuresTitle: "O que há de novo na v2?",
    feature1: "Mais Recursos & Customização",
    feature1Desc: "Quadros aprimorados, tags, ordenação avançada e mais configurações.",
    feature2: "Até 5x Mais Rápido",
    feature2Desc: "Carregamento instantâneo, transições mais suaves e renderização otimizada.",
    feature3: "Segurança de Alto Nível",
    feature3Desc: "Uma arquitetura de backend totalmente modernizada garantindo a segurança dos dados.",
    btnPrimary: "Ir para a nova versão",
    btnSecondary: "Talvez mais tarde",
  },
  Spanish: {
    title: "Nueva Versión Disponible",
    subtitle: "Actualízate a la mejor experiencia",
    description: "Estás viendo una versión antigua de Kanban. Hemos reconstruido la aplicación desde cero para ofrecerte una herramienta más rápida, segura y potente.",
    badge: "RECOMENDADO",
    featuresTitle: "¿Qué hay de nuevo en la v2?",
    feature1: "Más características y personalización",
    feature1Desc: "Tableros mejorados, etiquetas, clasificación avanzada de tareas y más opciones.",
    feature2: "Hasta 5 veces más rápido",
    feature2Desc: "Carga instantánea, transiciones más suaves y renderización optimizada.",
    feature3: "Seguridad de nivel empresarial",
    feature3Desc: "Una arquitectura de backend completamente modernizada que garantiza la seguridad de tus datos.",
    btnPrimary: "Ir a la nueva versión",
    btnSecondary: "Quizás más tarde",
  },
  French: {
    title: "Nouvelle Version Disponible",
    subtitle: "Passez à la meilleure expérience",
    description: "Vous utilisez actuellement une ancienne version de Kanban. Nous avons reconstruit l'application à partir de zéro pour vous offrir un outil plus rapide, plus sûr et plus performant.",
    badge: "RECOMMANDÉ",
    featuresTitle: "Quoi de neuf dans la v2 ?",
    feature1: "Plus de fonctionnalités & personnalisations",
    feature1Desc: "Tableaux améliorés, étiquettes, tri avancé des tâches et paramètres enrichis.",
    feature2: "Jusqu'à 5 fois plus rapide",
    feature2Desc: "Chargement instantané, transitions plus fluides et rendu optimisé.",
    feature3: "Sécurité de niveau entreprise",
    feature3Desc: "Une architecture backend entièrement modernisée garantissant la sécurité de vos données.",
    btnPrimary: "Aller à la nouvelle version",
    btnSecondary: "Plus tard",
  },
  German: {
    title: "Neue Version verfügbar",
    subtitle: "Wechseln Sie zur neuesten Version",
    description: "Sie verwenden derzeit eine ältere Version von Kanban. Wir haben die Anwendung von Grund auf neu aufgebaut, um Ihnen ein schnelleres, sichereres und leistungsfähigeres Tool zu bieten.",
    badge: "EMPFOHLEN",
    featuresTitle: "Was ist neu in v2?",
    feature1: "Mehr Funktionen & Anpassungen",
    feature1Desc: "Verbesserte Boards, Tags, erweiterte Aufgabensortierung und reichere Einstellungen.",
    feature2: "Bis zu 5x schnellere Leistung",
    feature2Desc: "Sofortiges Laden, flüssigere Übergänge und hochoptimiertes Rendering.",
    feature3: "Sicherheit auf Enterprise-Niveau",
    feature3Desc: "Eine komplett modernisierte Backend-Architektur, die Datensicherheit gewährleistet.",
    btnPrimary: "Zur neuen Version",
    btnSecondary: "Vielleicht später",
  }
};

export default function OutdatedVersionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = useSelector((state: any) => state.Language) || "Portuguese-br";
  
  const texts = TRANSLATIONS[currentLanguage] || TRANSLATIONS["Portuguese-br"];

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem("Kanban-Outdated-Notified");
    if (!hasSeenNotification) {
      // Delay showing the modal for a split second for a premium loading effect
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("Kanban-Outdated-Notified", "true");
    setIsOpen(false);
  };

  const handleRedirect = () => {
    localStorage.setItem("Kanban-Outdated-Notified", "true");
    setIsOpen(false);
    window.location.href = "https://kanban.bkappi.com";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-[550px] overflow-hidden bg-background dark:bg-zinc-950 dark:border-zinc-800 p-0 rounded-3xl shadow-2xl">
        {/* Glow Header Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500" />
        
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-500 dark:text-violet-400">
                <Sparkles className="size-3" />
                {texts.badge}
              </span>
            </div>
            
            <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              {texts.title}
            </DialogTitle>
            
            <DialogDescription className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {texts.description}
            </DialogDescription>
          </DialogHeader>

          {/* Features highlight container */}
          <div className="mt-6 space-y-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {texts.featuresTitle}
            </h4>
            
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex gap-3 items-start">
                <div className="rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 p-1.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-none">
                    {texts.feature1}
                  </h5>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {texts.feature1Desc}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-3 items-start">
                <div className="rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 p-1.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                  <Zap className="size-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-none">
                    {texts.feature2}
                  </h5>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {texts.feature2Desc}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-3 items-start">
                <div className="rounded-lg bg-blue-500/10 dark:bg-blue-500/20 p-1.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                  <Shield className="size-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-none">
                    {texts.feature3}
                  </h5>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {texts.feature3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-900/80 px-6 sm:px-8 py-4">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="w-full sm:w-auto text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            {texts.btnSecondary}
          </Button>
          <Button
            onClick={handleRedirect}
            className="w-full sm:w-auto gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 transition-all group"
          >
            {texts.btnPrimary}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
