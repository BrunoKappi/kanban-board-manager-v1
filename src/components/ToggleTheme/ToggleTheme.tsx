import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { MIDDLEWARE_ToggleTheme } from "@/Middleware/SetData";
import Tooltip from "../Tooltip/Tooltip";
import { useEffect } from "react";

export default function ToggleTheme({ className }: any) {
  const Theme = useSelector((state: any) => state.Theme);
  const Translations = useSelector((state: any) => state.Translations);

  const handleKeyPress = (event: any) => {
    if (event.ctrlKey && event.shiftKey && event.key === "L") {
      ToggleTheme();
    }
  };

  const ToggleTheme = () => {
    MIDDLEWARE_ToggleTheme();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Tooltip text={Translations.Tooltips.ChangeTheme}>
      <Button onClick={ToggleTheme} className={cn("", className)} variant="ghost" size="icon">
        {Theme === "Light" ? <Sun /> : <Moon />}
      </Button>
    </Tooltip>
  );
}
