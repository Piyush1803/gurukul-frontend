import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="w-full max-w-md bg-background rounded-2xl shadow-warm border p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-semibold">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Form */}
              <motion.form
 key={isLogin ? "login" : "signup"}
  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
  animate={{ opacity: 1, x: 0 }}
  className="space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      if (isLogin) {
        // ✅ LOGIN request
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        });

        if (!res.ok) {
          alert("Invalid login credentials");
          return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.access_token);

        const payload = JSON.parse(atob(data.access_token.split(".")[1]));
        localStorage.setItem("userId", payload.sub);

        alert("Login successful");
        onClose();
        window.location.reload();
      } else {
        // ✅ SIGNUP request
        const username = (document.getElementById("username") as HTMLInputElement).value;

        const res = await fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (!res.ok) {
          alert("Signup failed");
          return;
        }

        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }}
>
  {!isLogin && (
  <div>
    <Label htmlFor="username">Username</Label>
    <div className="relative">
      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input id="username" type="text" placeholder="Username" className="pl-10" />
    </div>
  </div>
)}

<div>
  <Label htmlFor="email">Email</Label>
  <div className="relative">
    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input id="email" type="email" placeholder="Email" className="pl-10" />
  </div>
</div>

<div>
  <Label htmlFor="password">Password</Label>
  <div className="relative">
    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input id="password" type="password" placeholder="Password" className="pl-10" />
  </div>
</div>

<Button type="submit" className="w-full">
  {isLogin ? "Login" : "Signup"}
</Button>
</motion.form>


              {/* Toggle */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  {" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline font-medium"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              {/* Note about backend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-3 bg-secondary/50 rounded-lg border text-sm text-muted-foreground text-center"
              >
                Connect Supabase for full authentication functionality
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};