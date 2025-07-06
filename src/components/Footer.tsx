import React from 'react';
import { Book, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-esperanza-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-8 w-8 text-celestial-400" />
              {/* EDITABLE: Nombre de la marca en el footer */}
              <span className="text-xl font-poppins font-bold">Libros de Esperanza</span>
            </div>
            {/* EDITABLE: Descripción de la organización */}
            <p className="font-source text-gray-300 leading-relaxed mb-4">
              Compartiendo esperanza y transformación a través de libros que han 
              iluminado millones de vidas durante más de 150 años. Completamente 
              gratuito, enviado con amor.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="h-4 w-4 text-red-400 mr-2" />
              {/* EDITABLE: Mensaje de ubicación */}
              <span className="text-sm font-source">Hecho con amor para Chile</span>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            {/* EDITABLE: Título de enlaces rápidos */}
            <h3 className="text-lg font-poppins font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {/* EDITABLE: Enlaces del footer (deben coincidir con la navegación) */}
              <li>
                <button 
                  onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-source text-gray-300 hover:text-celestial-400 transition-colors duration-200"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('libros')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-source text-gray-300 hover:text-celestial-400 transition-colors duration-200"
                >
                  Los Libros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('testimonios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-source text-gray-300 hover:text-celestial-400 transition-colors duration-200"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('solicitar')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-source text-gray-300 hover:text-celestial-400 transition-colors duration-200"
                >
                  Solicitar Libro
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('preguntas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-source text-gray-300 hover:text-celestial-400 transition-colors duration-200"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            {/* EDITABLE: Título de contacto */}
            <h3 className="text-lg font-poppins font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-celestial-400 mr-2" />
                {/* EDITABLE: Email de contacto (debe coincidir con Contact.tsx) */}
                <span className="font-source text-gray-300 text-sm">librosdeesperanza@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-green-400 mr-2" />
                {/* EDITABLE: Teléfono de contacto (debe coincidir con Contact.tsx) */}
                <span className="font-source text-gray-300 text-sm">+56 9 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-esperanza-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-source text-gray-400 text-sm mb-4 md:mb-0">
              {/* EDITABLE: Texto de copyright */}
              © {currentYear} Libros de Esperanza. Todos los derechos reservados.
            </div>
            <div className="font-source text-gray-400 text-sm">
              {/* EDITABLE: Enlaces legales y país */}
              <span>Privacidad • Términos • </span>
              <span className="text-celestial-400">Chile 🇨🇱</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          {/* EDITABLE: Versículo bíblico o cita inspiracional */}
          <p className="font-source text-gray-400 text-sm italic">
            "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, 
            pensamientos de paz, y no de mal, para daros el fin que esperáis." - Jeremías 29:11
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;