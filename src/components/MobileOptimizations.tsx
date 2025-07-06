import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, MessageCircle, Wifi } from 'lucide-react';

// 1. Botón flotante de acción rápida para móviles
export const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('solicitar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Botón principal de solicitar libro */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={scrollToForm}
          className="bg-gradient-to-r from-celestial-500 to-celestial-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2"
        >
          <MessageCircle className="h-6 w-6" />
          {/* EDITABLE: Texto del botón flotante */}
          <span className="font-poppins font-semibold">Solicitar</span>
        </button>
      </div>

      {/* Botón de scroll to top */}
      {isVisible && (
        <div className="fixed bottom-24 right-6 z-40 md:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white/90 backdrop-blur-sm text-esperanza-700 p-3 rounded-full shadow-lg border border-celestial-200 hover:bg-white transition-all duration-300"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
};

// 2. Indicador de conexión y carga progresiva
export const ConnectionIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed top-20 left-4 right-4 z-50 md:hidden">
        <div className="bg-red-500 text-white p-3 rounded-lg shadow-lg flex items-center">
          <Wifi className="h-5 w-5 mr-2" />
          {/* EDITABLE: Mensaje de sin conexión */}
          <span className="font-source text-sm">Sin conexión - Algunos contenidos pueden no cargar</span>
        </div>
      </div>
    );
  }

  return null;
};