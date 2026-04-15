# terrenosenpanama.com — Landing Page Design Spec
**Date:** 2026-04-14  
**Project:** terrenospanama2  
**Property:** Proyecto Villa Real — Las Lajas de Coronado, Panamá Oeste

---

## 1. Objetivo

Crear una landing page de página única (scroll vertical) para vender lotes residenciales de 1,000 m² en Las Lajas de Coronado, Panamá. El objetivo principal es captar leads: que el visitante complete el formulario de contacto. No se muestran precios; se comunica "facilidades de pago" y se invita a solicitar información.

---

## 2. Diseño Visual

**Estilo:** Moderno Tropical  
**Paleta:**
- Verde oscuro principal: `#0f4c35`
- Verde esmeralda acento: `#1a7a52`
- Verde menta CTA: `#00c07a`
- Verde menta claro: `#7fffc4`
- Blanco: `#ffffff`
- Fondo claro: `#f8fdfb`
- Fondo oscuro footer: `#071f15`

**Tipografía:**
- Títulos: Inter 800/900, sin-serif, bold
- Cuerpo: Inter 400/500
- Sin fuentes serif

**Idiomas:** Toggle ES / EN (estado React, sin librería externa i18n). El contenido en ambos idiomas está hardcodeado en el componente como un objeto de traducción.

---

## 3. Stack Técnico

- **Framework:** Next.js 14 (App Router), TypeScript
- **Estilos:** Tailwind CSS v4 + clases CSS personalizadas en `globals.css`
- **Formulario:** API Route (`/api/contact`) que envía email a `info@terrenosenpanama.com` usando **Resend** (SDK `resend`)
- **Imágenes:** `next/image` con fotos de Unsplash como placeholder hasta disponer de fotos propias
- **Responsive:** Mobile-first, breakpoints en `sm` (640px) y `lg` (1024px)

---

## 4. Estructura de la Página (scroll único)

### Nav (sticky)
- Fondo: `#0f4c35` con backdrop-blur
- Izquierda: logo `terrenosenpanama.com` con `.com` en verde menta
- Centro (desktop): links de navegación → "El Proyecto", "Ubicación", "FAQ", "Contacto"
- Derecha: toggle ES | EN + botón CTA "Contactar" (pill verde menta)
- En mobile: hamburger menu con menú desplegable

### Hero (sección ①)
- Altura: `100vh`, pantalla completa
- Fondo: foto de naturaleza/campo (Unsplash) con overlay `rgba(15,76,53,0.88)`
- Contenido centrado verticalmente:
  - Badge pill: "Últimos Lotes Disponibles" / "Last Lots Available" — borde verde menta translúcido
  - H1: "Su Terreno en Panamá / a 15 Minutos de la Playa"
  - Subtítulo: descripción breve del proyecto
  - 2 CTAs: "Solicitar Información →" (pill verde menta sólido) + "Conocer el Proyecto" (pill borde blanco)
- Animación: fade-up escalonado (badge → h1 → subtítulo → CTAs)
- Scroll indicator (flecha animada) en la parte inferior

### Barra de Stats
- Fondo: `#0f4c35`
- 4 columnas: `1,000 m²` · `15 min` · `100%` · `USD $`
- Cifras en verde menta, etiquetas en blanco semitransparente

### El Proyecto (sección ②)
- Fondo blanco, layout de 2 columnas en desktop (texto | fotos)
- Texto: tag "Proyecto Villa Real", titular, descripción
- Grid de imágenes: 1 imagen grande (aérea) + 2 imágenes menores (lotes, entorno)
- Imágenes con `next/image` y `object-cover`

### Infraestructura (sección ③)
- Fondo: `#f8fdfb`
- Tag + titular centrado
- 6 tarjetas en grid 2×3 (mobile: 1 columna, tablet: 2, desktop: 3):
  - Calles de acceso 🛣️
  - Energía eléctrica ⚡
  - Agua potable 💧
  - Fibra óptica 📡
  - Portón de seguridad 🔒
  - Libre construcción 🏗️
- Cada tarjeta: icono grande + título + descripción corta
- Hover: borde superior verde menta + elevación suave

### Ubicación (sección ④)
- Fondo: `#0f4c35` (dark)
- Tag + titular en blanco
- 6 items con icono de pin verde menta + texto + subdetalle
- Layout: 2 columnas en desktop

### ¿Por Qué Invertir? (sección ⑤)
- Fondo blanco
- 4 tarjetas en grid 2×2 (desktop):
  - Extranjeros bienvenidos
  - Alta valorización
  - Calidad de vida
  - Economía en USD
- Cada tarjeta: borde izquierdo verde menta + icono + título + descripción

### FAQ (sección ⑥)
- Fondo: `#f8fdfb`
- 8 preguntas en accordion (React state `openIndex`)
- Animación de apertura/cierre suave
- Preguntas:
  1. ¿Pueden comprar extranjeros?
  2. ¿Qué incluye cada lote?
  3. ¿Hay restricciones de construcción?
  4. ¿Dónde está ubicado?
  5. ¿Ofrecen facilidades de pago?
  6. ¿Los lotes tienen título de propiedad?
  7. ¿Qué tan cerca están los servicios?
  8. ¿Es buena inversión?

### Formulario de Contacto (sección ⑦)
- Fondo: gradiente `#0f4c35 → #1a7a52`
- Campos: Nombre completo, Email, Teléfono (opcional), Mensaje
- Validación: cliente (campos requeridos, formato email)
- Submit → `POST /api/contact` → Resend → email a `info@terrenosenpanama.com`
- Estados: loading (spinner), éxito (mensaje de confirmación), error (mensaje de error)
- **Sin WhatsApp**

### Footer
- Fondo: `#071f15`
- Logo + email `info@terrenosenpanama.com` + copyright `© 2025 terrenosenpanama.com`

---

## 5. Animaciones y UX

- Fade-up escalonado en hero al cargar la página
- Cards de infraestructura e inversión: hover con elevación y borde superior
- Nav: se hace sólido (sin transparencia) al hacer scroll
- FAQ: acordeón con transición suave de altura
- Scroll suave entre secciones (CSS `scroll-behavior: smooth`)
- Botón CTA de contacto visible en nav en todo momento

---

## 6. Formulario — API Route

**Archivo:** `src/app/api/contact/route.ts`

```
POST /api/contact
Body: { name, email, phone?, message, lang }
→ Resend SDK → email a info@terrenosenpanama.com
→ 200 OK | 400 validación | 500 error interno
```

Variables de entorno necesarias:
- `RESEND_API_KEY` — clave de la API de Resend

---

## 7. Archivos a Crear

```
terrenospanama2/
├── src/
│   └── app/
│       ├── layout.tsx          # metadata, fuentes, lang="es"
│       ├── page.tsx            # componente principal (todo el contenido)
│       ├── globals.css         # reset + clases reutilizables
│       └── api/
│           └── contact/
│               └── route.ts    # API route del formulario
├── next.config.ts              # remotePatterns para Unsplash (images.unsplash.com)
├── public/                     # favicon (placeholder)
├── .env.local                  # RESEND_API_KEY
└── package.json                # next, react, tailwindcss, resend
```

> **Nota sobre imágenes:** `next.config.ts` debe incluir `images.remotePatterns` con `{ protocol: 'https', hostname: 'images.unsplash.com' }` para que `next/image` acepte URLs externas de Unsplash sin error en producción.

---

## 8. Contenido Bilingüe

Objeto `translations` con claves `es` y `en` dentro de `page.tsx`. El toggle cambia el estado `lang` del componente (`'es' | 'en'`). No se usa ninguna librería de i18n. El URL no cambia con el idioma.

---

## 9. Criterios de Éxito

- El formulario envía el email correctamente a `info@terrenosenpanama.com`
- La página es 100% responsive (mobile, tablet, desktop)
- El toggle ES/EN traduce todo el contenido visible
- Las animaciones funcionan sin jank
- La página carga en < 3s en conexión normal
- No aparecen precios en ningún lugar
- No aparece WhatsApp en ningún lugar
