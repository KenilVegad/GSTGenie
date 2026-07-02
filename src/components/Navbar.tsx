import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, LifeBuoy, Info, User, Menu, X, Home, LogOut, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  const { setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'support', path: '/support', label: 'Support', icon: <LifeBuoy className="h-5 w-5" /> },
    { id: 'about', path: '/about', label: 'About', icon: <Info className="h-5 w-5" /> },
  ];

  const handleLanguageChange = (lang: 'en' | 'es' | 'fr' | 'hi' | 'gu') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const renderNavButton = (item: typeof navItems[0], isMobile: boolean = false) => {
    const isActive = currentPath === item.path;
    return (
      <Link
        key={item.id}
        to={item.path}
        className={`font-medium transition-all duration-300 flex items-center px-3 py-2 rounded-md
          ${isMobile 
            ? `text-lg w-full text-left ${isActive ? 'bg-secondary dark:bg-dark-secondary text-accent' : 'text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary'}`
            : `text-sm ${isActive ? 'bg-secondary dark:bg-dark-secondary text-accent' : 'text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary hover:text-accent'}`
          }
        `}
      >
        {item.icon}
        <span className="ml-3">{item.label}</span>
      </Link>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/90 dark:bg-dark-primary/90 backdrop-blur-md shadow-lg border-b border-secondary dark:border-dark-secondary' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <span className="font-bold text-xl text-primary dark:text-dark-primary">GSTGenie</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => renderNavButton(item))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary dark:text-dark-secondary hover:bg-secondary dark:hover:bg-dark-secondary focus:outline-none"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 rounded-full text-secondary dark:text-dark-secondary hover:bg-secondary dark:hover:bg-dark-secondary focus:outline-none"
              >
                <Globe className="h-5 w-5" />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-primary dark:bg-dark-primary rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <a href="#" onClick={() => handleLanguageChange('en')} className="block px-4 py-2 text-sm text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary">English</a>
                  <a href="#" onClick={() => handleLanguageChange('es')} className="block px-4 py-2 text-sm text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary">Español</a>
                  <a href="#" onClick={() => handleLanguageChange('fr')} className="block px-4 py-2 text-sm text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary">Français</a>
                  <a href="#" onClick={() => handleLanguageChange('hi')} className="block px-4 py-2 text-sm text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary">हिन्दी</a>
                  <a href="#" onClick={() => handleLanguageChange('gu')} className="block px-4 py-2 text-sm text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary">ગુજરાતી</a>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-secondary dark:bg-dark-secondary flex items-center justify-center overflow-hidden"
                >
                  <User className="h-6 w-6 text-primary dark:text-dark-primary" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-primary dark:bg-dark-primary rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary"
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Link>
                    <button
                      onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-accent hover:bg-opacity-80 text-primary dark:text-dark-primary font-semibold py-2 px-5 rounded-full text-sm transition-all duration-300"
              >
                Login
              </Link>
            )}
            
             {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-secondary dark:text-dark-secondary"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary dark:bg-dark-primary border-t border-secondary dark:border-dark-secondary p-4">
          <div className="space-y-3">
            {navItems.map((item) => renderNavButton(item, true))}
            {isAuthenticated && (
              <>
                <hr className="my-3 border-secondary dark:border-dark-secondary"/>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-left px-3 py-2 text-lg text-primary dark:text-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary rounded-md"
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center w-full text-left px-3 py-2 text-lg text-red-400 hover:bg-red-900/20 rounded-md"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
