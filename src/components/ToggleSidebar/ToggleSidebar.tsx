import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MIDDLEWARE_ToggleSidebar } from "@/Middleware/SetData";
import Tooltip from "../Tooltip/Tooltip";

export default function ToggleSidebar({ className }: any) {
  const Sidebar = useSelector((state: any) => state.Sidebar);

  const ToggleSidebar = () => {
    MIDDLEWARE_ToggleSidebar();
  };

  return (
    <Tooltip text={Sidebar === "Opened" ? "Hide Sidebar" : "Show Sidebar"}>
      <Button onClick={ToggleSidebar} className={cn(" hidden md:flex", className)} variant="ghost" size="icon">
        {Sidebar === "Opened" ? <ChevronsLeft /> : <ChevronsRight />}
      </Button>
    </Tooltip>
  );
}
