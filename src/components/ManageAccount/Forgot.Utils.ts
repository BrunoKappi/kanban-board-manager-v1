import { MIDDLEWARE_Forgot } from "@/Middleware/Auth";

type ForgotFnProps = {
  email: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
};

export const ForgotFn = async ({ email, setOpen, setError, setMessage }: ForgotFnProps) => {
  if (!email) return;
  MIDDLEWARE_Forgot({ email, setOpen, setError, setMessage });
};
 