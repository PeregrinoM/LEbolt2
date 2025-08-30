import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  onLoad,
  onError
}) => {
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder SVG optimizado
  const defaultPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f1f5f9"/>
      <circle cx="200" cy="120" r="20" fill="#cbd5e1" opacity="0.6"/>
      <rect x="160" y="160" width="80" height="8" rx="4" fill="#cbd5e1" opacity="0.4"/>
      <rect x="140" y="180" width="120" height="6" rx="3" fill="#cbd5e1" opacity="0.3"/>
      <text x="200" y="220" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="14">
        Cargando imagen...
      </text>
    </svg>
  `)}`;

  // Efecto principal que se ejecuta cada vez que cambia la prop src
  useEffect(() => {
    // Si no hay src, no hacer nada
    if (!src) return;

    // Reiniciar todos los estados para la nueva imagen
    setIsLoaded(false);
    setHasError(false);
    setIsLoading(true);
    setCurrentImageSrc(null);

    // Crear una nueva instancia de Image para precargar
    const img = new Image();
    let isCancelled = false;

    // Configurar manejadores de eventos
    img.onload = () => {
      if (!isCancelled) {
        setCurrentImageSrc(src);
        setIsLoaded(true);
        setIsLoading(false);
        onLoad?.();
      }
    };
    
    img.onerror = () => {
      if (!isCancelled) {
        setHasError(true);
        setIsLoading(false);
        onError?.();
      }
    };
    
    // Iniciar la carga de la imagen
    img.src = src;

    // Función de limpieza para cancelar la carga si el componente se desmonta
    // o si la src cambia antes de que termine de cargar
    return () => {
      isCancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  // Determinar qué imagen mostrar
  const displaySrc = currentImageSrc || placeholder || defaultPlaceholder;

  return (
    <div className="relative overflow-hidden">
      <img
        src={displaySrc}
        alt={alt}
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-105'
        } ${className}`}
        style={{
          filter: isLoaded ? 'none' : 'blur(2px)',
        }}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-celestial-50/80 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-6 w-6 text-celestial-500 animate-spin" />
            <span className="text-sm font-source text-celestial-600">Cargando...</span>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200">
          <div className="text-center p-4">
            <div className="text-red-400 mb-2">⚠️</div>
            <span className="text-sm font-source text-red-600">Error al cargar imagen</span>
          </div>
        </div>
      )}
      
      {/* Progressive enhancement indicator */}
      {!isLoaded && !hasError && !isLoading && (
        <div className="absolute bottom-2 right-2 bg-black/20 text-white px-2 py-1 rounded text-xs font-source">
          Preparando...
        </div>
      )}
    </div>
  );
};

export default LazyImage;