
import React, { useState } from "react";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { assets } from '../assets/assets'

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sampleImages = [
        assets.icecubes, assets.darkForestCake, assets.butterScotchPastry, assets.logo,
    ];

    const navLinks = ["Shop", "Our Menu", "Gift Hampers", "About Us", "E-Books", "Blogs"];

    return (
        <header className="sticky top-0 z-50 w-full  bg-white uppercase">
            <div className="flex items-center justify-between px-4 py-3 md:py-5 md:px-10">

                <div className="flex items-center gap-4 md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <Search className="w-5 h-5" />
                </div>


                <div className="text-center md:flex-1">
                    <a href="/">
                        <img
                            src={assets.logo}
                            alt="GURUKUL BAKERY"
                            className="h-16 md:h-20 lg:h-24 mx-auto"
                        />
                    </a>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Search className="w-5 h-5 cursor-pointer" />
                    <User className="w-5 h-5 cursor-pointer" />
                    <ShoppingCart className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            <nav className={`md:flex justify-center ${mobileMenuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col md:flex-row gap-6 text-center md:text-sm py-4 md:py-2">
                    {navLinks.map((link) => (
                        <li key={link}
                            onMouseEnter={() => link === "Shop" && setDropdownOpen(true)}
                            onMouseLeave={() => link === "Shop" && setDropdownOpen(false)}
                            className="relative">

                            <a href="#" className="relative hover:text-yellow-600 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full">
                                {link}
                            </a>
                            {link === "Shop" && dropdownOpen && (
                                <div
                                    className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-[80vw] bg-white shadow-lg p-6 z-40"
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {sampleImages.map((imgSrc, index) => (
                                            <div key={index} className="w-full h-40 overflow-hidden rounded shadow">
                                                <img
                                                    src={imgSrc}
                                                    alt={`Sample ${index}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
