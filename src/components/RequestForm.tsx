import React, { useState } from 'react';
import { Send, User, Mail, Phone, MapPin, BookOpen, Heart, Users } from 'lucide-react';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  libro: string;
  motivacion: string[];
  estudioBiblico: string;
}

interface FormErrors {
  [key: string]: string;
}

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    libro: '',
    motivacion: [],
    estudioBiblico: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const books = [
    {
      id: 'conflicto',
      title: 'El Conflicto de los Siglos',
      description: 'Una perspectiva profética de la historia'
    },
    {
      id: 'camino',
      title: 'El Camino a Cristo',
      description: 'Pasos hacia una vida espiritual plena'
    }
  ];

  const motivacionOptions = [
    'Crecimiento espiritual',
    'Búsqueda de paz interior',
    'Comprensión bíblica',
    'Fortalecimiento de la fe',
    'Curiosidad intelectual'
  ];

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'nombre':
        return !value.trim() ? 'El nombre es requerido' : '';
      case 'email':
        if (!value.trim()) return ''; // Email is now optional
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Email inválido' : '';
      case 'telefono':
        return !value.trim() ? 'El teléfono es requerido' : '';
      case 'direccion':
        return !value.trim() ? 'La dirección es requerida' : '';
      case 'libro':
        return !value ? 'Debe seleccionar un libro' : '';
      case 'motivacion':
        return ''; // Motivacion is now optional
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMotivacionChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      motivacion: prev.motivacion.includes(option)
        ? prev.motivacion.filter(m => m !== option)
        : [...prev.motivacion, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validate required fields only
    const requiredFields = ['nombre', 'telefono', 'direccion', 'libro'];
    const newErrors: FormErrors = {};

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate email format if provided
    if (formData.email) {
      const emailError = validateField('email', formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        libro: '',
        motivacion: [],
        estudioBiblico: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="solicitar" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Solicita tu Libro Gratuito
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y recibe tu libro directamente en tu hogar, completamente gratis.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ¡Solicitud enviada exitosamente! Te contactaremos pronto.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Información Personal
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu número de teléfono"
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                </div>

                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.direccion ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Calle, número, ciudad, código postal"
                  />
                  {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>}
                </div>
              </div>
            </div>

            {/* Selección de Libro */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Selección de Libro
              </h3>

              <div>
                <label htmlFor="libro" className="block text-sm font-medium text-gray-700 mb-2">
                  Elige tu libro *
                </label>
                <select
                  id="libro"
                  name="libro"
                  value={formData.libro}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.libro ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona un libro</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.description}
                    </option>
                  ))}
                </select>
                {errors.libro && <p className="mt-1 text-sm text-red-600">{errors.libro}</p>}
              </div>
            </div>

            {/* Motivación */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-blue-600" />
                Motivación
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  ¿Qué te motiva a solicitar este libro? (Opcional)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {motivacionOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.motivacion.includes(option)}
                        onChange={() => handleMotivacionChange(option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Estudio Bíblico */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Estudio Bíblico
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  ¿Te interesaría participar en un estudio bíblico gratuito?
                </label>
                <div className="space-y-3">
                  {['Sí, me interesa', 'No, gracias', 'Tal vez en el futuro'].map(option => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="estudioBiblico"
                        value={option}
                        checked={formData.estudioBiblico === option}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Solicitar Libro Gratuito</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;