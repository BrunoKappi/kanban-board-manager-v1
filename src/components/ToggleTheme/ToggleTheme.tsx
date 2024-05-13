import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

import Tooltip from "../Tooltip/Tooltip";
import { useEffect } from "react";
import { MIDDLEWARE_ToggleTheme } from "@/Middleware/UserPreferences";

export default function ToggleTheme({ className }: any) {
  const Theme = useSelector((state: any) => state.Theme);
  const Translations = useSelector((state: any) => state.Translations);

  const handleKeyPress = (event: any) => {
    if (event.ctrlKey && event.shiftKey && event.key === "L") {
      MIDDLEWARE_ToggleTheme();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Tooltip text={Translations.Tooltips.ChangeTheme}>
      <Button onClick={MIDDLEWARE_ToggleTheme} className={cn("", className)} variant="ghost" size="icon">
        {Theme === "Light" ? <Sun /> : <Moon />}
      </Button>
    </Tooltip>
  );
}
