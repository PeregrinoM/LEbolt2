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
    <section id="preguntas" className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {/* EDITABLE: Título de la sección */}
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-esperanza-800 mb-4">
            Preguntas Frecuentes
          </h2>
          {/* EDITABLE: Descripción de la sección */}
          <p className="text-xl font-source text-esperanza-600">
            Resolvemos las dudas para que recivas tu libro.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-celestial rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-celestial-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-poppins font-semibold text-esperanza-800 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-celestial-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-celestial-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-celestial-100 pt-4">
                    <p className="font-source text-esperanza-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-dorado p-8 rounded-2xl border border-dorado-200">
            {/* EDITABLE: Título de la llamada a la acción */}
            <h3 className="text-2xl font-poppins font-bold text-esperanza-800 mb-4">
              ¿Tienes otra pregunta?
            </h3>
            {/* EDITABLE: Descripción de la llamada a la acción */}
            <p className="font-source text-esperanza-700 mb-6">
              No dudes en contactarnos, para eso estamos aquí.
            </p>
            {/* EDITABLE: Texto del botón */}
            <button
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-celestial py-3 px-6 rounded-lg font-poppins font-semibold"
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