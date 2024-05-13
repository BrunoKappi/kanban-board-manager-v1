import * as React from "react";

import { cn } from "@/lib/utils";

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}

const PopOverList = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => {
  return <div className={cn(" w-full bg-background dark:bg-background-dark select-none  flex flex-col items-start justify-start gap-2 p-0", className)} ref={ref} {...props} />;
});
PopOverList.displayName = "PopOverList";

export { PopOverList };
 