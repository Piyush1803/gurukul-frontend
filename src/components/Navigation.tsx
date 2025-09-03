import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

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
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
    window.location.reload();
  };

const navItems = [
  { to: "home", label: "Home", type: "scroll" },
  { to: "about", label: "About", type: "scroll" },
  { to: "products", label: "Products", type: "scroll" },
  ...(userRole === "admin"
    ? [{ to: "/admin", label: "Admin", type: "route" }]
    : []),
];



  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-background/95 backdrop-blur-sm border-b shadow-soft sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <NavLink
              to="/"
              className="text-2xl font-serif font-bold text-primary"
            >
              Gurukul Bakery
            </NavLink>
            {userRole === "admin" && (
              <span className="mt-1 px-2 py-0.5 rounded bg-red-100 text-red-600 text-xs font-semibold">
                admin
              </span>
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
  item.type === "scroll" ? (
    <ScrollLink
      key={item.to}
      to={item.to}
      smooth={true}
      duration={600}
      spy={true}
      offset={-70}
      className="relative font-medium cursor-pointer select-none text-muted-foreground hover:text-primary transition-colors duration-300"
      activeClass="text-primary"
    >
      {item.label}
    </ScrollLink>
  ) : (
    <NavLink
      key={item.to}
      to={item.to}
      className="relative font-medium cursor-pointer select-none text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      {item.label}
    </NavLink>
  )
)}


          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-bakery-orange text-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Button>

            {/* Login / Logout Button */}
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5 text-red-500" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={onLoginClick}>
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur-sm"
          >
<div className="px-4 py-4 flex flex-col space-y-2">
{navItems.map((item) =>
  item.type === "scroll" ? (
    <ScrollLink
      key={item.to}
      to={item.to}
      smooth={true}
      duration={600}
      spy={true}
      offset={-70}
      className="relative font-medium cursor-pointer select-none text-muted-foreground hover:text-primary transition-colors duration-300"
      activeClass="text-primary"
    >
      {item.label}
    </ScrollLink>
  ) : (
    <NavLink
      key={item.to}
      to={item.to}
      className="relative font-medium cursor-pointer select-none text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      {item.label}
    </NavLink>
  )
)}



              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
