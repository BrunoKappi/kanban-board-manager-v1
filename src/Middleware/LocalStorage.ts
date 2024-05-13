export const LOCALSTORAGE_SetItem = (Key: string = "", Data: any = "") => {
  localStorage.setItem(Key, Data);
};

export const LOCALSTORAGE_GetItem = (Key: string = "") => {
  return localStorage.getItem(Key);
};

export const LOCALSTORAGE_RemoveItem = (Key: string = "") => {
  localStorage.removeItem(Key);
};

export const LOCALSTORAGE_Clear = () => {
  localStorage.clear();
};
