import React from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">

                    {/* Logo */}
                    <div className="w-40 flex-shrink-0">
                        <img
                            src={assets.logoPNG}
                            alt="GURUKUL BAKERY"
                            className="h-16 md:h-20 lg:h-24"
                        />
                    </div>

                    {/* Link Columns */}
                    <div className="flex flex-col md:flex-row gap-x-12 w-full md:w-3/5">
                        <div>
                            <h3 className="text-gray-500 text-lg mb-4">QUICK LINKS</h3>
                            <ul className="space-y-2 text-sm font-light">
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4">Privacy Policy</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Terms of Service</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Contact</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-lg mb-4">JOIN US</h3>
                            <ul className="space-y-2 text-sm font-light">
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Careers </a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Coaching</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-lg mb-4">MORE..</h3>
                            <ul className="space-y-2 text-sm font-light">
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">About Us</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">E Books</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Gurukul Bakery</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Outlets</a></li>
                                <li><a href="#" className=" font-semibold hover:text-gray-900 hover:underline underline-offset-4
">Blogs</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-6 text-xl text-gray-600 mt-4 md:mt-0 md:ml-auto">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-600">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-red-600">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>

                </div>

                <div className="text-gray-500 font-semibold bborder-t border-gray-100 mt-8 pt-6 text-center md:text-left">
                    <p>© 2025, Gurukul Bakery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
