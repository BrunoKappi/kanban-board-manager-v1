import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserRound } from "lucide-react";
import { RegisterFn, RegisterWithGoogleFn } from "./Register.Utils";
import Google from "@/Assets/Google.svg";
import { MAX_CARD_EMAIL, MAX_CARD_PASSWORD } from "@/Data/Limits";
import { useSelector } from "react-redux";

type RegisterProps = {
  setMode: (mode: string) => void;
  setOpen: (mode: boolean) => void;
}; 

export default function Register({ setMode, setOpen }: RegisterProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [Message, setMessage] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (email && password && confirmPassword && password === confirmPassword) {
      RegisterFn({ email, password, setError, setOpen, setMessage });
    } else {
      setError(Translations.Register.ErrorPasswordMatch);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleLoginWithGoogle = () => {
    RegisterWithGoogleFn({ setOpen, setError });
  };

  return (
    <form className="flex gap-3 flex-col justify-start items-start w-full " onSubmit={handleRegister}>
      <Input maxLength={MAX_CARD_EMAIL} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input maxLength={MAX_CARD_PASSWORD} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input maxLength={MAX_CARD_PASSWORD} type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <div className="px-3 py-2 border w-full rounded-md flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-overlay dark:hover:bg-overlay-dark dark:border-border-dark" onClick={handleLoginWithGoogle}>
        <img src={Google} alt="" className="size-6" />
        {Translations.Buttons.RegisterWithGoogle}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {Message && <p className="dark:text-accent text-accent-foreground">{Message}</p>}
      <span className=" cursor-pointer hover:underline mt-5" onClick={() => setMode("Login")}>
        {Translations.Register.Back}
      </span>

      <div className="mt-5 flex flex-row justify-end w-full">
        <Button type="submit" className="flex flex-row items-center justify-center gap-2">
          <UserRound className="size-5" />
          {Translations.Buttons.CreateAccount}
        </Button>
      </div>
    </form>
  );
}
