import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Shield, Lock, Eye, EyeOff, MapPin, Phone, Mail, User } from 'lucide-react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    email: '',
    libro: '',
    motivacion: [],
    mensajeAdicional: '',
    estudioBiblico: '',
    terminos: false
  });

  const [validation, setValidation] = useState({
    nombre: { isValid: false, message: '', touched: false },
    telefono: { isValid: false, message: '', touched: false },
    email: { isValid: false, message: '', touched: false },
    direccion: { isValid: false, message: '', touched: false },
    ciudad: { isValid: false, message: '', touched: false },
    libro: { isValid: false, message: '', touched: false },
    motivacion: { isValid: false, message: '', touched: false }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [ciudadSuggestions, setCiudadSuggestions] = useState<string[]>([]);
  const [formProgress, setFormProgress] = useState(0);

  // Ciudades de Chile para autocompletado
  const ciudadesChile = [
    'Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta',
    'Temuco', 'Rancagua', 'Talca', 'Arica', 'Chillán', 'Iquique',
    'Los Ángeles', 'Puerto Montt', 'Calama', 'Copiapó', 'Osorno',
    'Quillota', 'Valdivia', 'Punta Arenas', 'Coquimbo', 'Viña del Mar',
    'San Antonio', 'Curicó', 'Linares', 'Ovalle', 'Melipilla'
  ];

  const motivaciones = [
    'Crecimiento espiritual personal',
    'Búsqueda de esperanza y paz',
    'Estudio bíblico profundo',
    'Comprensión de profecías',
    'Fortalecimiento de la fe',
    'Respuestas a preguntas existenciales',
    'Guía para tiempos difíciles',
    'Transformación de vida'
  ];

  // Validación en tiempo real
  const validateField = (name: string, value: string | string[]) => {
    let isValid = false;
    let message = '';

    switch (name) {
      case 'nombre':
        isValid = typeof value === 'string' && value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        message = isValid ? '✓ Nombre válido' : 'Ingresa tu nombre completo (solo letras)';
        break;
      case 'telefono':
        const phoneRegex = /^(\+56|56)?[9][0-9]{8}$/;
        isValid = typeof value === 'string' && phoneRegex.test(value.replace(/\s/g, ''));
        message = isValid ? '✓ Teléfono válido' : 'Formato: +56 9 1234 5678';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = typeof value === 'string' && emailRegex.test(value);
        message = isValid ? '✓ Email válido' : 'Ingresa un email válido';
        break;
      case 'direccion':
        isValid = typeof value === 'string' && value.length >= 10;
        message = isValid ? '✓ Dirección válida' : 'Ingresa tu dirección completa (mín. 10 caracteres)';
        break;
      case 'ciudad':
        isValid = typeof value === 'string' && value.length >= 2;
        message = isValid ? '✓ Ciudad válida' : 'Selecciona tu ciudad';
        break;
      case 'libro':
        isValid = typeof value === 'string' && value.length > 0;
        message = isValid ? '✓ Libro seleccionado' : 'Selecciona un libro';
        break;
      case 'motivacion':
        isValid = Array.isArray(value) && value.length > 0;
        message = isValid ? `✓ ${value.length} motivación(es) seleccionada(s)` : 'Selecciona al menos una motivación';
        break;
    }

    return { isValid, message };
  };

  // Calcular progreso del formulario
  useEffect(() => {
    const fields = ['nombre', 'telefono', 'email', 'direccion', 'ciudad', 'libro', 'motivacion'];
    const validFields = fields.filter(field => validation[field as keyof typeof validation]?.isValid).length;
    const progress = (validFields / fields.length) * 100;
    setFormProgress(progress);
  }, [validation]);

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const validationResult = validateField(name, value);
    setValidation(prev => ({ 
      ...prev, 
      [name]: { ...validationResult, touched: true }
    }));

    // Autocompletado para ciudades
    if (name === 'ciudad' && typeof value === 'string' && value.length > 0) {
      const suggestions = ciudadesChile.filter(ciudad =>
        ciudad.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setCiudadSuggestions(suggestions);
    } else if (name === 'ciudad') {
      setCiudadSuggestions([]);
    }
  };

  const handleMotivacionChange = (motivacion: string) => {
    const newMotivacion = formData.motivacion.includes(motivacion)
      ? formData.motivacion.filter(m => m !== motivacion)
      : [...formData.motivacion, motivacion];
    
    handleInputChange('motivacion', newMotivacion);
  };

  const selectCiudad = (ciudad: string) => {
    handleInputChange('ciudad', ciudad);
    setCiudadSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar todos los campos requeridos
    const requiredFields = ['nombre', 'telefono', 'email', 'direccion', 'ciudad', 'libro', 'motivacion'];
    const allValid = requiredFields.every(field => validation[field as keyof typeof validation]?.isValid);

    if (!allValid || !formData.terminos) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Aquí se integrará con Google Forms
      // El formulario está estructurado para ser compatible con Google Forms
      const formDataForGoogle = {
        'entry.nombre': formData.nombre,
        'entry.telefono': formData.telefono,
        'entry.email': formData.email,
        'entry.direccion': formData.direccion,
        'entry.ciudad': formData.ciudad,
        'entry.libro': formData.libro,
        'entry.motivacion': formData.motivacion.join(', '),
        'entry.mensaje': formData.mensajeAdicional,
        'entry.estudio': formData.estudioBiblico
      };

      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (fieldName: string) => {
    const icons = {
      nombre: <User className="h-5 w-5" />,
      telefono: <Phone className="h-5 w-5" />,
      email: <Mail className="h-5 w-5" />,
      direccion: <MapPin className="h-5 w-5" />,
      ciudad: <MapPin className="h-5 w-5" />
    };
    return icons[fieldName as keyof typeof icons];
  };

  const getFieldStatus = (fieldName: string) => {
    const field = validation[fieldName as keyof typeof validation];
    if (!field?.touched) return 'default';
    return field.isValid ? 'valid' : 'invalid';
  };

  const getFieldClasses = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    const baseClasses = "w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 font-source text-lg mobile-input";
    
    switch (status) {
      case 'valid':
        return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50/50`;
      case 'invalid':
        return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/50`;
      default:
        return `${baseClasses} border-celestial-200 focus:border-celestial-500 focus:ring-celestial-200`;
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="solicitar" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-celestial-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-celestial p-10 rounded-2xl animate-fade-in">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-8 animate-bounce-gentle" />
            <h2 className="text-4xl font-poppins font-bold text-esperanza-800 mb-6">
              ¡Solicitud Enviada con Éxito!
            </h2>
            <p className="font-source text-esperanza-600 mb-8 text-lg">
              Gracias por tu interés. Hemos recibido tu solicitud y pronto recibirás tu libro 
              de esperanza en la dirección proporcionada.
            </p>
            <div className="bg-green-100 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="font-poppins font-semibold text-green-800 mb-2">Próximos pasos:</h3>
              <ul className="text-sm font-source text-green-700 space-y-1">
                <li>• Verificaremos tu información en 24-48 horas</li>
                <li>• Tu libro será enviado en 3-5 días hábiles</li>
                <li>• Recibirás un mensaje de confirmación</li>
              </ul>
            </div>
            <p className="text-sm font-source text-esperanza-500">
              Te contactaremos solo si necesitamos corroborar algún dato del envío.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solicitar" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-celestial-50 to-dorado-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-esperanza-800 mb-6">
            Solicita tu Libro Gratuito
          </h2>
          <p className="text-xl font-source text-esperanza-600">
            Completa el formulario y recibe tu libro de esperanza sin costo alguno
          </p>
        </div>

        <div className="card-celestial rounded-2xl p-6 md:p-10">
          {/* Barra de progreso */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-poppins font-semibold text-esperanza-700">
                Progreso del formulario
              </span>
              <span className="text-sm font-source text-esperanza-600">
                {Math.round(formProgress)}% completado
              </span>
            </div>
            <div className="w-full bg-celestial-100 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-celestial-400 to-green-400 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Indicadores de seguridad */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10 p-6 bg-gradient-to-r from-green-50 to-celestial-50 rounded-xl border border-green-200">
            <div className="flex items-center text-green-600">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-source font-semibold">Datos protegidos</span>
            </div>
            <div className="flex items-center text-celestial-600">
              <Lock className="h-5 w-5 mr-2" />
              <span className="font-source font-semibold">Conexión segura</span>
            </div>
            <div className="flex items-center text-dorado-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-source font-semibold">Sin spam garantizado</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Datos Personales */}
            <div className="space-y-6">
              <h3 className="text-2xl font-poppins font-bold text-esperanza-800 border-b border-celestial-200 pb-3">
                📋 Datos Personales
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-3">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className={`${getFieldStatus('nombre') === 'valid' ? 'text-green-500' : getFieldStatus('nombre') === 'invalid' ? 'text-red-500' : 'text-celestial-400'}`}>
                        {getFieldIcon('nombre')}
                      </div>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className={getFieldClasses('nombre')}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  {validation.nombre.touched && (
                    <p className={`text-sm mt-2 flex items-center ${validation.nombre.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {validation.nombre.isValid ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                      {validation.nombre.message}
                    </p>
                  )}
                </div>
                
                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-3">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className={`${getFieldStatus('telefono') === 'valid' ? 'text-green-500' : getFieldStatus('telefono') === 'invalid' ? 'text-red-500' : 'text-celestial-400'}`}>
                        {getFieldIcon('telefono')}
                      </div>
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className={getFieldClasses('telefono')}
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  {validation.telefono.touched && (
                    <p className={`text-sm mt-2 flex items-center ${validation.telefono.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {validation.telefono.isValid ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                      {validation.telefono.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-3">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className={`${getFieldStatus('email') === 'valid' ? 'text-green-500' : getFieldStatus('email') === 'invalid' ? 'text-red-500' : 'text-celestial-400'}`}>
                      {getFieldIcon('email')}
                    </div>
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={getFieldClasses('email')}
                    placeholder="tu@email.com"
                  />
                </div>
                {validation.email.touched && (
                  <p className={`text-sm mt-2 flex items-center ${validation.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.email.isValid ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                    {validation.email.message}
                  </p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-3">
                  Dirección completa *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className={`${getFieldStatus('direccion') === 'valid' ? 'text-green-500' : getFieldStatus('direccion') === 'invalid' ? 'text-red-500' : 'text-celestial-400'}`}>
                      {getFieldIcon('direccion')}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    className={getFieldClasses('direccion')}
                    placeholder="Calle, número, comuna, región"
                  />
                </div>
                {validation.direccion.touched && (
                  <p className={`text-sm mt-2 flex items-center ${validation.direccion.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.direccion.isValid ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                    {validation.direccion.message}
                  </p>
                )}
              </div>

              {/* Ciudad con autocompletado */}
              <div className="relative">
                <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-3">
                  Ciudad *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className={`${getFieldStatus('ciudad') === 'valid' ? 'text-green-500' : getFieldStatus('ciudad') === 'invalid' ? 'text-red-500' : 'text-celestial-400'}`}>
                      {getFieldIcon('ciudad')}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.ciudad}
                    onChange={(e) => handleInputChange('ciudad', e.target.value)}
                    className={getFieldClasses('ciudad')}
                    placeholder="Escribe tu ciudad..."
                  />
                </div>
                
                {ciudadSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-celestial-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {ciudadSuggestions.map((ciudad, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectCiudad(ciudad)}
                        className="w-full px-4 py-3 text-left hover:bg-celestial-50 transition-colors duration-200 font-source mobile-touch-target"
                      >
                        <MapPin className="h-4 w-4 inline mr-2 text-celestial-500" />
                        {ciudad}
                      </button>
                    ))}
                  </div>
                )}
                
                {validation.ciudad.touched && (
                  <p className={`text-sm mt-2 flex items-center ${validation.ciudad.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.ciudad.isValid ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                    {validation.ciudad.message}
                  </p>
                )}
              </div>
            </div>

            {/* Selección de Libro */}
            <div>
              <h3 className="text-2xl font-poppins font-bold text-esperanza-800 border-b border-celestial-200 pb-3 mb-6">
                📚 Selección de Libro
              </h3>
              <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-6">
                ¿Qué libro te gustaría recibir? *
              </label>
              <div className="grid md:grid-cols-2 gap-6">
                <label className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 mobile-touch-target ${
                  formData.libro === 'El Conflicto de los Siglos' 
                    ? 'border-celestial-500 bg-celestial-50 shadow-lg' 
                    : 'border-celestial-200 hover:border-celestial-400 hover:bg-celestial-50'
                }`}>
                  <input
                    type="radio"
                    name="libro"
                    value="El Conflicto de los Siglos"
                    checked={formData.libro === 'El Conflicto de los Siglos'}
                    onChange={(e) => handleInputChange('libro', e.target.value)}
                    className="mr-4 w-5 h-5"
                  />
                  <div>
                    <h4 className="font-poppins font-semibold text-esperanza-800 text-lg">El Conflicto de los Siglos</h4>
                    <p className="text-sm font-source text-esperanza-600">Historia profética y esperanza eterna</p>
                  </div>
                </label>
                
                <label className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 mobile-touch-target ${
                  formData.libro === 'El Camino a Cristo' 
                    ? 'border-celestial-500 bg-celestial-50 shadow-lg' 
                    : 'border-celestial-200 hover:border-celestial-400 hover:bg-celestial-50'
                }`}>
                  <input
                    type="radio"
                    name="libro"
                    value="El Camino a Cristo"
                    checked={formData.libro === 'El Camino a Cristo'}
                    onChange={(e) => handleInputChange('libro', e.target.value)}
                    className="mr-4 w-5 h-5"
                  />
                  <div>
                    <h4 className="font-poppins font-semibold text-esperanza-800 text-lg">El Camino a Cristo</h4>
                    <p className="text-sm font-source text-esperanza-600">Pasos hacia la salvación y paz interior</p>
                  </div>
                </label>
              </div>
              {validation.libro.touched && !validation.libro.isValid && (
                <p className="text-sm mt-2 flex items-center text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {validation.libro.message}
                </p>
              )}
            </div>

            {/* Motivación */}
            <div>
              <h3 className="text-2xl font-poppins font-bold text-esperanza-800 border-b border-celestial-200 pb-3 mb-6">
                💭 Motivación
              </h3>
              <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-6">
                ¿Qué te motiva a solicitar este libro? * (Puedes seleccionar varias opciones)
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {motivaciones.map((motivacion, index) => (
                  <label key={index} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 mobile-touch-target ${
                    formData.motivacion.includes(motivacion)
                      ? 'border-celestial-500 bg-celestial-50 shadow-md'
                      : 'border-celestial-200 hover:bg-celestial-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.motivacion.includes(motivacion)}
                      onChange={() => handleMotivacionChange(motivacion)}
                      className="mr-4 w-5 h-5"
                    />
                    <span className="text-sm font-source text-esperanza-700">{motivacion}</span>
                  </label>
                ))}
              </div>
              {validation.motivacion.touched && (
                <p className={`text-sm mt-2 flex items-center ${validation.motivacion.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validation.motivacion.isValid ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                  {validation.motivacion.message}
                </p>
              )}
            </div>

            {/* Mensaje Adicional */}
            <div>
              <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-3">
                Mensaje adicional (opcional)
              </label>
              <textarea
                value={formData.mensajeAdicional}
                onChange={(e) => setFormData(prev => ({ ...prev, mensajeAdicional: e.target.value }))}
                rows={4}
                className="w-full px-5 py-4 border border-celestial-200 rounded-xl focus:ring-2 focus:ring-celestial-500 focus:border-transparent transition-all duration-200 font-source text-lg mobile-input"
                placeholder="Comparte algo más sobre tu búsqueda espiritual o cualquier pregunta que tengas..."
              />
            </div>

            {/* Estudio Bíblico */}
            <div>
              <label className="block text-sm font-poppins font-semibold text-esperanza-700 mb-6">
                ¿Te interesaría recibir información sobre estudios bíblicos online gratuitos?
              </label>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                <label className="flex items-center mobile-touch-target">
                  <input
                    type="radio"
                    name="estudioBiblico"
                    value="Sí"
                    checked={formData.estudioBiblico === 'Sí'}
                    onChange={(e) => setFormData(prev => ({ ...prev, estudioBiblico: e.target.value }))}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="font-source text-esperanza-700">Sí, me interesa</span>
                </label>
                <label className="flex items-center mobile-touch-target">
                  <input
                    type="radio"
                    name="estudioBiblico"
                    value="No"
                    checked={formData.estudioBiblico === 'No'}
                    onChange={(e) => setFormData(prev => ({ ...prev, estudioBiblico: e.target.value }))}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="font-source text-esperanza-700">No, gracias</span>
                </label>
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start mobile-touch-target">
              <input
                type="checkbox"
                required
                checked={formData.terminos}
                onChange={(e) => setFormData(prev => ({ ...prev, terminos: e.target.checked }))}
                className="mt-1 mr-4 w-5 h-5"
              />
              <label className="text-sm font-source text-esperanza-600">
                Acepto que mis datos sean utilizados únicamente para el envío del libro solicitado. 
                No compartiremos tu información con terceros. *
              </label>
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-center p-6 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <span className="font-source text-red-700">Hubo un error al enviar tu solicitud. Por favor, revisa los campos marcados e intenta nuevamente.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || formProgress < 100 || !formData.terminos}
              className="w-full btn-celestial py-5 px-8 rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center text-xl mobile-touch-target"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span className="font-poppins">Enviando solicitud...</span>
                </>
              ) : (
                <>
                  <Send className="h-6 w-6 mr-3" />
                  <span className="font-poppins">Solicitar mi libro gratuito</span>
                </>
              )}
            </button>

            {/* Información adicional */}
            <div className="text-center text-sm font-source text-esperanza-500 space-y-2">
              <p>🔒 Tus datos están protegidos y nunca serán compartidos</p>
              <p>📦 Envío completamente gratuito a todo Chile</p>
              <p>⏱️ Procesamiento en 24-48 horas</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;