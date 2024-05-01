import React, { ReactNode, HTMLAttributes } from "react";

interface TernaryProps extends HTMLAttributes<HTMLDivElement> {
  condition: boolean;
  children: [ReactNode, ReactNode];
}

const Ternary: React.FC<TernaryProps> = ({ condition, children }) => {
  const trueComponent = React.Children.toArray(children)[0];
  const falseComponent = React.Children.toArray(children)[1];

  return condition ? <>{trueComponent}</> : <>{falseComponent}</>;
};

export default Ternary;
