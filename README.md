# LEbolt

Guía rápida para ejecutar el proyecto correctamente en local (con Vite) y cómo visualizarlo con Go Live.

## Requisitos
- Node 18+ y npm 9+.

## Instalación
```bash
npm install
```

## Desarrollo (Vite)
Arranca un servidor que transforma TypeScript/TSX y soporta HMR.
```bash
npm run dev
```
Abre la URL que muestre la terminal (normalmente `http://localhost:5173`).

## Build de producción
Genera artefactos listos para producción en `dist/`.
```bash
npm run build
```

## Preview de producción
Sirve la carpeta `dist/` con un servidor estático de Vite.
```bash
npm run preview
```
Abre la URL que muestre la terminal (por ejemplo `http://localhost:4173`).

## Ver con Go Live (VS Code u otro)
Go Live sirve archivos estáticos y no compila TSX. Para que funcione:
1. Ejecuta `npm run build`.
2. Abre la carpeta `dist/` y lanza Go Live sobre `dist/index.html` (no sobre el `index.html` raíz del proyecto).

## Notas
- En desarrollo, usa siempre `npm run dev` (Vite transforma `/src/main.tsx`).
- En producción/local preview, usa `npm run preview` o Go Live sobre `dist/`.

