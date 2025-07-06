import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Gift, Users, Award, Clock } from 'lucide-react';

const Hero = () => {
  const [counter, setCounter] = useState(0);
  // EDITABLE: Número objetivo del contador
  const targetCount = 12847;

  useEffect(() => {
    // EDITABLE: Duración de la animación del contador (en milisegundos)
    const duration = 2000; // 2 segundos
    const increment = targetCount / (duration / 50);
    
    const timer = setInterval(() => {
      setCounter(prev => {
        const next = prev + increment;
        if (next >= targetCount) {
          clearInterval(timer);
          return targetCount;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('solicitar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-celestial-200 to-dorado-200 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-lg border border-celestial-100">
                <BookOpen className="h-20 w-20 text-celestial-500" />
              </div>
            </div>
          </div>
          
          {/* EDITABLE: Título principal */}
          <h1 className="text-5xl md:text-7xl font-poppins font-bold text-esperanza-800 mb-8 leading-tight tracking-tight">
            Encuentra la{' '}
            <span className="text-gradient-celestial">
              Esperanza
            </span>{' '}
            que hay en{' '}
            <span className="text-gradient-celestial">
               Dios
            </span>
          </h1>
          
          {/* EDITABLE: Subtítulo/descripción principal */}
          <p className="text-xl md:text-2xl font-source text-esperanza-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            En un mundo acelerado e incierto, te ofrecemos libros que han transformado millones de vidas. 
            Recibe gratuitamente obras que iluminarán tu camino a Jesús.
          </p>

          {/* Contador de impacto */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-celestial-50 px-8 py-4 rounded-full border border-green-200 shadow-lg">
              <Users className="h-6 w-6 text-green-500 mr-3" />
              <span className="text-3xl font-poppins font-bold text-green-600">
                {Math.floor(counter).toLocaleString()}
              </span>
              {/* EDITABLE: Texto del contador */}
              <span className="text-lg font-source text-green-700 ml-2">
                libros entregados con amor
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {/* EDITABLE: Características destacadas */}
            <div className="flex items-center space-x-3 text-green-600">
              <Gift className="h-6 w-6" />
              <span className="font-source font-semibold text-lg">Completamente gratuito</span>
            </div>
            <div className="flex items-center space-x-3 text-celestial-600">
              <Heart className="h-6 w-6" />
              <span className="font-source font-semibold text-lg">Enviado con amor</span>
            </div>
            <div className="flex items-center space-x-3 text-dorado-600">
              <Award className="h-6 w-6" />
              {/* EDITABLE: Años de experiencia */}
              <span className="font-source font-semibold text-lg">5+ años transformando vidas</span>
            </div>
          </div>

          {/* EDITABLE: Texto del botón principal */}
          <button
            onClick={scrollToForm}
            className="btn-celestial py-5 px-10 rounded-full text-xl font-poppins font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Solicitar mi libro gratuito
          </button>

          {/* EDITABLE: Texto informativo inferior */}
          <p className="text-sm font-source text-esperanza-500 mt-6">
            📍 Disponible solo para Chile • Sin costo de envío • Rapida Entrega
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;