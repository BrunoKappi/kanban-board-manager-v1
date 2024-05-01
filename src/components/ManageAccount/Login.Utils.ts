import { MIDDLEWARE_Login } from "@/Middleware/Auth";

type LoginFnProps = {
  email: string;
  password: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
};

export const LoginFn = async ({ email, password, setOpen, setError }: LoginFnProps) => {
  if (!email || !password) return;
  MIDDLEWARE_Login({ email, password, setOpen, setError });
};
