import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onCartClick: () => void;
  onLoginClick: () => void;
  cartItemsCount?: number;
}

export const Navigation = ({
  onCartClick,
  onLoginClick,
  cartItemsCount = 0,
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { to: "home", label: "Home", type: "scroll" as const },
    { to: "about", label: "About", type: "scroll" as const },
    { to: "products", label: "Menu", type: "scroll" as const },
    { to: "gallery", label: "Gallery", type: "scroll" as const },
    { to: "contact", label: "Contact", type: "scroll" as const },
    ...(userRole === "admin" ? [{ to: "/admin", label: "Admin", type: "route" as const }] : []),
  ];

  const handleScrollNavClick = (targetId: string) => {
    if (location.pathname === "/") return;
    navigate("/", { state: { scrollTo: targetId } });
    setIsOpen(false);
  };

  const linkClass =
    "relative font-medium text-sm tracking-wide text-foreground/80 hover:text-primary transition-all duration-300 py-2 hover:scale-[1.03]";

  const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
    if (item.type === "route") {
      return (
        <NavLink to={item.to} className={linkClass}>
          {item.label}
        </NavLink>
      );
    }
    if (location.pathname === "/") {
      return (
        <ScrollLink
          to={item.to}
          smooth
          duration={600}
          spy
          offset={-80}
          activeClass="!text-primary"
          className={cn(linkClass, "cursor-pointer")}
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </ScrollLink>
      );
    }
    return (
      <button type="button" onClick={() => handleScrollNavClick(item.to)} className={linkClass}>
        {item.label}
      </button>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || location.pathname !== "/"
            ? "glass-nav shadow-soft py-0 bg-background/95 backdrop-blur-xl border-b border-border/80"
            : "glass-nav py-1 bg-background/60 backdrop-blur-lg border-b border-border/30"
        )}
      >
        <nav className="container-bakery">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
              <NavLink to="/" className="flex items-center gap-2 group">
                <Wheat className="h-6 w-6 text-primary group-hover:text-bakery-orange transition-colors" />
                <span className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                  Gurukul
                </span>
              </NavLink>
              {userRole === "admin" && (
                <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold uppercase">
                  admin
                </span>
              )}
            </motion.div>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <NavItem key={item.to} item={item} />
              ))}
              <Link to="/courses" className={linkClass}>
                Courses
              </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" onClick={onCartClick} className="relative rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-bakery-gold text-bakery-chocolate text-[10px] rounded-full h-5 min-w-5 px-1 flex items-center justify-center font-bold"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Button>

              {isLoggedIn ? (
                <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
                  <LogOut className="h-5 w-5 text-destructive" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={onLoginClick} className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-bakery-chocolate/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[min(100%,320px)] glass-panel border-l shadow-warm lg:hidden"
            >
              {/* Close Button Inside Drawer */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors text-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col h-full p-6 pt-20">
                <div className="flex flex-col gap-1 flex-1">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavItem item={item} />
                    </motion.div>
                  ))}
                  <Link
                    to="/courses"
                    onClick={() => setIsOpen(false)}
                    className={cn(linkClass, "block")}
                  >
                    Courses
                  </Link>
                </div>
                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 w-full py-3 rounded-xl text-destructive font-medium bg-destructive/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
