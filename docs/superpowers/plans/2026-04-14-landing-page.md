# terrenosenpanama.com Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ES/EN) single-scroll landing page in Next.js 14 for Proyecto Villa Real, with contact form that sends leads to info@terrenosenpanama.com via Resend.

**Architecture:** One `page.tsx` holds all sections and the `translations` object. A single `lang` state at the top drives the ES/EN toggle across every section. The contact form posts to `/api/contact` which uses the Resend SDK to email `info@terrenosenpanama.com`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v4, Resend SDK, next/image, Unsplash (placeholder images)

---

## File Map

| File | Responsibility |
|------|----------------|
| `src/app/layout.tsx` | HTML shell, metadata, Inter font, `lang="es"` |
| `src/app/globals.css` | CSS reset, color variables, animation keyframes, utility classes |
| `src/app/page.tsx` | All sections + `translations` object + `lang` state + `menuOpen` state |
| `src/app/api/contact/route.ts` | POST handler → validates body → Resend → 200/400/500 |
| `next.config.ts` | `remotePatterns` for images.unsplash.com |
| `.env.local` | `RESEND_API_KEY` |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `terrenospanama2/` (entire project)

- [ ] **Step 1: Run create-next-app in the existing directory**

```bash
cd "C:/Users/Raul Lopez/Desktop/claude"
npx create-next-app@14 terrenospanama2 --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

> Note: This will prompt to overwrite the existing directory — confirm yes. It creates `src/app/` structure with App Router.

- [ ] **Step 2: Install Resend**

```bash
cd "C:/Users/Raul Lopez/Desktop/claude/terrenospanama2"
npm install resend
```

- [ ] **Step 3: Create .env.local**

Create `C:/Users/Raul Lopez/Desktop/claude/terrenospanama2/.env.local`:
```
RESEND_API_KEY=re_placeholder_replace_with_real_key
```

> The real key comes from resend.com after registering. For now the placeholder lets the project build; the form will fail to send until replaced.

- [ ] **Step 4: Verify dev server starts**

```bash
cd "C:/Users/Raul Lopez/Desktop/claude/terrenospanama2"
npm run dev
```

Expected: server starts on http://localhost:3000 with default Next.js page.

- [ ] **Step 5: Commit scaffold**

```bash
cd "C:/Users/Raul Lopez/Desktop/claude/terrenospanama2"
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind and Resend"
```

---

## Task 2: Configure project (next.config + globals.css + layout.tsx)

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update next.config.ts**

Replace the contents of `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Replace globals.css**

Replace the full contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  color: #1e293b;
  background: #ffffff;
  line-height: 1.7;
}

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(10px); }
}

.animate-fade-up   { animation: fadeUp 0.7s ease-out both; }
.animate-fade-up-1 { animation: fadeUp 0.7s ease-out 0.15s both; }
.animate-fade-up-2 { animation: fadeUp 0.7s ease-out 0.30s both; }
.animate-fade-up-3 { animation: fadeUp 0.7s ease-out 0.45s both; }
.scroll-bounce     { animation: bounce 2s ease-in-out infinite; }

/* ── Hero ── */
.hero-bg {
  background:
    linear-gradient(160deg, rgba(15,76,53,0.90) 0%, rgba(26,122,82,0.70) 50%, rgba(0,192,122,0.50) 100%),
    url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80') center/cover no-repeat;
  min-height: 100vh;
}

/* ── Sticky nav ── */
.nav-solid {
  background: rgba(15,76,53,0.97) !important;
  backdrop-filter: blur(16px);
}

/* ── Feature cards ── */
.feature-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid #e2f0eb;
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
}
.feature-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: #00c07a;
  opacity: 0;
  transition: opacity 0.3s;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 48px rgba(15,76,53,0.10);
  border-color: transparent;
}
.feature-card:hover::after { opacity: 1; }

/* ── Invest cards ── */
.invest-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid #e2f0eb;
  border-left: 4px solid #00c07a;
  transition: all 0.3s ease;
}
.invest-card:hover {
  box-shadow: 0 12px 36px rgba(15,76,53,0.08);
  transform: translateY(-3px);
}

/* ── FAQ accordion ── */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
}
.faq-answer.open {
  max-height: 400px;
}

/* ── Form fields ── */
.form-field {
  width: 100%;
  padding: 0.875rem 1.125rem;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 10px;
  background: rgba(255,255,255,0.10);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.25s;
}
.form-field::placeholder { color: rgba(255,255,255,0.45); }
.form-field:focus { border-color: #00c07a; }

/* ── CTA buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: #00c07a;
  color: #fff;
  font-weight: 700;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  text-decoration: none;
}
.btn-primary:hover {
  background: #00a669;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,192,122,0.35);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border: 2px solid rgba(255,255,255,0.55);
  color: #fff;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-secondary:hover {
  background: rgba(255,255,255,0.12);
  border-color: #fff;
}

/* ── Section spacing ── */
.section-pad {
  padding: 5rem 1.5rem;
}
@media (min-width: 768px) {
  .section-pad { padding: 6rem 2rem; }
}
```

- [ ] **Step 3: Replace layout.tsx**

Replace the full contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Proyecto Villa Real — Lotes en Coronado, Panamá | terrenosenpanama.com",
  description:
    "Venta de lotes residenciales de 1,000 m² en Las Lajas de Coronado, Panamá Oeste. A 15 minutos de la playa, infraestructura completa, facilidades de pago.",
  keywords: "terrenos panama, lotes coronado, venta lotes panama, proyecto villa real, las lajas coronado",
  openGraph: {
    title: "Proyecto Villa Real — Lotes en Coronado, Panamá",
    description: "Lotes residenciales de 1,000 m² a 15 min de la playa. Infraestructura completa y facilidades de pago.",
    type: "website",
    locale: "es_PA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build still compiles**

```bash
cd "C:/Users/Raul Lopez/Desktop/claude/terrenospanama2"
npm run build
```

Expected: ✓ Compiled successfully (or just run `npm run dev` and check for errors in browser).

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: configure project foundation — globals, layout, next.config"
```

---

## Task 3: Translations object + page.tsx shell

**Files:**
- Create: `src/app/page.tsx` (replaces the scaffold version)

- [ ] **Step 1: Replace page.tsx with the full shell + translations**

Replace the full contents of `src/app/page.tsx` with:

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════ */
const T = {
  es: {
    nav: {
      project: "El Proyecto",
      location: "Ubicación",
      faq: "FAQ",
      contact: "Contactar",
    },
    hero: {
      badge: "Últimos Lotes Disponibles",
      h1a: "Su Terreno en Panamá,",
      h1b: "a 15 Minutos de la Playa",
      sub: "Lotes residenciales de 1,000 m² en Las Lajas de Coronado, Panamá Oeste. Infraestructura completa, título de propiedad y facilidades de pago.",
      cta1: "Solicitar Información",
      cta2: "Conocer el Proyecto",
      scroll: "Descubra más",
    },
    stats: [
      { num: "1,000 m²", label: "Por Lote" },
      { num: "15 min",   label: "A la Playa" },
      { num: "100%",     label: "Escriturado" },
      { num: "USD",      label: "Moneda Oficial" },
    ],
    project: {
      tag: "Proyecto Villa Real",
      h2: "Su Refugio en el Pacífico Panameño",
      p: "Un desarrollo residencial exclusivo en Las Lajas de Coronado, Panamá Oeste. Lotes amplios de 1,000 m², infraestructura completa y un entorno natural privilegiado. A solo minutos de las playas más hermosas de Panamá y con acceso rápido a todos los servicios esenciales.",
      img1alt: "Vista aérea del proyecto",
      img2alt: "Lotes disponibles",
      img3alt: "Entorno natural",
    },
    infra: {
      tag: "Infraestructura Completa",
      h2: "Listo para Construir",
      sub: "Su lote incluye todos los servicios esenciales. Empiece a construir desde el primer día.",
      items: [
        { icon: "🛣️", title: "Calles de Acceso",    desc: "Vías internas para acceso cómodo a cada lote del proyecto." },
        { icon: "⚡", title: "Energía Eléctrica",   desc: "Red eléctrica disponible con conexión inmediata." },
        { icon: "💧", title: "Agua Potable",         desc: "Servicio de agua potable garantizado en el desarrollo." },
        { icon: "📡", title: "Fibra Óptica",         desc: "Internet de alta velocidad para trabajo remoto y entretenimiento." },
        { icon: "🔒", title: "Portón de Seguridad",  desc: "Acceso controlado para su tranquilidad y la de su familia." },
        { icon: "🏗️", title: "Libre Construcción",  desc: "Diseñe y construya a su gusto, sin restricciones de estilo." },
      ],
    },
    location: {
      tag: "Ubicación Privilegiada",
      h2: "Todo lo que Necesita, Cerca de Usted",
      items: [
        { icon: "🏖️", text: "15 minutos de las playas de Coronado",    detail: "Disfrute del Pacífico panameño" },
        { icon: "🛣️", text: "A 3 km de la Vía Interamericana",          detail: "Conexión directa con Ciudad de Panamá" },
        { icon: "🏙️", text: "~1.5 horas de Ciudad de Panamá",          detail: "Perfecta distancia del trabajo y la ciudad" },
        { icon: "🏥", text: "Hospitales y centros de salud cercanos",   detail: "Atención médica de calidad" },
        { icon: "🛒", text: "Supermercados y centros comerciales",       detail: "Rey, Machetazo, plazas en Coronado" },
        { icon: "⛳", text: "Golf, club de playa y restaurantes",        detail: "Coronado Golf & Beach Resort" },
      ],
    },
    invest: {
      tag: "Inversión Inteligente",
      h2: "¿Por Qué Invertir en Panamá?",
      items: [
        { icon: "🌍", title: "Extranjeros Bienvenidos",  desc: "Mismos derechos de propiedad que un ciudadano panameño. 100% a su nombre, sin restricciones." },
        { icon: "📈", title: "Alta Valorización",         desc: "Coronado es el mercado de playa más consolidado de Panamá con apreciación constante." },
        { icon: "🌴", title: "Calidad de Vida",           desc: "Clima tropical todo el año, playas, naturaleza y servicios de primer nivel." },
        { icon: "💵", title: "Economía en Dólares",       desc: "Panamá usa el USD. Cero riesgo cambiario en su inversión." },
      ],
    },
    faq: {
      tag: "Preguntas Frecuentes",
      h2: "Todo lo que Necesita Saber",
      items: [
        { q: "¿Pueden comprar terreno los extranjeros?",
          a: "Sí. La Constitución de Panamá otorga a los extranjeros los mismos derechos de propiedad que a los ciudadanos. Puede comprar a título personal o mediante sociedad anónima." },
        { q: "¿Qué incluye cada lote?",
          a: "Cada lote de 1,000 m² incluye acceso a calles internas, energía eléctrica, agua potable, fibra óptica disponible y acceso al portón de seguridad." },
        { q: "¿Hay restricciones de construcción?",
          a: "No. Los lotes son de libre construcción. Diseñe la casa de sus sueños cumpliendo las normas municipales básicas." },
        { q: "¿Dónde está ubicado exactamente?",
          a: "En Las Lajas de Coronado, Panamá Oeste. A 3 km de la Vía Interamericana, 15 min de la playa y aproximadamente 1.5 horas de la Ciudad de Panamá." },
        { q: "¿Ofrecen facilidades de pago?",
          a: "Sí, contamos con planes de pago flexibles adaptados a su situación. Contáctenos para conocer las opciones disponibles." },
        { q: "¿Los lotes tienen título de propiedad?",
          a: "Sí. Todos los lotes cuentan con plano aprobado y título de propiedad registrado para total seguridad jurídica." },
        { q: "¿Qué servicios hay cerca?",
          a: "Coronado cuenta con supermercados, hospitales, escuelas, bancos, restaurantes, golf y club de playa, todo a pocos minutos." },
        { q: "¿Es una buena inversión?",
          a: "Panamá es uno de los mercados inmobiliarios más estables de América Latina, usa el dólar y ofrece exoneraciones fiscales en nuevas construcciones." },
      ],
    },
    contact: {
      tag: "Contacto",
      h2: "Solicite Información",
      sub: "Complete el formulario y le responderemos a la brevedad. Sin compromisos.",
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono (opcional)",
      message: "¿En qué podemos ayudarle?",
      submit: "Enviar Solicitud",
      sending: "Enviando...",
      success: "¡Mensaje enviado! Le contactaremos pronto.",
      error: "Hubo un error. Por favor intente de nuevo.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      project: "The Project",
      location: "Location",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      badge: "Last Lots Available",
      h1a: "Your Land in Panama,",
      h1b: "15 Minutes from the Beach",
      sub: "Residential lots of 1,000 m² in Las Lajas de Coronado, West Panama. Full infrastructure, clear title, and flexible payment plans.",
      cta1: "Request Information",
      cta2: "Learn More",
      scroll: "Discover more",
    },
    stats: [
      { num: "1,000 m²", label: "Per Lot" },
      { num: "15 min",   label: "To the Beach" },
      { num: "100%",     label: "Clear Title" },
      { num: "USD",      label: "Official Currency" },
    ],
    project: {
      tag: "Villa Real Project",
      h2: "Your Refuge on the Pacific Coast",
      p: "An exclusive residential development in Las Lajas de Coronado, West Panama. Generous 1,000 m² lots, full infrastructure, and a privileged natural setting. Minutes from Panama's most beautiful beaches and with quick access to all essential services.",
      img1alt: "Aerial view of the project",
      img2alt: "Available lots",
      img3alt: "Natural surroundings",
    },
    infra: {
      tag: "Full Infrastructure",
      h2: "Ready to Build",
      sub: "Your lot includes all essential services. Start building from day one.",
      items: [
        { icon: "🛣️", title: "Access Roads",        desc: "Internal paved roads for easy access to every lot." },
        { icon: "⚡", title: "Electricity",          desc: "Power grid available for immediate connection." },
        { icon: "💧", title: "Drinking Water",       desc: "Guaranteed potable water service within the development." },
        { icon: "📡", title: "Fiber Optic",          desc: "High-speed internet for remote work and entertainment." },
        { icon: "🔒", title: "Security Gate",        desc: "Controlled access for your peace of mind." },
        { icon: "🏗️", title: "Build Freely",        desc: "Design your dream home with no style restrictions." },
      ],
    },
    location: {
      tag: "Prime Location",
      h2: "Everything You Need, Close to You",
      items: [
        { icon: "🏖️", text: "15 minutes from Coronado's beaches",   detail: "Enjoy the Panamanian Pacific" },
        { icon: "🛣️", text: "3 km from the Inter-American Highway", detail: "Direct connection to Panama City" },
        { icon: "🏙️", text: "~1.5 hours from Panama City",          detail: "Perfect distance from the city" },
        { icon: "🏥", text: "Hospitals and health centers nearby",   detail: "Quality healthcare close by" },
        { icon: "🛒", text: "Supermarkets and shopping centers",     detail: "Rey, Machetazo, plazas in Coronado" },
        { icon: "⛳", text: "Golf, beach club and restaurants",       detail: "Coronado Golf & Beach Resort" },
      ],
    },
    invest: {
      tag: "Smart Investment",
      h2: "Why Invest in Panama?",
      items: [
        { icon: "🌍", title: "Foreigners Welcome",      desc: "Same property rights as Panamanian citizens. 100% in your name, no restrictions." },
        { icon: "📈", title: "High Appreciation",        desc: "Coronado is Panama's most established beach market with steady appreciation." },
        { icon: "🌴", title: "Quality of Life",          desc: "Tropical climate year-round, beaches, nature and top-tier services." },
        { icon: "💵", title: "Dollar Economy",           desc: "Panama uses USD. Zero currency risk on your investment." },
      ],
    },
    faq: {
      tag: "FAQ",
      h2: "Everything You Need to Know",
      items: [
        { q: "Can foreigners buy property?",
          a: "Yes. Panama's Constitution grants foreigners the same property rights as citizens. You can buy in your own name or through a corporation." },
        { q: "What does each lot include?",
          a: "Each 1,000 m² lot includes access to internal roads, electricity, potable water, available fiber optic, and access to the security gate." },
        { q: "Are there construction restrictions?",
          a: "No. Lots are free to build on. Design your dream home following basic municipal regulations." },
        { q: "Where exactly is it located?",
          a: "In Las Lajas de Coronado, West Panama. 3 km from the Inter-American Highway, 15 min from the beach, ~1.5 hours from Panama City." },
        { q: "Do you offer payment plans?",
          a: "Yes, we offer flexible payment plans tailored to your situation. Contact us to learn about available options." },
        { q: "Do the lots have a clear title?",
          a: "Yes. All lots have an approved survey plan and registered property title for full legal security." },
        { q: "What services are nearby?",
          a: "Coronado has supermarkets, hospitals, schools, banks, restaurants, golf and beach club, all within minutes." },
        { q: "Is it a good investment?",
          a: "Panama is one of Latin America's most stable real estate markets, uses the dollar, and offers tax exemptions on new construction." },
      ],
    },
    contact: {
      tag: "Contact",
      h2: "Request Information",
      sub: "Fill out the form and we'll get back to you shortly. No commitment required.",
      name: "Full name",
      email: "Email address",
      phone: "Phone number (optional)",
      message: "How can we help you?",
      submit: "Send Request",
      sending: "Sending...",
      success: "Message sent! We'll be in touch shortly.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT (shell — sections added in later tasks)
   ═══════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <p style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Shell OK — lang: {lang} | scrolled: {String(scrolled)}
      </p>
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and verify shell renders**

```bash
npm run dev
```

Open http://localhost:3000 — expect to see "Shell OK — lang: es | scrolled: false".

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add translations object and page shell with lang/scroll state"
```

---

## Task 4: Nav component (inside page.tsx)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the `<main>` in the return statement with the Nav**

Replace the entire `return (...)` block with:

```tsx
  return (
    <main>
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? "nav-solid shadow-lg" : "bg-[#0f4c35]/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="font-black text-lg text-white tracking-tight">
            terrenos<span className="text-[#00c07a]">enpanama.com</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-white/80">
            <a href="#proyecto" className="hover:text-[#00c07a] transition-colors">{t.nav.project}</a>
            <a href="#ubicacion" className="hover:text-[#00c07a] transition-colors">{t.nav.location}</a>
            <a href="#faq" className="hover:text-[#00c07a] transition-colors">{t.nav.faq}</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <div className="flex items-center bg-white/10 border border-white/20 rounded-full p-0.5 text-xs font-bold">
              <button
                onClick={() => setLang("es")}
                className={`px-3 py-1 rounded-full transition-all ${lang === "es" ? "bg-white text-[#0f4c35]" : "text-white/70 hover:text-white"}`}
              >ES</button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full transition-all ${lang === "en" ? "bg-white text-[#0f4c35]" : "text-white/70 hover:text-white"}`}
              >EN</button>
            </div>

            {/* CTA */}
            <a href="#contacto" className="hidden sm:inline-flex btn-primary text-sm py-2 px-5">
              {t.nav.contact}
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0f4c35] border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-white/80">
            <a href="#proyecto"  onClick={() => setMenuOpen(false)} className="hover:text-[#00c07a]">{t.nav.project}</a>
            <a href="#ubicacion" onClick={() => setMenuOpen(false)} className="hover:text-[#00c07a]">{t.nav.location}</a>
            <a href="#faq"       onClick={() => setMenuOpen(false)} className="hover:text-[#00c07a]">{t.nav.faq}</a>
            <a href="#contacto"  onClick={() => setMenuOpen(false)} className="btn-primary text-sm py-2 px-5 self-start">{t.nav.contact}</a>
          </div>
        )}
      </nav>
    </main>
  );
```

- [ ] **Step 2: Check nav renders in browser**

Refresh http://localhost:3000 — expect a dark green sticky nav with logo, lang toggle and hamburger on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add sticky nav with ES/EN toggle and mobile hamburger menu"
```

---

## Task 5: Hero section + Stats bar

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Hero + Stats inside `<main>`, after `</nav>`**

After the closing `</nav>` tag and before `</main>`, add:

```tsx
      {/* ── HERO ── */}
      <section className="hero-bg flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5 pt-20">
          {/* Badge */}
          <span className="animate-fade-up border border-[#00c07a]/50 bg-[#00c07a]/15 text-[#7fffc4] text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
            {t.hero.badge}
          </span>

          {/* Headline */}
          <h1 className="animate-fade-up-1 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            {t.hero.h1a}<br />{t.hero.h1b}
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up-2 text-white/80 text-lg max-w-xl leading-relaxed">
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-3 flex flex-wrap gap-3 justify-center mt-2">
            <a href="#contacto" className="btn-primary">{t.hero.cta1} →</a>
            <a href="#proyecto"  className="btn-secondary">{t.hero.cta2}</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase scroll-bounce">
          <span>{t.hero.scroll}</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#0f4c35] border-t border-[#00c07a]/20">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {t.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-[#00c07a]">{s.num}</div>
              <div className="text-xs font-semibold text-white/55 uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
```

- [ ] **Step 2: Verify hero renders full-screen with overlay and animations**

Refresh http://localhost:3000 — hero should fill the viewport, show the green overlay on the field photo, badge fades in first, then h1, subtitle, buttons. Stats bar appears below.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add hero section with fade-up animations and stats bar"
```

---

## Task 6: El Proyecto section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Proyecto section after the stats bar div**

```tsx
      {/* ── EL PROYECTO ── */}
      <section id="proyecto" className="section-pad bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.project.tag}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 mb-5 leading-tight">
                {t.project.h2}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">{t.project.p}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: lang === "es" ? "Tamaño" : "Size",         val: "1,000 m²" },
                  { label: lang === "es" ? "Uso" : "Use",             val: lang === "es" ? "Libre Construcción" : "Build Freely" },
                  { label: lang === "es" ? "Título" : "Title",        val: lang === "es" ? "Propiedad Plena" : "Full Ownership" },
                  { label: lang === "es" ? "Pago" : "Payment",        val: lang === "es" ? "Facilidades" : "Flexible Plans" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#f8fdfb] rounded-xl p-4 border border-[#e2f0eb]">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{item.label}</div>
                    <div className="font-bold text-[#0f4c35] mt-1">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-3 h-[420px]">
              <div className="col-span-2 relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=75"
                  alt={t.project.img1alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=75"
                  alt={t.project.img2alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=75"
                  alt={t.project.img3alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify images load and layout works**

Refresh — the project section should show 2-column on desktop (text left, image grid right), stacking on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add El Proyecto section with image grid"
```

---

## Task 7: Infraestructura section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Infraestructura section after the Proyecto section**

```tsx
      {/* ── INFRAESTRUCTURA ── */}
      <section className="section-pad bg-[#f8fdfb]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.infra.tag}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 mb-3 leading-tight">{t.infra.h2}</h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-12">{t.infra.sub}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {t.infra.items.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0f4c35] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify 6 cards render in 3-column grid on desktop**

Hover over a card — expect it to lift and show the green top border.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Infraestructura section with 6 feature cards"
```

---

## Task 8: Ubicación section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Ubicación section after Infraestructura**

```tsx
      {/* ── UBICACIÓN ── */}
      <section id="ubicacion" className="section-pad bg-[#0f4c35]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#7fffc4] text-xs font-bold tracking-widest uppercase">{t.location.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 leading-tight">{t.location.h2}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.location.items.map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-4 bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-5 transition-colors"
              >
                <span className="text-2xl mt-0.5 shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white leading-snug">{item.text}</p>
                  <p className="text-[#7fffc4]/70 text-sm mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify dark section renders with 6 location cards**

Refresh — dark green background, white text, mint-green detail text, 3 cols on desktop.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Ubicación section"
```

---

## Task 9: Por Qué Invertir section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Inversión section after Ubicación**

```tsx
      {/* ── POR QUÉ INVERTIR ── */}
      <section className="section-pad bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.invest.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 leading-tight">{t.invest.h2}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.invest.items.map((item) => (
              <div key={item.title} className="invest-card">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0f4c35] mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify 4 invest cards render in 2×2 grid**

Check hover — cards should lift slightly.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Por Qué Invertir section"
```

---

## Task 10: FAQ accordion

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add `openIndex` state to the component**

At the top of the `Home` function, next to the other state declarations, add:

```tsx
  const [openIndex, setOpenIndex] = useState<number | null>(null);
```

- [ ] **Step 2: Add FAQ section after the Inversión section**

```tsx
      {/* ── FAQ ── */}
      <section id="faq" className="section-pad bg-[#f8fdfb]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.faq.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 leading-tight">{t.faq.h2}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {t.faq.items.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#e2f0eb] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00c07a]/50"
              >
                <button
                  className="w-full flex justify-between items-center text-left px-6 py-5 font-semibold text-[#0f4c35] gap-4"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`text-[#00c07a] text-xl font-light shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
                  <p className="px-6 pb-5 text-slate-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify accordion works**

Click a question — answer should expand smoothly. Click again — collapses. Click a different question — previous one closes, new one opens.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add FAQ accordion section"
```

---

## Task 11: Contact form (client-side)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add form state variables to the component**

After `openIndex` state, add:

```tsx
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
```

- [ ] **Step 2: Add the handleSubmit function inside the component, before the return statement**

```tsx
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang }),
      });
      if (!res.ok) throw new Error("bad response");
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  }
```

- [ ] **Step 3: Add Contact section after the FAQ section**

```tsx
      {/* ── CONTACTO ── */}
      <section id="contacto" className="section-pad" style={{ background: "linear-gradient(135deg, #0f4c35 0%, #1a7a52 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#7fffc4] text-xs font-bold tracking-widest uppercase">{t.contact.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 leading-tight">{t.contact.h2}</h2>
            <p className="text-white/65 mt-3">{t.contact.sub}</p>
          </div>

          {formStatus === "success" ? (
            <div className="text-center py-12 px-8 bg-white/10 rounded-3xl border border-white/20">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-white font-bold text-xl">{t.contact.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder={t.contact.name}
                className="form-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                required
                placeholder={t.contact.email}
                className="form-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder={t.contact.phone}
                className="form-field"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <textarea
                required
                rows={4}
                placeholder={t.contact.message}
                className="form-field resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              {formStatus === "error" && (
                <p className="text-red-300 text-sm text-center">{t.contact.error}</p>
              )}
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="btn-primary justify-center text-base py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus === "sending" ? t.contact.sending : t.contact.submit + " →"}
              </button>
              <p className="text-white/35 text-xs text-center">info@terrenosenpanama.com</p>
            </form>
          )}
        </div>
      </section>
```

- [ ] **Step 4: Add Footer after Contact section, before closing `</main>`**

```tsx
      {/* ── FOOTER ── */}
      <footer className="bg-[#071f15] py-8 px-4 text-center">
        <div className="text-[#00c07a] font-black text-lg mb-2">
          terrenos<span className="text-white">enpanama.com</span>
        </div>
        <p className="text-white/35 text-xs">
          info@terrenosenpanama.com · © 2025 terrenosenpanama.com · {t.footer.rights}
        </p>
      </footer>
```

- [ ] **Step 5: Test form UI**

Refresh — scroll to contact section. Fill in all fields. Click submit — button should show "Enviando…" (will get a 500 error until the API route is wired, which is fine).

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add contact form, footer, and form state management"
```

---

## Task 12: API Route — /api/contact

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create the API route file**

Create `src/app/api/contact/route.ts` with:

```ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
  lang: "es" | "en";
}

export async function POST(req: NextRequest) {
  let body: ContactBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, message, lang } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const subject =
    lang === "en"
      ? `New inquiry from ${name} — Villa Real`
      : `Nueva consulta de ${name} — Villa Real`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b;">
      <h2 style="color: #0f4c35; margin-bottom: 24px;">
        ${lang === "en" ? "New Inquiry — Villa Real" : "Nueva Consulta — Proyecto Villa Real"}
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; width: 120px; color: #64748b;">
            ${lang === "en" ? "Name" : "Nombre"}:
          </td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b;">
            ${lang === "en" ? "Phone" : "Teléfono"}:
          </td>
          <td style="padding: 8px 0;">${phone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">
            ${lang === "en" ? "Message" : "Mensaje"}:
          </td>
          <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Idioma / Lang:</td>
          <td style="padding: 8px 0;">${lang.toUpperCase()}</td>
        </tr>
      </table>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
      <p style="color: #94a3b8; font-size: 12px;">
        Enviado desde terrenosenpanama.com
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Villa Real <noreply@terrenosenpanama.com>",
      to: "info@terrenosenpanama.com",
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

> **Important:** The `from` address (`noreply@terrenosenpanama.com`) requires the domain `terrenosenpanama.com` to be verified in Resend. Until then, use `onboarding@resend.dev` as the `from` address for local testing.

- [ ] **Step 2: For local testing, temporarily change the `from` field**

In `src/app/api/contact/route.ts`, change:
```ts
from: "Villa Real <noreply@terrenosenpanama.com>",
```
to:
```ts
from: "Villa Real <onboarding@resend.dev>",
```
This allows sending while the domain isn't yet verified. Revert when domain is set up in Resend.

- [ ] **Step 3: Restart dev server and test the form end-to-end**

```bash
npm run dev
```

Fill out the form and submit. With a real `RESEND_API_KEY` in `.env.local`, an email should arrive at `info@terrenosenpanama.com`. Without a real key the API will return 500 — check the terminal for the Resend error message.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add /api/contact route with Resend email sending"
```

---

## Task 13: Final check and production build

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
cd "C:/Users/Raul Lopez/Desktop/claude/terrenospanama2"
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 2: Manual checklist**

Open http://localhost:3000 (or `npm run start` for the production build) and verify:

- [ ] Nav sticks at top and becomes solid on scroll
- [ ] Hero fills the viewport with the green overlay and photo
- [ ] Badge → headline → subtitle → buttons animate in on page load
- [ ] Stats bar shows 4 columns
- [ ] Clicking "Conocer el Proyecto" scrolls to the Proyecto section
- [ ] Image grid in Proyecto loads 3 photos from Unsplash
- [ ] 6 infrastructure cards render in 3-col grid on desktop
- [ ] Hovering a card shows green top border and elevation
- [ ] Ubicación dark section shows 6 location items
- [ ] 4 investment reason cards render in 2-col grid
- [ ] FAQ accordion opens/closes smoothly, only one item open at a time
- [ ] Contact form validates required fields (browser-native)
- [ ] Switching ES ↔ EN toggles all visible text
- [ ] Mobile (375px): nav collapses to hamburger, sections stack vertically
- [ ] No prices appear anywhere
- [ ] No WhatsApp link appears anywhere
- [ ] Footer shows logo + email + copyright

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete landing page — terrenosenpanama.com Villa Real"
```

---

## Post-Launch: Setting Up Resend (when ready)

1. Create account at resend.com
2. Add domain `terrenosenpanama.com` → verify DNS records
3. Create API key → paste into `.env.local` as `RESEND_API_KEY`
4. Change `from` back to `noreply@terrenosenpanama.com`
5. Deploy to Vercel: `npx vercel` — add `RESEND_API_KEY` as environment variable in the Vercel dashboard
