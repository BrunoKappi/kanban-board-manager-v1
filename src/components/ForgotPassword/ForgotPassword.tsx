import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FIREBASE_LoginWithEmailPassword } from "@/Config/Firebase/Auth";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { MAX_CARD_EMAIL, MAX_CARD_PASSWORD } from "@/Data/Limits";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) return;
    FIREBASE_LoginWithEmailPassword(email, password)
      .then(() => {})
      .catch(() => {
        setError("Email or password incorrect");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center gap-2 justify-start cursor-pointer ">
          <LogIn />
          <span>Login</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[550px] bg-background dark:bg-card-foreground border dark:border-border-dark p-10">
        <DialogHeader className="mb-8">
          <DialogTitle className="dark:text-accent text-accent-foreground">Login</DialogTitle>
          <DialogDescription className="dark:text-accent text-accent-foreground">Access your account to save your work</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 flex-col justify-start items-start w-full ">
          <Input maxLength={MAX_CARD_EMAIL} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input maxLength={MAX_CARD_PASSWORD} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleLogin}>Login</Button>
          <LogIn />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
