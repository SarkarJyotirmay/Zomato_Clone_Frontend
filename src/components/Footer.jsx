import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a1d37] text-white px-6 py-10 md:px-20">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-orange-500">EatZy</h1>
          <p className="text-sm mt-3">
            Your go-to place for delicious food at your doorstep. Made with ❤️ by Jyotirmay.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-400">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="#" className="hover:text-orange-400 transition">Restaurants</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-400">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white text-[#0a1d37] hover:bg-orange-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-white text-[#0a1d37] hover:bg-orange-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-white text-[#0a1d37] hover:bg-orange-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-white text-[#0a1d37] hover:bg-orange-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} EatZy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
