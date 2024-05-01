import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MIDDLEWARE_ToggleSidebar } from "@/Middleware/SetData";

export default function ToggleSidebar({ className }: any) {
  const Sidebar = useSelector((state: any) => state.Sidebar);

  const handleKeyPress = (event: any) => {
    if (event.ctrlKey && event.shiftKey && event.key === "S") {
      ToggleSidebar();
    }
  };
  document.addEventListener("keydown", handleKeyPress);

  const ToggleSidebar = () => {
    MIDDLEWARE_ToggleSidebar();
  };

  return (
    <Button onClick={ToggleSidebar} className={cn("", className)} variant="ghost" size="icon">
      {Sidebar === "Opened" ? <ChevronsLeft /> : <ChevronsRight />}
    </Button>
  );
}
