import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { ForgotFn } from "./Forgot.Utils";
import { MAX_CARD_EMAIL } from "@/Data/Limits";
import { useSelector } from "react-redux";

type ForgotProps = {
  setMode: (mode: string) => void;
  setOpen: (mode: boolean) => void;
};

export default function Forgot({ setMode, setOpen }: ForgotProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const [email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleForgot = async (e: any) => {
    e.preventDefault();
    if (email) {
      ForgotFn({ email, setOpen, setError, setMessage });
    }
  };
  return (
    <form className="flex gap-3 flex-col justify-start items-start w-full " onSubmit={handleForgot}>
      <Input maxLength={MAX_CARD_EMAIL} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      {error && <p className="text-red-500">{error}</p>}
      {Message && <p className="dark:text-accent text-accent-foreground">{Message}</p>}
      <span className=" cursor-pointer hover:underline mt-3" onClick={() => setMode("Login")}>
        {Translations.Forgot.Back}
      </span>

      <div className="mt-5 flex flex-row justify-end w-full">
        <Button type="submit" className="flex flex-row items-center justify-center gap-2">
          <Mail className="size-5" />
          {Translations.Buttons.Forgot}
        </Button>
      </div>
    </form>
  );
}
