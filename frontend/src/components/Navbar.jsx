// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus, FaUserCircle, FaPlusCircle, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import useUserStore from '../stores/useUserStore';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Switch languages
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-emerald-400 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo-no-bg.png" alt="Logo" className="h-11" />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="flex items-center text-base hover:text-gray-300 transition">
            <FaHome className="mr-2" /> <span className = "mt-2">{t('home')}</span>
          </Link>
          {user ? (
            <>
              <Link
                to="/create-post"
                className="flex items-center text-base hover:text-gray-300 transition"
              >
                <FaPlusCircle className="mr-2" /> <span className = "mt-2">{t('createPost')}</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center text-base hover:text-gray-300 transition"
              >
                <FaUserCircle className="mr-2" /> <span className = "mt-2">{t('profile')}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-400 transition"
              >
                <FaSignOutAlt className="mr-2" /> <span className = "mt-2">{t('logout')}</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-base hover:text-gray-300 transition"
              >
                <FaSignInAlt className="mr-2" /> <span className = "mt-2">{t('login')}</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center text-base hover:text-gray-300 transition"
              >
                <FaUserPlus className="mr-2" /> <span className = "mt-2">{t('register')}</span>
              </Link>
            </>
          )}
          {/* Language Switcher */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleLanguageChange(i18n.language === 'ar' ? 'fr' : 'ar')}>
            <FaGlobe className="mr-1" />
            <span className = "mt-2">{i18n.language === 'ar' ? 'Français' : 'العربية'}</span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-emerald-600 text-white transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <Link
          to="/"
          className="block py-2 px-4 flex items-center text-base hover:bg-blue-800 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaHome className="mr-2" /> <span className = "mt-2">{t('home')}</span>
        </Link>
        {user ? (
          <>
            <Link
              to="/create-post"
              className="block py-2 px-4 text-base hover:bg-blue-800 transition flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaPlusCircle className="mr-2" /> <span className = "mt-2">{t('createPost')}</span>
            </Link>
            <Link
              to="/profile"
              className="block py-2 px-4 flex items-center text-base hover:bg-blue-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserCircle className="mr-2" /> <span className = "mt-2">{t('profile')}</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="py-2 px-3 text-sm bg-red-500 inline-flex items-center rounded hover:bg-red-400 transition"
            >
              <FaSignOutAlt className="mr-2" /> <span className = "mt-2">{t('logout')}</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block py-2 px-4 flex items-center text-base hover:bg-blue-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSignInAlt className="mr-2" /> <span className = "mt-2">{t('login')}</span>
            </Link>
            <Link
              to="/register"
              className="block py-2 px-4 flex items-center text-base hover:bg-blue-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserPlus className="mr-2" /> <span className = "mt-2">{t('register')}</span>
            </Link>
          </>
        )}
        {/* Mobile Language Switcher */}
        <div
          className="flex items-center space-x-2 cursor-pointer py-2 px-4"
          onClick={() => handleLanguageChange(i18n.language === 'ar' ? 'fr' : 'ar')}
        >
          <FaGlobe className="mr-1" />
          <span>{i18n.language === 'ar' ? 'Français' : 'العربية'}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

