import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import LegalModal from "./LegalModal";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const Translations = useSelector((state: any) => state.Translations);
  
  const legalTrans = Translations.Legal || {
    CookieConsentText: "Este site utiliza cookies para personalizar anúncios e melhorar a sua experiência. Ao continuar navegando, você concorda com nossas Políticas de Cookies, Privacidade e Termos de Uso.",
    CookieAccept: "Aceitar Todos",
    CookieDecline: "Recusar",
    ReadMore: "Ler Políticas"
  };

  useEffect(() => {
    const consent = localStorage.getItem("Kanban-Cookie-Consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("Kanban-Cookie-Consent", "Accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("Kanban-Cookie-Consent", "Declined");
    setShowBanner(false);
  };

  if (!showBanner) return <LegalModal open={isLegalOpen} onOpenChange={setIsLegalOpen} />;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 transition-all duration-300 transform translate-y-0">
        <div className="bg-background/95 dark:bg-zinc-900/95 backdrop-blur-md border border-border dark:border-border-dark p-5 rounded-2xl shadow-2xl flex flex-col gap-4 text-foreground">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl text-primary flex-shrink-0">
              <Cookie className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-sm">Privacidade & Cookies</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {legalTrans.CookieConsentText}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-2 text-xs flex-wrap">
            <button
              onClick={() => setIsLegalOpen(true)}
              className="text-muted-foreground hover:text-foreground hover:underline px-3 py-1.5 transition-colors"
            >
              {legalTrans.ReadMore}
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="text-xs border-border dark:border-border-dark hover:bg-muted dark:hover:bg-zinc-800"
            >
              {legalTrans.CookieDecline}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="text-xs"
            >
              {legalTrans.CookieAccept}
            </Button>
          </div>
        </div>
      </div>
      <LegalModal open={isLegalOpen} onOpenChange={setIsLegalOpen} />
    </>
  );
}
