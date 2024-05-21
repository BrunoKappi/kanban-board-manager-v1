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
    Left = 14;
  } else if (Screen >= 1312) {
    Left = 16;
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

export const Copy = (ITEM: any) => {
  return JSON.parse(JSON.stringify(ITEM || ""));
};

export function moveObjectInArray(arr: any, sourceIndex: number, destinationIndex: number) {
  // Faz uma cópia profunda do array original para não modificar o original
  const newArr = arr.map((obj: any) => ({ ...obj }));

  // Remove o objeto do sourceIndex
  const [removedObject] = newArr.splice(sourceIndex, 1);

  // Insere o objeto no destinationIndex
  newArr.splice(destinationIndex, 0, removedObject);

  return newArr;
}

export const SetHTMLClassTheme = (Theme: string) => {
  if (Theme === "Dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// urlUtils.js
export const updateQueryStringParameter = (key: string, value: string) => {
  //@ts-ignore
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url);
};
