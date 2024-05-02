import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FIREBASE_LoginWithEmailPassword, FIREBASE_LoginWithGoogle } from "@/Config/Firebase/Auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MAX_CARD_EMAIL, MAX_CARD_PASSWORD } from "@/Data/Limits";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    FIREBASE_LoginWithEmailPassword(email, password)
      .then(() => {})
      .catch((Error) => {
        setError(Error.code);
      });
  };

  const loginWithGoogle = async () => {
    FIREBASE_LoginWithGoogle()
      .then(() => {})
      .catch(() => {
        setError("Email or password incorrect");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <span>Login</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 flex-col justify-center items-center  p-10 w-full">
            <Input maxLength={MAX_CARD_EMAIL} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input maxLength={MAX_CARD_PASSWORD} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>Entrar</Button>
            <Button onClick={loginWithGoogle}>Entrar com Google</Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
