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
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <main>

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-solid shadow-lg" : "bg-[#0f4c35]/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/25 bg-white/10 shrink-0">
              <Image
                src="/logo.png"
                alt="Proyecto Villa Real"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="hidden lg:flex flex-col leading-tight">
              <span className="text-white font-bold text-sm">Proyecto</span>
              <span className="text-[#00c07a] font-black text-sm">Villa Real</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-white/80">
            <a href="#proyecto"  className="hover:text-[#00c07a] transition-colors">{t.nav.project}</a>
            <a href="#ubicacion" className="hover:text-[#00c07a] transition-colors">{t.nav.location}</a>
            <a href="#faq"       className="hover:text-[#00c07a] transition-colors">{t.nav.faq}</a>
          </div>

          {/* Right: lang toggle + Contactar (desktop only) */}
          <div className="flex items-center gap-3">
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
            <a href="#contacto" className="hidden lg:inline-flex btn-primary text-sm py-2 px-5">
              {t.nav.contact}
            </a>
          </div>

        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-bg flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5 pt-20">
          <span className="animate-fade-up border border-[#00c07a]/50 bg-[#00c07a]/15 text-[#7fffc4] text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
            {t.hero.badge}
          </span>
          <h1 className="animate-fade-up-1 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            {t.hero.h1a}<br />{t.hero.h1b}
          </h1>
          <p className="animate-fade-up-2 text-white/80 text-lg max-w-xl leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="animate-fade-up-3 flex flex-wrap gap-3 justify-center mt-2">
            <a href="#contacto" className="btn-primary">{t.hero.cta1} →</a>
            <a href="#proyecto"  className="btn-secondary">{t.hero.cta2}</a>
          </div>
        </div>
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

      {/* ── EL PROYECTO ── */}
      <section id="proyecto" className="section-pad bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.project.tag}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 mb-5 leading-tight">
                {t.project.h2}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">{t.project.p}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm max-w-sm mx-auto lg:max-w-none lg:mx-0">
                {[
                  { label: lang === "es" ? "Tamaño" : "Size",  val: "1,000 m²" },
                  { label: lang === "es" ? "Uso" : "Use",      val: lang === "es" ? "Libre Construcción" : "Build Freely" },
                  { label: lang === "es" ? "Título" : "Title", val: lang === "es" ? "Propiedad Plena" : "Full Ownership" },
                  { label: lang === "es" ? "Pago" : "Payment", val: lang === "es" ? "Facilidades" : "Flexible Plans" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#f8fdfb] rounded-xl p-4 border border-[#e2f0eb] text-left">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{item.label}</div>
                    <div className="font-bold text-[#0f4c35] mt-1">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Images */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=75"
                  alt={t.project.img1alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden h-36 sm:h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=75"
                    alt={t.project.img2alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden h-36 sm:h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=75"
                    alt={t.project.img3alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFRAESTRUCTURA ── */}
      <section className="section-pad bg-[#f8fdfb]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.infra.tag}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 mb-3 leading-tight">{t.infra.h2}</h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-12">{t.infra.sub}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.infra.items.map((item) => (
              <div key={item.title} className="feature-card text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0f4c35] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                className="flex items-start gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-5 transition-colors"
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

      {/* ── POR QUÉ INVERTIR ── */}
      <section className="section-pad bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00c07a] text-xs font-bold tracking-widest uppercase">{t.invest.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f4c35] mt-3 leading-tight">{t.invest.h2}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.invest.items.map((item) => (
              <div key={item.title} className="invest-card text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0f4c35] mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                {formStatus === "sending" ? t.contact.sending : `${t.contact.submit} →`}
              </button>
              <p className="text-white/35 text-xs text-center">info@terrenosenpanama.com</p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#071f15] py-8 px-4 text-center">
        <div className="text-[#00c07a] font-black text-lg mb-2">
          terrenos<span className="text-white">enpanama.com</span>
        </div>
        <p className="text-white/35 text-xs">
          info@terrenosenpanama.com · © 2025 terrenosenpanama.com · {t.footer.rights}
        </p>
      </footer>

    </main>
  );
}
