import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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
                <div className="flex items-center gap-3">
                  {step === 'otp' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setStep('phone')}
                      className="h-8 w-8"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <h2 className="text-2xl font-serif font-semibold">
                    {step === 'phone' ? "Login with Phone" : "Enter OTP"}
                  </h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Form */}
              <motion.form
                key={step}
                initial={{ opacity: 0, x: step === 'phone' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  try {
                    if (step === 'phone') {
                      // Send OTP
                      if (!phoneNumber) {
                        alert("Please enter your phone number");
                        setLoading(false);
                        return;
                      }

                      const res = await fetch("http://localhost:3001/auth/send-otp", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          phoneNumber: phoneNumber,
                        }),
                      });

                      if (!res.ok) {
                        const error = await res.json();
                        alert(error.message || "Failed to send OTP");
                        setLoading(false);
                        return;
                      }

                      setOtpSent(true);
                      setStep('otp');
                      alert("OTP sent successfully! Check your phone.");
                    } else {
                      // Verify OTP
                      if (!otp || otp.length !== 6) {
                        alert("Please enter a valid 6-digit OTP");
                        setLoading(false);
                        return;
                      }

                      const res = await fetch("http://localhost:3001/auth/verify-otp", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          phoneNumber: phoneNumber,
                          otp: otp,
                        }),
                      });

                      if (!res.ok) {
                        const error = await res.json();
                        alert(error.message || "Invalid OTP");
                        setLoading(false);
                        return;
                      }

                      const data = await res.json();
                      localStorage.setItem("token", data.access_token);
                      // 15-minute token expiry (frontend-side)
                      const expiresAt = Date.now() + 15 * 60 * 1000;
                      localStorage.setItem("tokenExpiry", String(expiresAt));

                      const payload = JSON.parse(atob(data.access_token.split(".")[1]));
                      localStorage.setItem("userId", payload.sub);
                      localStorage.setItem("userRole", payload.role);
                      localStorage.setItem("userPhone", payload.phoneNumber);
                      setLoginSuccess(true);

                      // Close modal after short delay
                      setTimeout(() => {
                        onClose();
                        if (onLoginSuccess) {
                          onLoginSuccess();
                        }
                        window.location.reload();
                      }, 1500);
                    }
                  } catch (err) {
                    console.error(err);
                    alert("Something went wrong");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {step === 'phone' ? (
                  <>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phoneNumber" 
                          type="tel" 
                          placeholder="+91 9876543210" 
                          className="pl-10"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll send you a verification code
                      </p>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send OTP"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="otp" 
                          type="text" 
                          placeholder="123456" 
                          className="pl-10 text-center text-lg tracking-widest"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          maxLength={6}
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        OTP sent to {phoneNumber}
                      </p>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </>
                )}
              </motion.form>

              {/* Login success message */}
              {loginSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center font-medium">
                  ✅ Logged in successfully!
                </div>
              )}

              {/* Resend OTP */}
              {step === 'otp' && (
                <div className="mt-4 text-center">
                  <p className="text-muted-foreground text-sm">
                    Didn't receive the code?{" "}
                    <button
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const res = await fetch("http://localhost:3001/auth/send-otp", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ phoneNumber }),
                          });
                          if (res.ok) {
                            alert("OTP resent successfully!");
                          } else {
                            alert("Failed to resend OTP");
                          }
                        } catch (err) {
                          alert("Failed to resend OTP");
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="text-primary hover:underline font-medium"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};