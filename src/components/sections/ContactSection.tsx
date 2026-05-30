import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const now = new Date();
    const submittedAt = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

    try {
      const res = await fetch(
        "https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulCoursesInquiry/sheet1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheet1: {
              name: fd.get("name"),
              phoneNo: fd.get("phoneNo"),
              email: fd.get("email"),
              age: fd.get("age") || "—",
              message: fd.get("message"),
              submittedAt,
            },
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: "Visit Us", value: "Gurukul Bakery, Punjab, India" },
    { icon: Phone, label: "Call", value: "+91 89182 15576" },
    { icon: Mail, label: "Email", value: "hello@gurukulbakery.com" },
    { icon: Clock, label: "Hours", value: "Daily 8:00 AM – 9:00 PM" },
  ];

  return (
    <section className="section-padding bg-gradient-warm relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      <div className="container-bakery relative">
        <SectionHeader
          eyebrow="Get in Touch"
          title="We'd Love to Hear From You"
          description="Questions about orders, custom cakes, or our baking courses? Reach out — we're here to help."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Reveal direction="left">
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 p-5 rounded-2xl glass-panel"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}

              <div className="mt-6 rounded-3xl overflow-hidden border border-border/50 shadow-card aspect-[16/10] bg-muted">
                <iframe
                  title="Gurukul Bakery location"
                  src="https://maps.google.com/maps?q=Punjab%20India&output=embed"
                  className="w-full h-full border-0 grayscale-[30%] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="bg-background/50 border-border/80 focus:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    name="phoneNo"
                    type="tel"
                    required
                    placeholder="+91 ..."
                    className="bg-background/50 border-border/80"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="bg-background/50 border-border/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your order or inquiry..."
                  className="bg-background/50 border-border/80 resize-none"
                />
              </div>

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">Thank you! We'll be in touch soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive font-medium">Something went wrong. Please try again.</p>
              )}

              <MagneticButton className="w-full">
                <Button type="submit" variant="hero" size="lg" className="w-full rounded-full" disabled={loading}>
                  {loading ? "Sending..." : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </MagneticButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
