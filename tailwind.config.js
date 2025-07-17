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
        // NUEVA PALETA DE COLORES 
        // Actualizado: Enero 2025
        // ========================================
        // Definiciones basadas en los usos recomendados por el usuario
        
        // Color Principal y Secundario (anteriormente 'celestial')
        // Uso: Headers, navegación principal, elementos de marca, subtítulos, iconos
        celestial: {
          50: '#eaf2f8',   // Tono muy claro de azul, para fondos sutiles
          100: '#d5e5f1',  // Tono muy claro de azul
          200: '#aed0e5',  // Tono claro de azul
          300: '#87bbda',  // Tono medio claro de azul
          400: '#6B9BD1',  // Color Secundario (del usuario) - Subtítulos, elementos secundarios, iconos
          500: '#4F7CBF',  // Tono medio de azul, ajustado para la escala
          600: '#3C69A3',  // Tono medio oscuro de azul
          700: '#2E5A87',  // Color Principal (del usuario) - Headers, navegación principal, elementos de marca
          800: '#224568',  // Tono oscuro de azul
          900: '#162e44',  // Tono muy oscuro de azul
        },
        
        // Color de Acento y CTA (anteriormente 'dorado')
        // Uso: Destacados, testimonios, elementos decorativos, botones CTA
        dorado: {
          50: '#fdf8f2',   // Tono muy claro de dorado
          100: '#faedde',  // Tono muy claro de dorado
          200: '#f2d7b8',  // Tono claro de dorado
          300: '#eac192',  // Tono medio claro de dorado
          400: '#e1ac6d',  // Ligeramente más claro que el acento
          500: '#D4A574',  // Color de Acento (del usuario) - Destacados, testimonios, elementos decorativos
          600: '#E67E22',  // Color CTA (del usuario) - Botones "Solicitar Libro", formularios
          700: '#b87e4e',  // Tono oscuro de dorado
          800: '#91633e',  // Tono más oscuro de dorado
          900: '#6b482e',  // Tono muy oscuro de dorado
        },
        
        // Color de Fondo y Texto (anteriormente 'esperanza')
        // Uso: Fondo general, texto principal, párrafos, contenido
        esperanza: {
          50: '#F8F9FA',   // Color de Fondo (del usuario) - Fondo general de la página, secciones
          100: '#eef0f2',  // Tono muy claro de gris/blanco
          200: '#dde2e6',  // Tono claro de gris
          300: '#cdd4d9',  // Tono medio claro de gris
          400: '#b8c0c7',  // Ligeramente más oscuro de gris
          500: '#a3aeb5',  // Tono medio de gris
          600: '#8e99a0',  // Tono medio oscuro de gris
          700: '#5f6c7a',  // Tono oscuro de gris
          800: '#2C3E50',  // Color de Texto (del usuario) - Texto principal, párrafos, contenido
          900: '#1f2b38',  // Tono muy oscuro de gris
        }
      },
      backgroundImage: {
        // Gradientes actualizados para usar la nueva paleta de colores
        'gradient-celestial': 'linear-gradient(135deg, #F8F9FA 0%, #eef0f2 50%, #fdf8f2 100%)', // Usando esperanza-50, esperanza-100, dorado-50
        'gradient-dorado': 'linear-gradient(135deg, #faedde 0%, #f2d7b8 100%)', // Usando dorado-100, dorado-200
        'gradient-esperanza': 'linear-gradient(135deg, #2E5A87 0%, #E67E22 100%)', // Usando celestial-700 (Principal) y dorado-600 (CTA)
      }
    },
  },
  plugins: [],
};