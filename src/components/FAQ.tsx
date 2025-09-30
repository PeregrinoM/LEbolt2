import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // EDITABLE: Array de preguntas frecuentes - puedes agregar, quitar o modificar preguntas
  const faqs = [
    {
      // EDITABLE: Pregunta 1
      question: "¿Realmente es completamente gratuito?",
      // EDITABLE: Respuesta 1
      answer: "Sí, absolutamente gratuito. No hay costos ocultos, no pagas envío, no hay suscripciones. Es un regalo 🎁 genuino para ti ♥️."
    },
    {
      // EDITABLE: Pregunta 2
      question: "¿Por qué ofrecen estos libros gratis?",
      // EDITABLE: Respuesta 2
      answer: "Creemos que la esperanza y la paz espiritual no tienen precio. Nuestro único deseo es compartir estos libros que han transformado millones de vidas y pueden transformar la tuya también."
    },
    {
      // EDITABLE: Pregunta 3
      question: "¿Cuánto tiempo tarda en llegar el libro?",
      // EDITABLE: Respuesta 3 (tiempo de entrega)
      answer: "Generalmente entre 3 a 7 días hábiles, dependiendo de tu ubicación 📍 en la región."
    },
    {
      // EDITABLE: Pregunta 4
      question: "¿Puedo solicitar ambos libros?",
      // EDITABLE: Respuesta 4
      answer: "Por ahora, para optimizar nuestros recursos, enviamos un libro por persona. Una vez que lo leas, puedes contactarnos para solicitar el segundo 😉."
    },
    {
      // EDITABLE: Pregunta 5
      question: "¿Necesito tener conocimientos bíblicos previos?",
      // EDITABLE: Respuesta 5
      answer: "No es necesario. Ambos libros 📙 están escritos de manera clara y comprensible para cualquier persona, sin importar su trasfondo religioso."
    },
    {
      // EDITABLE: Pregunta 7
      question: "¿Qué denominación religiosa está detrás de esto?",
      // EDITABLE: Respuesta 7
      answer: "No representamos ninguna denominación específica. Te invitamos unicamente a la Fe en el Hijo de Dios 'Jesús'."
    },
    {
      // EDITABLE: Pregunta 8
      question: "¿Puedo regalar el libro a alguien más?",
      // EDITABLE: Respuesta 8
      answer: "¡Por supuesto! Si conoces a alguien que podría beneficiarse, puedes llenar el formulario con sus datos (con su permiso) o pedirle que haga su propia solicitud ☺️."
    },
    {
      // EDITABLE: Pregunta 9
      question: "¿Qué pasa con mis datos personales?",
      // EDITABLE: Respuesta 9
      answer: "Tus datos son completamente privados 🔒 y solo son para el envío del libro. No los compartimos con nadie ni los usamos para otros fines."
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="preguntas" className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          {/* EDITABLE: Título de la sección */}
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-esperanza-800 mb-3">
            Preguntas Frecuentes
          </h2>
          {/* EDITABLE: Descripción de la sección */}
          <p className="text-lg font-source text-esperanza-600 max-w-2xl mx-auto">
            Resolvemos todas tus dudas.
          </p>
        </div>

        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-celestial rounded-xl overflow-hidden border border-celestial-100/50 hover:border-celestial-200 transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 py-4 md:px-6 md:py-5 text-left flex justify-between items-center hover:bg-celestial-50/70 transition-all duration-200 group"
              >
                <h3 className="text-sm md:text-base font-poppins font-semibold text-esperanza-800 pr-4 group-hover:text-celestial-700 transition-colors duration-200">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-celestial-500 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-celestial-500 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-5 pb-4 md:px-6 md:pb-5 animate-slide-up">
                  <div className="border-t border-celestial-100/60 pt-3 md:pt-4">
                    <p className="text-sm md:text-base font-source text-esperanza-600 leading-relaxed opacity-90">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="bg-gradient-dorado p-6 md:p-7 rounded-xl border border-dorado-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* EDITABLE: Título de la llamada a la acción */}
            <h3 className="text-lg md:text-xl font-poppins font-bold text-esperanza-800 mb-3">
              ¿Tienes otra pregunta?
            </h3>
            {/* EDITABLE: Descripción de la llamada a la acción */}
            <p className="text-sm md:text-base font-source text-esperanza-700 mb-4 md:mb-5 opacity-90">
              No dudes en contactarnos, para eso estamos aquí.
            </p>
            {/* EDITABLE: Texto del botón */}
            <button
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-celestial py-3 px-6 rounded-lg font-poppins font-semibold text-sm md:text-base hover:scale-105 transition-transform duration-200"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;