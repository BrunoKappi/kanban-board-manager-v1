import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginFn } from "./Login.Utils";

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
  return (
    <form className="flex gap-3 flex-col justify-start items-start w-full " onSubmit={handleLogin}>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
