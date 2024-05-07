import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GetPanelSize = (Panel: string, SidebarState: any) => {
  const Screen = window.innerWidth;
  let Left: number;
  let Right: number;

  if (Screen > 1800) {
    Left = 13;
  } else if (Screen >= 1312) {
    Left = 15;
  } else {
    Left = 20;
  }

  Right = 100 - Left;

  if (SidebarState === "Closed") Left = 0;

  return Panel === "Left" ? Left : Right;
};

export const GetPanelSize2 = (Panel: string, SidebarState: any, Screen: number) => {
  let Left: number;
  let Right: number;

  if (Screen > 1800) {
    Left = 13;
  } else if (Screen > 1312) {
    Left = 15;
  } else {
    Left = 20;
  }

  Right = 100 - Left;

  if (SidebarState === "Closed") Left = 0;

  return Panel === "Left" ? Left : Right;
};

export default function getEmailPrefix(email: string) {
  // Verifica se o email é uma string
  if (typeof email !== "string") {
    throw new Error("O email deve ser uma string");
  }

  // Divide o email em duas partes: a parte antes do "@" e a parte depois do "@"
  const [prefix, domain] = email.split("@");

  // Verifica se o email tem o formato correto
  if (!prefix || !domain) {
    throw new Error('O email deve estar no formato "prefixo@dominio"');
  }

  // Capitaliza a primeira letra do prefixo e retorna
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}
