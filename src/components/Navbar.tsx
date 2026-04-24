import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import logo from "/assets/logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPage, setCurrentPage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const base = '/auditions';

  const pageToPath: Record<typeof currentPage, string> = {
    home: `${base}/`,
    about: `${base}/about`,
    auditions: `${base}/register`,
    rules: `${base}/rules`,
    faq: `${base}/faq`,
    contact: `${base}/contact`,
    payment: `${base}/payment`,
    'login': `${base}/login`,
    'admin-dashboard': `${base}/admin-dashboard`,
    'form-management': `${base}/form-management`,
  };

  const pathToPage: Record<string, typeof currentPage> = {
    [pageToPath.home]: 'home',
    [pageToPath.about]: 'about',
    [pageToPath.auditions]: 'auditions',
    [pageToPath.rules]: 'rules',
    [pageToPath.faq]: 'faq',
    [pageToPath.contact]: 'contact',
    [pageToPath.payment]: 'payment',
    [pageToPath['login']]: 'login',
    [pageToPath['admin-dashboard']]: 'admin-dashboard',
    [pageToPath['form-management']]: 'form-management',
  };

  useEffect(() => {
    setCurrentPage(pathToPage[location.pathname] || 'home');
  }, [location.pathname, setCurrentPage]);

  const navItems = [
    { name: 'Home', page: 'home' as const },
    { name: 'About', page: 'about' as const },
    { name: 'Auditions', page: 'auditions' as const, highlight: true },
    { name: 'Rules', page: 'rules' as const },
    { name: 'FAQ', page: 'faq' as const },
    { name: 'Contact', page: 'contact' as const },
  ];

  const handleNavClick = (page: typeof currentPage) => {
    navigate(pageToPath[page]);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/auditions')}>
            <img
              src={logo}
              alt="KKC Talent Show"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-amber-500">KKC Talent Show</h1>
              <p className="text-xs text-gray-400">Season 1 - 2026</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`
                  ${currentPage === item.page ? 'text-amber-500' : 'text-gray-300'}
                  ${item.highlight ? 'bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-400' : 'hover:text-amber-500'}
                  transition-colors duration-200
                `}
              >
                {item.name}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick('login')}
            >
              Login
            </Button>
          </div>

          <button
            className="md:hidden text-amber-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-amber-500/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`
                  block w-full text-left px-4 py-3 rounded-lg
                  ${currentPage === item.page ? 'bg-amber-500 text-black' : 'text-gray-300 hover:bg-gray-800'}
                  transition-colors duration-200
                `}
              >
                {item.name}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick('login')}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
