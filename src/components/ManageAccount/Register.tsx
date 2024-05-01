import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserRound } from "lucide-react";
import { RegisterFn } from "./Register.Utils";

type RegisterProps = {
  setMode: (mode: string) => void;
  setOpen: (mode: boolean) => void;
};

export default function Register({ setMode, setOpen }: RegisterProps) {
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
      setError("The passwords do not match or some field is empty");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <form className="flex gap-3 flex-col justify-start items-start w-full " onSubmit={handleRegister}>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      {error && <p className="text-red-500">{error}</p>}
      {Message && <p className="dark:text-accent text-accent-foreground">{Message}</p>}
      <span className=" cursor-pointer hover:underline mt-5" onClick={() => setMode("Login")}>
        Already have an account?
      </span>

      <div className="mt-5 flex flex-row justify-end w-full">
        <Button type="submit" className="flex flex-row items-center justify-center gap-2">
          <UserRound className="size-5" />
          Create Account
        </Button>
      </div>
    </form>
  );
}
