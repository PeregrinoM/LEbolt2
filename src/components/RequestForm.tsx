import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Shield, Lock, Eye, EyeOff, MapPin, Phone, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';

const RequestForm = () => {
  // ========================================
  // CONFIGURACIÓN DE GOOGLE FORMS
  // ========================================
  
  // URL base del Google Form - Esta es la URL que obtuviste de tu Google Form
  // Se cambia 'viewform' por 'formResponse' para poder enviar datos programáticamente
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeaUSMzf7MgNDvCDxd0AiG2taHJ0vgqMqQUr8K4tdi7aIvtgQ/formResponse';
  
  // Mapeo de campos del formulario React a los Entry IDs de Google Forms
  // Cada 'entry.xxxxxxxxx' corresponde a un campo específico en tu Google Form
  // IMPORTANTE: Estos Entry IDs fueron extraídos de la URL de prueba que proporcionaste
  const GOOGLE_FORM_ENTRIES = {
    nombre: 'entry.1332185571',        // Campo "Nombre completo" en Google Form
    direccion: 'entry.903982352',      // Campo "Dirección" en Google Form  
    ciudad: 'entry.478564157',         // Campo "Ciudad" en Google Form
    telefono: 'entry.1690264956',      // Campo "Teléfono" en Google Form
    email: 'entry.300744122',          // Campo "Email" en Google Form
    libro: 'entry.1414741161',         // Campo "Libro seleccionado" en Google Form
    motivacion: 'entry.402275698',     // Campo "Motivación" en Google Form (múltiples valores)
    mensajeAdicional: 'entry.382189544', // Campo "Mensaje adicional" en Google Form
    estudioBiblico: 'entry.644547640'  // Campo "Estudio bíblico" en Google Form
  };

  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    email: '',
    libro: '',
    motivacion: [] as string[], // Array para múltiples selecciones
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
  const [ciudadSuggestions, setCiudadSuggestions] = useState<string[]>([]);
  const [formProgress, setFormProgress] = useState(0);

  // Ciudades de Chile para autocompletado
  const ciudadesChile = [
    'Ancud', 'Castro', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quemchi', 'Quellón', 'Quinchao', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Llanquihue', 'Los Muermos', 'Maullín', 'Puerto Montt', 'Puerto Varas', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'
  ];

  // Opciones de motivación - DEBEN coincidir exactamente con las opciones en Google Forms
  const motivaciones = [
    'Búsqueda de esperanza y paz',
    'Estudio bíblico',
    'Comprensión de profecías',
    'Respuestas a preguntas existenciales',
    'Guía para tiempos difíciles',
  ];

  // ========================================
  // FUNCIONES DE VALIDACIÓN
  // ========================================
  
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
        isValid = typeof value === 'string' && value.length >= 5;
        message = isValid ? '✓ Dirección válida' : 'Ingresa tu dirección completa (mín. 5 caracteres)';
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

  // ========================================
  // FUNCIÓN PARA DISPARAR EL CONFFETI
  // ========================================
  const triggerConfetti = () => {
    // Parámetros editables para personalizar el efecto del confeti
    const confettiOptions = {
      // Número de partículas de confeti. Menos es más para un efecto minimalista.
      particleCount: 75, // EDITABLE: Cantidad de confeti (ej: 50-150)
      // Ángulo de dispersión del confeti. 90 grados es hacia arriba.
      spread: 90, // EDITABLE: Ángulo de dispersión (ej: 60-120)
      // Velocidad inicial de las partículas.
      startVelocity: 30, // EDITABLE: Velocidad inicial (ej: 20-40)
      // Decaimiento de la velocidad. Cuanto más cerca de 1, más lento caen.
      decay: 0.95, // EDITABLE: Velocidad de caída (ej: 0.85-0.95)
      // Escala de las partículas. Menos de 1 para partículas más pequeñas.
      scalar: 0.9, // EDITABLE: Tamaño de las partículas (ej: 0.8-1.2)
      // Origen del confeti en la pantalla (x, y). 0,0 es arriba izquierda.
      // Ajustado para que salga desde el centro inferior de la pantalla.
      origin: {
        x: 0.5, // EDITABLE: Posición horizontal (0 a 1, 0.5 es centro)
        y: 0.7 // EDITABLE: Posición vertical (0 a 1, 0.7 es un poco más arriba del centro inferior)
      },
      // Colores del confeti. Usando colores de tu paleta para un look sobrio.
      colors: ['#0ea5e9', '#f59e0b', '#ffffff', '#bae6fd', '#fde68a'], // EDITABLE: Array de códigos de color (ej: ['#FF0000', '#00FF00'])
      // Formas de las partículas.
      shapes: ['circle', 'square'], // EDITABLE: Formas (ej: ['circle', 'square', 'star'])
      // Gravedad. 1 es gravedad normal.
      gravity: 0.9, // EDITABLE: Gravedad (ej: 0.5-1.5)
    };

    // Dispara el confeti con las opciones definidas
    confetti(confettiOptions);
    // Puedes disparar múltiples veces para un efecto más denso o variado
    // confetti({ ...confettiOptions, particleCount: 25, spread: 60, startVelocity: 20, origin: { x: 0.4, y: 0.8 } });
  };

  // Calcular progreso del formulario
  useEffect(() => {
    const fields = ['nombre', 'telefono', 'email', 'direccion', 'ciudad', 'libro', 'motivacion'];
    const validFields = fields.filter(field => validation[field as keyof typeof validation]?.isValid).length;
    const progress = (validFields / fields.length) * 100;
    setFormProgress(progress);
  }, [validation]);

  // ========================================
  // MANEJADORES DE EVENTOS
  // ========================================
  
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

  // ========================================
  // FUNCIÓN PRINCIPAL DE ENVÍO A GOOGLE FORMS
  // ========================================
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // PASO 1: Validar todos los campos requeridos antes del envío
    const requiredFields = ['nombre', 'telefono', 'email', 'direccion', 'ciudad', 'libro', 'motivacion'];
    const allValid = requiredFields.every(field => validation[field as keyof typeof validation]?.isValid);

    if (!allValid || !formData.terminos) {
      console.log('❌ Validación fallida - Campos incompletos o términos no aceptados');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // PASO 2: Preparar los datos para Google Forms
      // Creamos un objeto FormData que es el formato que espera Google Forms
      const formDataForGoogle = new FormData();
      
      // PASO 3: Mapear cada campo de nuestro formulario React a los Entry IDs de Google Forms
      // Cada append() añade un campo al FormData usando el Entry ID como clave
      
      console.log('📝 Preparando datos para Google Forms...');
      
      // Campo nombre -> entry.1332185571
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.nombre, formData.nombre);
      console.log(`✓ Nombre: ${formData.nombre}`);
      
      // Campo dirección -> entry.903982352
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.direccion, formData.direccion);
      console.log(`✓ Dirección: ${formData.direccion}`);
      
      // Campo ciudad -> entry.478564157
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.ciudad, formData.ciudad);
      console.log(`✓ Ciudad: ${formData.ciudad}`);
      
      // Campo teléfono -> entry.1690264956
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.telefono, formData.telefono);
      console.log(`✓ Teléfono: ${formData.telefono}`);
      
      // Campo email -> entry.300744122
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.email, formData.email);
      console.log(`✓ Email: ${formData.email}`);
      
      // Campo libro -> entry.1414741161
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.libro, formData.libro);
      console.log(`✓ Libro: ${formData.libro}`);
      
      // Campo motivación -> entry.402275698
      // IMPORTANTE: Para campos de múltiple selección en Google Forms,
      // necesitamos enviar cada valor por separado con el mismo entry ID
      formData.motivacion.forEach(motivacion => {
        formDataForGoogle.append(GOOGLE_FORM_ENTRIES.motivacion, motivacion);
      });
      console.log(`✓ Motivaciones: ${formData.motivacion.join(', ')}`);
      
      // Campo mensaje adicional -> entry.382189544
      // Si no hay mensaje, enviamos una cadena vacía
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.mensajeAdicional, formData.mensajeAdicional || '');
      console.log(`✓ Mensaje adicional: ${formData.mensajeAdicional || '(vacío)'}`);
      
      // Campo estudio bíblico -> entry.644547640
      // Si no se seleccionó nada, enviamos una cadena vacía
      formDataForGoogle.append(GOOGLE_FORM_ENTRIES.estudioBiblico, formData.estudioBiblico || '');
      console.log(`✓ Estudio bíblico: ${formData.estudioBiblico || '(no especificado)'}`);

      // PASO 4: Enviar los datos a Google Forms
      console.log('🚀 Enviando datos a Google Forms...');
      console.log(`📍 URL destino: ${GOOGLE_FORM_URL}`);
      
      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        // mode: 'no-cors' es CRUCIAL para evitar errores de CORS con Google Forms
        // Esto significa que no podremos leer la respuesta, pero el envío funcionará
        mode: 'no-cors',
        body: formDataForGoogle
      });

      // PASO 5: Manejar la respuesta
      // Nota: Con mode: 'no-cors', no podemos verificar si el envío fue exitoso
      // pero si llegamos aquí sin errores, probablemente funcionó
      console.log('✅ Datos enviados a Google Forms');
      console.log('ℹ️ Nota: Con mode no-cors no podemos verificar la respuesta del servidor');
      
      // Marcar como exitoso
      setSubmitStatus('success');
      
      // Log para debugging - estos datos deberían aparecer en tu Google Form
      console.log('📊 Resumen de datos enviados:');
      console.log('- Nombre:', formData.nombre);
      console.log('- Dirección:', formData.direccion);
      console.log('- Ciudad:', formData.ciudad);
      console.log('- Teléfono:', formData.telefono);
      console.log('- Email:', formData.email);
      console.log('- Libro:', formData.libro);
      console.log('- Motivaciones:', formData.motivacion);
      console.log('- Mensaje:', formData.mensajeAdicional);
      console.log('- Estudio bíblico:', formData.estudioBiblico);
      
    } catch (error) {
      // PASO 6: Manejar errores
      console.error('❌ Error al enviar a Google Forms:', error);
      setSubmitStatus('error');
    } finally {
      // PASO 7: Limpiar estado de carga
      setIsSubmitting(false);
      
      // PASO 8: Scroll suave al inicio de la sección para mostrar el mensaje de éxito
      if (submitStatus !== 'error') {
        setTimeout(() => {
          const element = document.getElementById('solicitar');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  // ========================================
  // EFECTO PARA DISPARAR EL CONFFETI AL ÉXITO
  // ========================================
  useEffect(() => {
    if (submitStatus === 'success') {
      triggerConfetti();
    }
  }, [submitStatus]); // Se ejecuta cuando submitStatus cambia

  // ========================================
  // FUNCIONES AUXILIARES PARA LA UI
  // ========================================
  
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

  // ========================================
  // RENDERIZADO CONDICIONAL - ÉXITO
  // ========================================
  
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

  // ========================================
  // RENDERIZADO PRINCIPAL DEL FORMULARIO
  // ========================================
  
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
              <span className="font-source font-semibold">Sin publicidad</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Datos Personales */}
            <div className="space-y-6">
              <h3 className="text-2xl font-poppins font-bold text-esperanza-800 border-b border-celestial-200 pb-3">
                📋 Datos de Envío
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
                } relative`}>
                  {/* FONDO DE IMAGEN PARA EL CONFLICTO DE LOS SIGLOS */}
                  {/* EDITABLE: Puedes ajustar estos valores para personalizar el efecto */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl z-0"
                    style={{
                      backgroundImage: `url('https://pusssafgpuizmhkhzsfb.supabase.co/storage/v1/object/public/Imagenes%20Landing%20Libors/Libros/Portadas/Fondo%20conclicto%20.png')`,
                      /* EDITABLE: Ajusta la opacidad (0.05 = muy transparente, 0.15 = menos transparente) */
                      opacity: 0.5,
                      /* EDITABLE: Ajusta el difuminado (blur-sm = poco, blur-md = medio, blur-lg = mucho) */
                      filter: 'blur(2px)',
                    }}
                  ></div>
                  
                  <input
                    type="radio"
                    name="libro"
                    value="El Conflicto de los Siglos"
                    checked={formData.libro === 'El Conflicto de los Siglos'}
                    onChange={(e) => handleInputChange('libro', e.target.value)}
                    className="mr-4 w-5 h-5 relative z-10"
                  />
                  <div className="relative z-10">
                    <h4 className="font-poppins font-semibold text-esperanza-800 text-lg">El Conflicto de los Siglos</h4>
                    <p className="text-sm font-source text-esperanza-600">Historia profética y Fe en Dios.</p>
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
                    <p className="text-sm font-source text-esperanza-600">Pasos hacia la salvación y paz.</p>
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
                    value="si"
                    checked={formData.estudioBiblico === 'si'}
                    onChange={(e) => setFormData(prev => ({ ...prev, estudioBiblico: e.target.value }))}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="font-source text-esperanza-700">Sí, me interesa</span>
                </label>
                <label className="flex items-center mobile-touch-target">
                  <input
                    type="radio"
                    name="estudioBiblico"
                    value="no"
                    checked={formData.estudioBiblico === 'no'}
                    onChange={(e) => setFormData(prev => ({ ...prev, estudioBiblico: e.target.value }))}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="font-source text-esperanza-700">No, gracias</span>
                </label>
              </div>
            </div>

            {/* Términos */}
          <div className="flex items-start mobile-touch-target">
            <label className="flex items-start cursor-pointer text-sm font-source text-esperanza-600 select-none">
              <input
                type="checkbox"
                required
                checked={formData.terminos}
                onChange={(e) => setFormData(prev => ({ ...prev, terminos: e.target.checked }))}
                className="mt-1 mr-4 w-5 h-5"
              />
              <span className="text-sm font-source text-esperanza-600">
                Acepto que mis datos sean utilizados únicamente para el envío del libro solicitado. 
                No compartiremos tu información con terceros. *
              </span>
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
