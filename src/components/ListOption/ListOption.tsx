import * as React from "react";

import { cn } from "@/lib/utils";

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ListOption = React.forwardRef<HTMLSpanElement, SpanProps>(({ className, ...props }, ref) => {
  return <span className={cn(" dark:hover:bg-overlay-dark hover:bg-overlay w-full flex flex-row items-center justify-start gap-2 px-3 py-1.5 rounded-sm cursor-pointer text-sm", className)} ref={ref} {...props} />;
});
ListOption.displayName = "ListOption";

export { ListOption };
