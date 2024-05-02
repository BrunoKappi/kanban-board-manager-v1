import { MIDDLEWARE_LoginWithGoogle, MIDDLEWARE_Register } from "@/Middleware/Auth";

export function getKeysWithSubstring(substring: string) {
  const keys = [];

  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      if (key.includes(substring)) {
        keys.push(key);
      }
    }
  }

  return keys;
}

export function getKeysWithoutSubstring(substring: string) {
  const keys = [];

  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      if (key.includes(substring)) {
        keys.push(key.replace(substring, ""));
      }
    }
  }

  return keys;
}

type RegisterFnProps = {
  email: string;
  password: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
};

export const RegisterFn = async ({ email, password, setOpen, setError, setMessage }: RegisterFnProps) => {
  MIDDLEWARE_Register({ email, password, setOpen, setError, setMessage });
};


type LoginGoogleFnProps = {
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
};

export const RegisterWithGoogleFn = async ({ setOpen, setError }: LoginGoogleFnProps) => {
  MIDDLEWARE_LoginWithGoogle({ setOpen, setError });
};
