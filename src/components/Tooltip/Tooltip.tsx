import { ReactNode } from "react";
import { Tooltip as TooltipShadcn, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Ternary from "@/lib/Ternary";

type TooltipProps = {
  text: string;
  children: ReactNode;
  enable?: boolean;
};

const Tooltip = ({ text, children, enable = true }: TooltipProps) => {
  return (
    <Ternary condition={enable}>
      <TooltipProvider>
        <TooltipShadcn>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </TooltipShadcn>
      </TooltipProvider>
      {children}
    </Ternary>
  );
};

export default Tooltip;
