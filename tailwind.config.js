/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        // ========================================
        // PALETA DE COLORES SIMPLIFICADA
        // Actualizado: Enero 2025
        // Solo los colores específicos del usuario + mínimas variantes necesarias
        // ========================================
        
        // Azules - Color Principal y Secundario
        celestial: {
          100: '#E8F1FB',  // Versión muy clara del secundario (solo para fondos sutiles)
          400: '#6B9BD1',  // Color Secundario - Subtítulos, elementos secundarios, iconos
          700: '#2E5A87',  // Color Principal - Headers, navegación principal, elementos de marca
          900: '#1A3A5C',  // Versión más oscura del principal (solo para texto sobre fondos claros)
        },
        
        // Naranjas/Marrones - Color de Acento y CTA
        dorado: {
          100: '#F5E6D3',  // Versión muy clara del acento (solo para fondos sutiles)
          500: '#D4A574',  // Color de Acento - Destacados, testimonios, elementos decorativos
          600: '#E67E22',  // Color CTA - Botones "Solicitar Libro", formularios
          900: '#8B4513',  // Versión más oscura (solo para texto sobre fondos claros)
        },
        
        // Grises - Color de Fondo y Texto
        esperanza: {
          50: '#F8F9FA',   // Color de Fondo - Fondo general de la página, secciones
          100: '#FFFFFF',  // Blanco puro (para tarjetas y elementos destacados)
          200: '#E9ECEF',  // Gris muy claro (solo para bordes sutiles)
          800: '#2C3E50',  // Color de Texto - Texto principal, párrafos, contenido
          900: '#1A252F',  // Versión más oscura del texto (solo para énfasis)
        }
      },
      backgroundImage: {
        // Gradientes simplificados usando solo los colores principales
        'gradient-celestial': 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)', // Fondo a blanco
        'gradient-dorado': 'linear-gradient(135deg, #F5E6D3 0%, #D4A574 100%)', // Acento suave a acento
        'gradient-esperanza': 'linear-gradient(135deg, #2E5A87 0%, #E67E22 100%)', // Principal a CTA
      }
    },
  },
  plugins: [],
};