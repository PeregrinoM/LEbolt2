import React, { useState, useEffect } from 'react';
import { Book, Menu, X, Shield, Users, Clock } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: '🏠' },
    { id: 'libros', label: 'Libros', icon: '📚' },
    { id: 'testimonios', label: 'Testimonios', icon: '💬' },
    { id: 'solicitar', label: 'Solicitar', icon: '📝' },
    { id: 'preguntas', label: 'Preguntas', icon: '❓' },
    { id: 'contacto', label: 'Contacto', icon: '📞' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-celestial-100' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-celestial-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra de credibilidad superior */}
        <div className="hidden md:flex justify-center items-center py-2 text-xs font-source text-esperanza-600 border-b border-celestial-50">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3 text-green-500" />
              <span>1.500 libros entregados</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-celestial-500" />
              <span>Más de 2 años divulgando esperanza</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-dorado-500" />
              <span>100% gratuito y seguro</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-celestial-500" />
            <span className="text-xl font-poppins font-bold text-gradient-celestial">
              Libros Amparo y Fortaleza
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-source text-esperanza-600 hover:text-celestial-500 transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-celestial-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button , (boton de las 3 rayas*/}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-esperanza-600 hover:text-celestial-500 hover:bg-celestial-50 transition-all duration-200 mobile-touch-target"
          >
            <div className="relative w-6 h-2">
              <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-110 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-1 space-y-1">
            {menuItems.map((item, index) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left font-source text-esperanza-600 hover:text-celestial-500 hover:bg-celestial-50 transition-all duration-200 p-4 rounded-xl flex items-center space-x-3 mobile-touch-target animate-slide-in-mobile`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
            
            {/* CTA especial en menú móvil */}
            <div className="pt-4 border-t border-celestial-100 mt-4">
              <button
                onClick={() => scrollToSection('solicitar')}
                className="w-full btn-celestial py-4 px-6 rounded-xl font-poppins font-semibold text-center flex items-center justify-center space-x-2"
              >
                <span>📖</span>
                <span>Solicitar tu libro gratuito</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay para cerrar menú */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;