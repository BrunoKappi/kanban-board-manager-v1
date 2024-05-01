import React from "react";

type FakeComponentProps = {
  text: string;
  children?: React.ReactNode; // Adicionando children como uma propriedade opcional
};

const FakeComponent: React.FC<FakeComponentProps> = ({ text, children }) => {
  return (
    <div className="text-center px-5 py-6 h-full flex flex-col gap-60 left-1 top-1 items-start justify-start w-full">
      <div className="w-full">
        <h1 className="text-foreground-light  font-bold">{text}</h1>
      </div>
      {children} {/* Renderizando children, se houver */}
    </div>
  );
};

export default FakeComponent;
