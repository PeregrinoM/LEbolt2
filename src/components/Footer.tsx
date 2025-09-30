import React from 'react';
import { Book, Heart } from 'lucide-react';

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
              <span className="text-xl font-poppins font-bold">Libros de Luz y Esperanza</span>
            </div>
            {/* EDITABLE: Descripción de la organización */}
            <p className="font-source text-gray-300 leading-relaxed mb-4">
              Compartiendo esperanza y transformación a través de libros que han 
              iluminado millones de vidas. Completamente 
              gratuito.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="h-4 w-4 text-red-400 mr-2" />
              {/* EDITABLE: Mensaje de ubicación */}
              <span className="text-sm font-source">Hecho y enviado con amor.</span>
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
                  Solicitar
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
              {/* Email */}
              <a 
                href="mailto:peregrinomensajero@gmail.com" 
                className="flex items-center group hover:text-celestial-400 transition-colors duration-200"
                title="Enviar email"
              >
                <div className="bg-blue-500 p-2 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-200">
                  <i className="fas fa-envelope h-5 w-5 text-white"></i>
                </div>
                <div className="hidden sm:block">
                  <span className="font-source text-gray-300 text-sm group-hover:text-celestial-400">peregrinomensajero@gmail.com</span>
                </div>
              </a>
              
              {/* WhatsApp */}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  const phoneNumber = "56984413846";
                  const message = encodeURIComponent("¡Hola! Vi su página web y me interesa recibir información sobre los libros.");
                  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappURL, '_blank');
                }}
                className="flex items-center group hover:text-green-400 transition-colors duration-200"
                title="Contactar por WhatsApp"
              >
                <div className="bg-whatsapp-500 p-2 rounded-full mr-3 group-hover:bg-whatsapp-400 transition-colors duration-200">
                  <i className="fab fa-whatsapp h-5 w-5 text-white"></i>
                </div>
                <div className="hidden sm:block">
                  <span className="font-source text-gray-300 text-sm group-hover:text-green-400">WhatsApp</span>
                </div>
              </a>
              
              {/* Teléfono */}
              <a 
                href="tel:+56984413846"
                className="flex items-center group hover:text-green-400 transition-colors duration-200"
                title="Llamar por teléfono"
              >
                <div className="bg-green-500 p-2 rounded-full mr-3 group-hover:bg-green-400 transition-colors duration-200">
                  <i className="fas fa-phone h-5 w-5 text-white"></i>
                </div>
                <div className="hidden sm:block">
                  <span className="font-source text-gray-300 text-sm group-hover:text-green-400">+56 9 8441 3846</span>
                </div>
              </a>
            </div>
            
            {/* Redes Sociales */}
            <div className="mt-6">
              <h4 className="text-sm font-poppins font-semibold mb-3 text-gray-300">Síguenos</h4>
              <div className="flex space-x-3">
                {/* YouTube */}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Reemplazar con tu canal de YouTube
                    // window.open('https://youtube.com/@tu-canal', '_blank');
                    console.log('TODO: Agregar enlace de YouTube');
                  }}
                  className="group"
                  title="YouTube"
                >
                  <div className="bg-red-600 p-2 rounded-full group-hover:bg-red-500 transition-colors duration-200">
                    <i className="fab fa-youtube h-5 w-5 text-white"></i>
                  </div>
                </a>
                
                {/* Facebook */}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Reemplazar con tu página de Facebook
                    // window.open('https://facebook.com/tu-pagina', '_blank');
                    console.log('TODO: Agregar enlace de Facebook');
                  }}
                  className="group"
                  title="Facebook"
                >
                  <div className="bg-blue-600 p-2 rounded-full group-hover:bg-blue-500 transition-colors duration-200">
                    <i className="fab fa-facebook-f h-5 w-5 text-white"></i>
                  </div>
                </a>
                
                {/* Instagram */}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Reemplazar con tu perfil de Instagram
                    // window.open('https://instagram.com/tu-perfil', '_blank');
                    console.log('TODO: Agregar enlace de Instagram');
                  }}
                  className="group"
                  title="Instagram"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-200">
                    <i className="fab fa-instagram h-5 w-5 text-white"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-esperanza-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-source text-gray-400 text-sm mb-4 md:mb-0">
              {/* EDITABLE: Texto de copyright */}
              © {currentYear} Libros de Esperanza. Todos los derechos liberados.
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
            "Dejen todas sus preocupaciones a Dios, porque él se interesa por ustedes." - 1 Pedro 5:7
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;