import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Tooltip from "../Tooltip/Tooltip";
import { STORE_ToggleSidebar } from "@/Middleware/Store";

export default function ToggleSidebar({ className }: any) {
  const Sidebar = useSelector((state: any) => state.Sidebar);
  const Translations = useSelector((state: any) => state.Translations);

  const ToggleSidebar = () => {
    STORE_ToggleSidebar();
  };

  return (
    <Tooltip text={Sidebar === "Opened" ? Translations.Tooltips.HideSidebar : Translations.Tooltips.ShowSidebar}>
      <Button onClick={ToggleSidebar} className={cn(" hidden md:flex", className)} variant="ghost" size="icon">
        {Sidebar === "Opened" ? <ChevronsLeft /> : <ChevronsRight />}
      </Button>
    </Tooltip>
  );
}
