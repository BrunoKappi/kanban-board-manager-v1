import { ReactNode } from "react";

type ShowProps = {
  if: boolean;
  children: ReactNode;
};

const Show = ({ if: shouldShow, children }: ShowProps) => {
  return shouldShow ? <>{children}</> : null;
};

export default Show;
