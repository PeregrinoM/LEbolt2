import React, { useEffect, useRef, useCallback } from 'react';

interface PreloadItem {
  type: 'image' | 'section' | 'component';
  src?: string;
  sectionId?: string;
  priority: 'high' | 'medium' | 'low';
}

const IntelligentPreloader: React.FC = () => {
  const preloadedItems = useRef<Set<string>>(new Set());
  const preloadQueue = useRef<PreloadItem[]>([]);
  const isPreloading = useRef(false);

  // Definir elementos críticos para precargar
  const criticalAssets: PreloadItem[] = [
    // Imágenes de testimonios (alta prioridad)
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      priority: 'high'
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      priority: 'high'
    },
    // Secciones siguientes (prioridad media)
    {
      type: 'section',
      sectionId: 'solicitar',
      priority: 'medium'
    },
    {
      type: 'section',
      sectionId: 'preguntas',
      priority: 'medium'
    }
  ];

  // Función para precargar imágenes
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (preloadedItems.current.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        preloadedItems.current.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  // Función para precargar contenido de una sección
  const preloadSection = useCallback((sectionId: string) => {
    if (preloadedItems.current.has(sectionId)) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    // Precargar imágenes lazy de la sección
    const lazyImages = section.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => {
      const src = img.getAttribute('data-src');
      if (src) {
        preloadImage(src).catch(() => {
          console.warn(`Failed to preload image: ${src}`);
        });
      }
    });

    // Marcar sección como precargada
    preloadedItems.current.add(sectionId);
  }, [preloadImage]);

  // Procesador de cola de precarga
  const processPreloadQueue = useCallback(async () => {
    if (isPreloading.current || preloadQueue.current.length === 0) return;

    isPreloading.current = true;

    // Ordenar por prioridad
    const sortedQueue = [...preloadQueue.current].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    for (const item of sortedQueue) {
      try {
        if (item.type === 'image' && item.src) {
          await preloadImage(item.src);
        } else if (item.type === 'section' && item.sectionId) {
          preloadSection(item.sectionId);
        }
      } catch (error) {
        console.warn('Preload failed:', error);
      }

      // Pequeña pausa para no bloquear el hilo principal
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    preloadQueue.current = [];
    isPreloading.current = false;
  }, [preloadImage, preloadSection]);

  // Agregar elementos a la cola de precarga
  const addToPreloadQueue = useCallback((items: PreloadItem[]) => {
    preloadQueue.current.push(...items);
    
    // Procesar con un pequeño delay para no interferir con la carga inicial
    setTimeout(processPreloadQueue, 100);
  }, [processPreloadQueue]);

  // Detectar navegación y precargar contenido siguiente
  useEffect(() => {
    const sections = ['inicio', 'libros', 'testimonios', 'solicitar', 'preguntas', 'contacto'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            const currentIndex = sections.indexOf(entry.target.id);
            
            if (currentIndex !== -1 && currentIndex < sections.length - 1) {
              // Precargar las próximas 2 secciones
              const nextSections = sections.slice(currentIndex + 1, currentIndex + 3);
              const preloadItems: PreloadItem[] = nextSections.map(sectionId => ({
                type: 'section',
                sectionId,
                priority: 'medium'
              }));
              
              addToPreloadQueue(preloadItems);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar todas las secciones
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [addToPreloadQueue]);

  // Precargar assets críticos al montar el componente
  useEffect(() => {
    // Esperar a que la página esté completamente cargada
    if (document.readyState === 'complete') {
      addToPreloadQueue(criticalAssets);
    } else {
      window.addEventListener('load', () => {
        addToPreloadQueue(criticalAssets);
      });
    }
  }, [addToPreloadQueue]);

  // Precargar basado en interacciones del usuario
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target is an Element before calling closest
      if (!(target instanceof Element)) {
        return;
      }
      
      // Si el usuario hace hover sobre un enlace de navegación
      if (target.closest('[data-section]')) {
        const sectionId = target.closest('[data-section]')?.getAttribute('data-section');
        if (sectionId) {
          addToPreloadQueue([{
            type: 'section',
            sectionId,
            priority: 'high'
          }]);
        }
      }
    };

    // Precargar cuando el usuario hace hover sobre elementos de navegación
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, [addToPreloadQueue]);

  // Precargar basado en el scroll del usuario
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Si el usuario está cerca del final de la página
        if (scrollPosition + windowHeight > documentHeight * 0.8) {
          addToPreloadQueue([{
            type: 'section',
            sectionId: 'contacto',
            priority: 'medium'
          }]);
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [addToPreloadQueue]);

  // Optimización para conexiones lentas
  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const isSlowConnection = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
      
      if (isSlowConnection) {
        // En conexiones lentas, solo precargar elementos críticos
        const criticalOnly = criticalAssets.filter(item => item.priority === 'high');
        addToPreloadQueue(criticalOnly);
      }
    }
  }, [addToPreloadQueue]);

  return null; // Este componente no renderiza nada visible
};

export default IntelligentPreloader;