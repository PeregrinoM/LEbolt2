import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

// 6. Lazy loading inteligente para imágenes
export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjhmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYzNjNGM3Ij5DYXJnYW5kby4uLjwvdGV4dD48L3N2Zz4='
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-70'} ${className}`}
    />
  );
};

// 7. Detector de velocidad de conexión
export const ConnectionSpeedDetector = () => {
  const [connectionSpeed, setConnectionSpeed] = useState<'fast' | 'slow' | 'offline'>('fast');
  const [showOptimization, setShowOptimization] = useState(false);

  useEffect(() => {
    // Detectar tipo de conexión
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const updateConnectionSpeed = () => {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setConnectionSpeed('slow');
          setShowOptimization(true);
        } else if (effectiveType === '3g') {
          setConnectionSpeed('slow');
        } else {
          setConnectionSpeed('fast');
        }
      };

      updateConnectionSpeed();
      connection.addEventListener('change', updateConnectionSpeed);

      return () => {
        connection.removeEventListener('change', updateConnectionSpeed);
      };
    }

    // Fallback: test de velocidad simple
    const testSpeed = async () => {
      const startTime = Date.now();
      try {
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        if (duration > 1000) {
          setConnectionSpeed('slow');
          setShowOptimization(true);
        }
      } catch {
        setConnectionSpeed('offline');
      }
    };

    testSpeed();
  }, []);

  if (connectionSpeed === 'offline') {
    return (
      <div className="fixed top-20 left-4 right-4 z-50 md:hidden">
        <div className="bg-red-500 text-white p-4 rounded-xl shadow-lg flex items-center">
          <WifiOff className="h-5 w-5 mr-3" />
          <div>
            <p className="font-poppins font-semibold">Sin conexión</p>
            <p className="text-sm font-source">Algunos contenidos pueden no estar disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  if (showOptimization && connectionSpeed === 'slow') {
    return (
      <div className="fixed top-20 left-4 right-4 z-50 md:hidden">
        <div className="bg-orange-500 text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wifi className="h-5 w-5 mr-3" />
              <div>
                <p className="font-poppins font-semibold">Conexión lenta detectada</p>
                <p className="text-sm font-source">Optimizando contenido para ti...</p>
              </div>
            </div>
            <button
              onClick={() => setShowOptimization(false)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};


// 9. Precarga inteligente de contenido
export const IntelligentPreloader = () => {
  const [preloadedSections, setPreloadedSections] = useState<string[]>([]);

  const preloadSection = useCallback((sectionId: string) => {
    if (!preloadedSections.includes(sectionId)) {
      // Simular precarga de contenido
      const section = document.getElementById(sectionId);
      if (section) {
        const images = section.querySelectorAll('img[data-src]');
        images.forEach((img) => {
          const src = img.getAttribute('data-src');
          if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
          }
        });
        
        setPreloadedSections(prev => [...prev, sectionId]);
      }
    }
  }, [preloadedSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              // Precargar la siguiente sección
              const sections = ['inicio', 'libros', 'testimonios', 'solicitar', 'preguntas', 'contacto'];
              const currentIndex = sections.indexOf(sectionId);
              if (currentIndex !== -1 && currentIndex < sections.length - 1) {
                const nextSection = sections[currentIndex + 1];
                setTimeout(() => preloadSection(nextSection), 500);
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [preloadSection]);

  return null; // Este componente no renderiza nada visible
};