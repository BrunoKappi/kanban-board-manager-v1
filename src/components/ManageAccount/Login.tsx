import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginFn, LoginWithGoogleFn } from "./Login.Utils";
import Google from "@/Assets/Google.svg";
import { MAX_CARD_EMAIL, MAX_CARD_PASSWORD } from "@/Data/Limits";

type LoginProps = {
  setMode: (mode: string) => void;
  setOpen: (mode: boolean) => void;
};

export default function Login({ setMode, setOpen }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    LoginFn({ email, password, setOpen, setError });
  };

  const handleLoginWithGoogle = () => {
    LoginWithGoogleFn({ setOpen, setError });
  };
  return (
    <form className="flex gap-3 flex-col justify-start items-start w-full " onSubmit={handleLogin}>
      <Input maxLength={MAX_CARD_EMAIL} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
      <Input maxLength={MAX_CARD_PASSWORD} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value.trim())} />
      <div className="px-3 py-2 border w-full rounded-md flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-overlay dark:hover:bg-overlay-dark dark:border-border-dark" onClick={handleLoginWithGoogle}>
        <img src={Google} alt="" className="size-6" />
        Login with Google
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <span className=" cursor-pointer hover:underline mt-5" onClick={() => setMode("Forgot")}>
        Forgot Password?
      </span>
      <span className=" cursor-pointer hover:underline" onClick={() => setMode("Create")}>
        Create Account
      </span>
      <div className="mt-5 flex flex-row justify-end w-full">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
