import React from 'react';
import { Star, Clock, Users, Lightbulb, PenLineIcon } from 'lucide-react';
import LazyImage from './LazyImage';

const AboutBooks = () => {
  // EDITABLE: Información de los libros
  const books = [
    {
      // EDITABLE: Título del primer libro
      title: "El Conflicto de los Siglos",
      // EDITABLE: Descripción del primer libro
      description: "Una obra maestra que revela la gran controversia entre el bien y el mal a través de la historia. Descubre las profecías bíblicas y su cumplimiento, encontrando esperanza para el futuro.",
      // EDITABLE: Características del primer libro
      features: [
        "La preocupacion constante de Dios por sus hijos",
        "Esperanza para tiempos difíciles",
        "Historia profética revelada",
        "La Verdad te hara libre"
      ],
      icon: <PenLineIcon className="h-8 w-8 text-dorado-500" />,
      gradient: "from-dorado-50 to-dorado-100",
      // Imagen del libro (opcional)
      image: "https://images.pexels.com/photos/32897511/pexels-photo-32897511.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
    },
    {
      // EDITABLE: Título del segundo libro
      title: "El Camino a Cristo",
      // EDITABLE: Descripción del segundo libro
      description: "Un mensaje inspirador que te conecta con el Salvador. A través de sus palabras, hallarás esperanza, transformación y la paz que el alma busca.",
      // EDITABLE: Características del segundo libro
      features: [
        "Pasos hacia a Cristo",
        "Paz interior que solo Dios puede dar",
        "Relación personal con Dios",
      ],
      icon: <PenLineIcon className="h-8 w-8 text-celestial-500" />,
      gradient: "from-celestial-50 to-celestial-100",
      // Imagen del libro (opcional)
      image: "https://images.pexels.com/photos/32897639/pexels-photo-32897639.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
    }
  ];

  return (
    <section id="libros" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* EDITABLE: Título de la sección */}
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-esperanza-800 mb-4">
            Libros que Transforman Vidas
          </h2>
          {/* EDITABLE: Descripción de la sección */}
          <p className="text-xl font-source text-esperanza-600 max-w-3xl mx-auto">
          Historias de redención, profecía y amor divino al alcance de todos. 
          Descubre el mensaje que tu corazón necesita hoy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {books.map((book, index) => (
            <div
              key={index}
              className={`card-celestial bg-gradient-to-br ${book.gradient} p-8 rounded-2xl hover:scale-105`}
            >
              {/* Imagen del libro con lazy loading */}
              {book.image && (
                <div className="mb-6 flex justify-center">
                  <div className="w-32 h-40 rounded-lg overflow-hidden shadow-lg">
                    <LazyImage
                      src={book.image}
                      alt={`Portada del libro ${book.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center mb-6">
                {book.icon}
                <h3 className="text-2xl font-poppins font-bold text-esperanza-800 ml-3">{book.title}</h3>
              </div>
              
              <p className="font-source text-esperanza-700 mb-6 leading-relaxed">
                {book.description}
              </p>
              
              <div className="space-y-3">
                {book.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="font-source text-esperanza-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card-celestial rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* EDITABLE: Estadísticas de impacto */}
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-celestial-500 mb-4" />
              <h4 className="text-xl font-poppins font-bold text-esperanza-800 mb-2">Millones de Lectores</h4>
              <p className="font-source text-esperanza-600">Traducidos a más de 100 idiomas</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-green-500 mb-4" />
              {/* EDITABLE: Años de historia */}
              <h4 className="text-xl font-poppins font-bold text-esperanza-800 mb-2">Más de 110 Años</h4>
              {/* EDITABLE: Año de inicio */}
              <p className="font-source text-esperanza-600">Transformando vidas desde 1911</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBooks;