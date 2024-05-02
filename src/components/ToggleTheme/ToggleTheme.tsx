import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { MIDDLEWARE_ToggleTheme } from "@/Middleware/SetData";
import Tooltip from "../Tooltip/Tooltip";

export default function ToggleTheme({ className }: any) {
  const Theme = useSelector((state: any) => state.Theme);

  if (Theme === "Dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const handleKeyPress = (event: any) => {
    if (event.ctrlKey && event.shiftKey && event.key === "L") {
      ToggleTheme();
    }
  };

  document.addEventListener("keydown", handleKeyPress);

  const ToggleTheme = () => {
    MIDDLEWARE_ToggleTheme();
  };

  return (
    <Tooltip text="Change Theme">
      <Button onClick={ToggleTheme} className={cn("", className)} variant="ghost" size="icon">
        {Theme === "Light" ? <Sun /> : <Moon />}
      </Button>
    </Tooltip>
  );
}
