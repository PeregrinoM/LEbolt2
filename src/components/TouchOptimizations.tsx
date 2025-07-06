import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 4. Carrusel táctil para testimonios en móvil
export const TouchTestimonialCarousel = ({ testimonials }: { testimonials: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="md:hidden">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 p-6">
              <div className="card-celestial p-6 rounded-2xl h-full">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-celestial-200"
                  />
                  <div>
                    <h4 className="font-poppins font-bold text-esperanza-800">{testimonial.name}</h4>
                    <p className="text-sm font-source text-esperanza-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="font-source text-esperanza-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5 text-esperanza-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
          disabled={currentIndex === testimonials.length - 1}
        >
          <ChevronRight className="h-5 w-5 text-esperanza-700" />
        </button>
      </div>

      {/* Indicadores de puntos */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-celestial-500 scale-125'
                : 'bg-celestial-200 hover:bg-celestial-300'
            }`}
          />
        ))}
      </div>

      {/* Instrucciones de swipe */}
      <p className="text-center text-sm font-source text-esperanza-500 mt-4">
        👈 Desliza para ver más testimonios 👉
      </p>
    </div>
  );
};

// 5. Formulario con validación en tiempo real y autocompletado inteligente
export const SmartMobileForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: ''
  });

  const [validation, setValidation] = useState({
    nombre: { isValid: false, message: '' },
    telefono: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    ciudad: { isValid: false, message: '' }
  });

  const ciudadesChile = [
    'Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta',
    'Temuco', 'Rancagua', 'Talca', 'Arica', 'Chillán', 'Iquique',
    'Los Ángeles', 'Puerto Montt', 'Calama', 'Copiapó', 'Osorno',
    'Quillota', 'Valdivia', 'Punta Arenas', 'Coquimbo'
  ];

  const [ciudadSuggestions, setCiudadSuggestions] = useState<string[]>([]);

  const validateField = (name: string, value: string) => {
    let isValid = false;
    let message = '';

    switch (name) {
      case 'nombre':
        isValid = value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        message = isValid ? '✓ Nombre válido' : 'Ingresa tu nombre completo';
        break;
      case 'telefono':
        isValid = /^(\+56|56)?[9][0-9]{8}$/.test(value.replace(/\s/g, ''));
        message = isValid ? '✓ Teléfono válido' : 'Formato: +56 9 1234 5678';
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        message = isValid ? '✓ Email válido' : 'Ingresa un email válido';
        break;
      case 'ciudad':
        isValid = value.length >= 2;
        message = isValid ? '✓ Ciudad válida' : 'Selecciona tu ciudad';
        break;
    }

    return { isValid, message };
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const validationResult = validateField(name, value);
    setValidation(prev => ({ ...prev, [name]: validationResult }));

    // Autocompletado para ciudades
    if (name === 'ciudad' && value.length > 0) {
      const suggestions = ciudadesChile.filter(ciudad =>
        ciudad.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setCiudadSuggestions(suggestions);
    } else if (name === 'ciudad') {
      setCiudadSuggestions([]);
    }
  };

  const selectCiudad = (ciudad: string) => {
    handleInputChange('ciudad', ciudad);
    setCiudadSuggestions([]);
  };

  return (
    <div className="space-y-6">
      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => handleInputChange('nombre', e.target.value)}
          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 font-source text-lg ${
            formData.nombre
              ? validation.nombre.isValid
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-celestial-200 focus:border-celestial-500 focus:ring-celestial-200'
          } focus:ring-2 focus:outline-none`}
          placeholder="Tu nombre completo"
        />
        {formData.nombre && (
          <p className={`text-sm mt-1 ${validation.nombre.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {validation.nombre.message}
          </p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div>
        <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-2">
          Teléfono *
        </label>
        <input
          type="tel"
          value={formData.telefono}
          onChange={(e) => handleInputChange('telefono', e.target.value)}
          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 font-source text-lg ${
            formData.telefono
              ? validation.telefono.isValid
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-celestial-200 focus:border-celestial-500 focus:ring-celestial-200'
          } focus:ring-2 focus:outline-none`}
          placeholder="+56 9 1234 5678"
        />
        {formData.telefono && (
          <p className={`text-sm mt-1 ${validation.telefono.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {validation.telefono.message}
          </p>
        )}
      </div>

      {/* Campo Email */}
      <div>
        <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 font-source text-lg ${
            formData.email
              ? validation.email.isValid
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-celestial-200 focus:border-celestial-500 focus:ring-celestial-200'
          } focus:ring-2 focus:outline-none`}
          placeholder="tu@email.com"
        />
        {formData.email && (
          <p className={`text-sm mt-1 ${validation.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {validation.email.message}
          </p>
        )}
      </div>

      {/* Campo Ciudad con autocompletado */}
      <div className="relative">
        <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-2">
          Ciudad *
        </label>
        <input
          type="text"
          value={formData.ciudad}
          onChange={(e) => handleInputChange('ciudad', e.target.value)}
          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 font-source text-lg ${
            formData.ciudad
              ? validation.ciudad.isValid
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-celestial-200 focus:border-celestial-500 focus:ring-celestial-200'
          } focus:ring-2 focus:outline-none`}
          placeholder="Escribe tu ciudad..."
        />
        
        {ciudadSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-celestial-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {ciudadSuggestions.map((ciudad, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectCiudad(ciudad)}
                className="w-full px-4 py-3 text-left hover:bg-celestial-50 transition-colors duration-200 font-source"
              >
                {ciudad}
              </button>
            ))}
          </div>
        )}
        
        {formData.ciudad && (
          <p className={`text-sm mt-1 ${validation.ciudad.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {validation.ciudad.message}
          </p>
        )}
      </div>
    </div>
  );
};