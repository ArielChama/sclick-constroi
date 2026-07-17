"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import FacebookIcon from '../public/icons/facebook-f.svg'
import FactoryIcon from '../public/icons/factory.svg'
import InstagramIcon from '../public/icons/instagram.svg'
import LinkedinIcon from '../public/icons/linkedin-in.svg'
import LocationOnIcon from '../public/icons/location_on.svg'
import MailIcon from '../public/icons/mail.svg'
import ManufacturingIcon from '../public/icons/manufacturing.svg'
import PaintIcon from '../public/icons/paint.svg'
import PhoneInTalkIcon from '../public/icons/phone_in_talk.svg'
import ScheduleIcon from '../public/icons/schedule.svg'
import SquareIcon from '../public/icons/square.svg'
import HandymanIcon from '../public/icons/handyman.svg'
import WallIcon from '../public/icons/power_input.svg'
import CalendarIcon from '../public/icons/calendar_month_24dp.svg'
import PeopleIcon from '../public/icons/groups.svg'

const arquiteturaItems = [
  "Design de interiores para o seu projeto, dos acabamentos à decoração",
  "Acompanhamento personalizado em todas as fases do projeto",
  "Escolha de materiais, acabamentos e soluções adaptadas ao seu estilo e orçamento",
  "Planeamento detalhado desde o início, para que o orçamento seja sem surpresas",
  "Transparência, organização e comunicação constante",
]

const services = [
  { icon: FactoryIcon, title: "Construção civil", id: "construcao-civil", description: "Construímos com qualidade, segurança e eficiência. Desde o planeamento à execução, cuidamos de cada detalhe para entregar obras sólidas e duradouras.", list: null },
  { icon: SquareIcon, title: "Arquitetura e design", id: "arquitetura-design", description: null, list: arquiteturaItems },
  { icon: ManufacturingIcon, title: "Remodelações gerais", id: "remodelacoes", description: "Remodelações completas e parciais de interiores e exteriores. Valorizamos e transformamos espaços, sempre com acabamentos de excelência.", list: null },
  { icon: WallIcon, title: "Levantamento de alvenarias", id: "alvenaria", description: "Execução de alvenaria de tijolo com precisão e qualidade estrutural.", list: null },
  { icon: HandymanIcon, title: "Construção Lsf", id: "lsf", description: "Soluções inovadoras, sustentáveis e eficientes. Construções mais rápidas, resistentes, de alta qualidade e com excelente desempenho térmico e acústico.", list: null },
  { icon: PaintIcon, title: "Rebocos e pinturas", id: "reboco-estuque", description: "Aplicação de reboco tradicional com excelente acabamento e durabilidade.", list: null },
]

// Itens do menu suspenso "Serviços" — apontam para as âncoras da página /servicos
const serviceMenuItems = services.map((s) => ({ label: s.title, id: s.id }))

const navLinks = [
  { label: "Inicio", id: "inicio" },
  { label: "Sobre", id: "sobre" },
  { label: "Serviços", id: "servicos" },
  { label: "Diferenciais", id: "diferenciais" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contactos", id: "contactos" },
]

// ── HOOKS ──────────────────────────────────────────────────

function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const onScroll = () => {
        const rect = el.getBoundingClientRect()
        setOffset((rect.top + rect.height / 2 - window.innerHeight / 2) * speed)
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener("scroll", onScroll)
    }, { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [speed])
  return { ref, offset }
}

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, started])
  return { ref, count }
}

// ── COMPONENTES ────────────────────────────────────────────

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  )
}

function SkeletonImage({ src, alt, width, height, className, fill, priority }: {
  src: string; alt: string; width?: number; height?: number;
  className?: string; fill?: boolean; priority?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse rounded-lg ${className}`} />
      )}
      <Image
        src={src} alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        style={fill ? undefined : { width: "100%", height: "auto" }}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

// ── PAGE ───────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [project_type, setProjectType] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const heroBg = useParallax(0.3)
  const bannerParallax = useParallax(0.25)
  const { ref: counterRef, count } = useCounter(30)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])


  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerOffset = 80 // altura aproximada do header fixo
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: "smooth" })
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim() || !contact.trim()) {
      alert("Por favor preenche pelo menos o nome e o contacto.");
      return;
    }

    setSubmitting(true);

    const data = {
      name,
      contact,
      project_type,
      message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => null);

      if (res.ok) {
        alert("Mensagem enviada com sucesso!");
        setName("");
        setContact("");
        setProjectType("");
        setMessage("");
      } else {
        alert(result?.error || "Erro ao enviar. Tenta novamente ou contacta-nos por telefone.");
      }
    } catch (err) {
      alert("Erro de ligação ao enviar. Tenta novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="h-full overflow-x-hidden">
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
          <nav className="flex justify-between items-center px-6 md:px-16 lg:px-[250px] py-4">

            <button onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer" aria-label="Abrir menu">
              <span className="w-6 h-0.5 bg-gray-800" />
              <span className="w-6 h-0.5 bg-gray-800" />
              <span className="w-4 h-0.5 bg-gray-800" />
            </button>

            <Image src="/logo.png" alt="Sclick Constroi" width={40} height={20} priority style={{ height: "20px", width: "auto" }} />

            <ol className="hidden md:flex gap-4 lg:gap-6 items-center">
              {navLinks.map((link) => (
                link.id === "servicos" ? (
                  <li key={link.id} className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}>
                    <Link href="/servicos"
                      className="hover:text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium">
                      {link.label}
                    </Link>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200
                      ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                      <div className="bg-white rounded-lg shadow-2xl border border-gray-100 py-2 w-64">
                        {serviceMenuItems.map((item) => (
                          <Link key={item.id} href={`/servicos#${item.id}`}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150">
                            {item.label}
                          </Link>
                        ))}
                        <div className="my-1 border-t border-gray-100" />
                        <Link href="/servicos"
                          className="block px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors duration-150">
                          Ver todos os serviços
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : link.id === "portfolio" ? (
                  <li key={link.id}>
                    <Link href="/portfolio"
                      className="hover:text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium">
                    {link.label}
                  </li>
                )
              ))}
              <li>
                <button onClick={() => scrollToSection("contactos")}
                  className="border-2 border-blue-400 text-blue-400 py-2 px-4 lg:px-6 rounded uppercase font-bold text-sm
                  hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200
                  active:scale-95 transition-all duration-300 cursor-pointer">
                  Pedir análise
                </button>
              </li>
            </ol>
          </nav>
        </header>

        <div onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden
            ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

        <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
            <Image src="/logo.png" alt="Sclick Constroi" width={40} height={20} priority style={{ height: "20px", width: "auto" }} />
            <button onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-gray-600 text-xl leading-none">✕</span>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {navLinks.map((link, i) => (
              link.id === "servicos" ? (
                <div key={link.id}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                    className={`w-full flex items-center justify-between text-left py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700
                      transition-all duration-200 cursor-pointer
                      ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                    {link.label}
                    <span className={`text-xs transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="flex flex-col pl-4">
                      {serviceMenuItems.map((item) => (
                        <Link key={item.id} href={`/servicos#${item.id}`}
                          onClick={() => setMenuOpen(false)}
                          className="py-2.5 px-4 text-sm text-gray-600 hover:text-blue-700 transition-colors duration-150">
                          {item.label}
                        </Link>
                      ))}
                      <Link href="/servicos" onClick={() => setMenuOpen(false)}
                        className="py-2.5 px-4 text-sm font-semibold text-blue-700">
                        Ver todos os serviços
                      </Link>
                    </div>
                  </div>
                </div>
              ) : link.id === "portfolio" ? (
                <Link key={link.id} href="/portfolio"
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  className={`text-left py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700
        transition-all duration-200 cursor-pointer
        ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                  {link.label}
                </Link>
              ) : (
                <button key={link.id}
                  onClick={() => { setMenuOpen(false); scrollToSection(link.id) }}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  className={`text-left py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700
        transition-all duration-200 cursor-pointer
        ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                  {link.label}
                </button>
              )
            ))}
          </nav>
          <div className="px-6 py-6 border-t border-gray-100">
            <button onClick={() => setMenuOpen(false)}
              className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded uppercase font-bold
                hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-300 cursor-pointer text-sm">
              Pedir análise
            </button>
          </div>
        </aside>

        <section id="inicio" className="relative overflow-hidden pt-20">
          <div ref={heroBg.ref} className="absolute inset-0 -z-10"
            style={{ transform: `translateY(${heroBg.offset}px)` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 py-16 md:py-24 lg:py-30 px-6 md:px-16 lg:px-[250px]">
            <FadeSection className="flex-1">
              <h1 className="max-w-lg  text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-5">
                Construindo o futuro com sucesso
              </h1>
              <p className="max-w-md leading-7 mb-10 font-light text-sm">
                Na SClick constroi, damos vida às suas visões com trabalho artesenal especializado, técnicas inovadoras e uma paixão por superar expectativas.
              </p>
              <Link href="/servicos" className="inline-block bg-blue-700 text-white text-sm tracking-wider py-3 px-10 rounded uppercase font-bold cursor-pointer
                hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5
                active:scale-95 transition-all duration-300">
                Nossos serviços
              </Link>
            </FadeSection>

            <FadeSection delay={150} className="flex-1 flex justify-center">
              <div ref={bannerParallax.ref} style={{ transform: `translateY(${bannerParallax.offset * -0.5}px)` }}>
                <div className="animate-float">
                  <SkeletonImage src="/images/side_right_banner.png" alt="Banner decorativo"
                    width={500} height={500} priority className="w-full max-w-xs md:max-w-sm lg:max-w-[500px] h-auto" />
                </div>
              </div>
            </FadeSection>
          </div>
        </section>

        <main className="px-6 md:px-16 lg:px-[250px]">

          <div id="sobre" className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16 lg:gap-20 mt-20 md:mt-25">
            <FadeSection className="w-full md:w-auto">
              <div className="relative inline-block group">
                <div className="w-full max-w-[400px] rounded-lg overflow-hidden">
                  <SkeletonImage
                    src="/images/about-us.jpeg"
                    alt="Sclick Constroi"
                    width={400}
                    height={400}
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div ref={counterRef}
                  className="absolute -bottom-6 -right-4 md:-right-6 bg-blue-700 p-4 rounded-lg w-44 md:w-48
                    shadow-xl hover:bg-blue-800 transition-colors duration-300">
                  <h3 className="text-white text-3xl font-bold">+{count}</h3>
                  <p className="text-white text-sm font-semibold mb-2">Projectos concluídos</p>
                  <p className="text-white text-xs mb-6">Entregues com qualidade, dentro do prazo e do orçamento.</p>
                </div>
              </div>
            </FadeSection>

            <FadeSection delay={100} className="flex flex-col gap-6 py-10 md:py-16 lg:py-20 w-full md:flex-1">
              <p className="text-blue-700 text-sm font-bold">Sobre nós</p>
              <h2 className="max-w-md  text-2xl md:text-[30px] font-bold leading-tight">
                Construa sua empresa ou casa dos sonhos connosco
              </h2>
              <p className="max-w-md leading-7 text-black font-light text-sm">
                Na Sclick constroi, transformamos sonhos em realidade, construindo espaços que inspiram e perduram. Com uma equipe dedicada e uma paixão pela excelência, estamos comprometidos em entregar projetos de alta qualidade que superam as expectativas dos nossos clientes.
              </p>
              <p className="max-w-md leading-7 text-black font-light text-sm">
                Seja para residências, edifícios comerciais ou projetos personalizados, a Sclick constroi é a escolha confiável para transformar suas visões em estruturas sólidas e impressionantes.
              </p>
              <Link href="/servicos" className="self-start inline-block bg-blue-700 text-white text-sm tracking-wider py-3 px-10 rounded uppercase font-bold cursor-pointer
                hover:bg-blue-900 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                Conhecer nossos serviços
              </Link>
            </FadeSection>
          </div>

          <section id="diferenciais" className="my-24 md:my-[200px]">
            <FadeSection>
              <p className="text-blue-700 text-sm font-bold text-center">Porquê nos escolher</p>
              <h2 className="text-2xl md:text-3xl font-bold text-center mt-2 mb-12 md:mb-16">Porque Escolher a Nossa Empresa?</h2>
            </FadeSection>

            {/* Desktop: 3 colunas */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
              <div className="flex flex-col gap-12">
                {[
                  { icon: FactoryIcon, title: "Experiência em Obras Públicas e Particulares", desc: "Anos de experiência ao serviço de clientes públicos e privados." },
                  { icon: PeopleIcon, title: "Equipa Qualificada e Especializada", desc: "Profissionais experientes, comprometidos com cada projeto." },
                  { icon: ManufacturingIcon, title: "Materiais de Elevada Qualidade", desc: "Selecionamos materiais que garantem durabilidade e bom acabamento." },
                ].map((item, i) => (
                  <FadeSection key={item.title} delay={i * 100}>
                    <div className="flex items-start gap-4 group">
                      <div className="flex flex-col items-end text-right flex-1">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-600 p-4 rounded-lg w-16 h-16 flex items-center justify-center shrink-0
        group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <item.icon width={25} height={25} className="fill-current" />
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>

              <FadeSection>
                <SkeletonImage src="/images/construct_build.png" alt="Construir"
                  width={380} height={500} className="object-contain" />
              </FadeSection>

              <div className="flex flex-col gap-12">
                {[
                  { icon: SquareIcon, title: "Soluções Personalizadas", desc: "Cada projeto é pensado à medida das necessidades do cliente." },
                  { icon: CalendarIcon, title: "Rigor e Profissionalismo", desc: "Acompanhamento em todas as fases da obra, do início ao fim." },
                ].map((item, i) => (
                  <FadeSection key={item.title} delay={i * 100}>
                    <div className="flex items-start gap-4 group">
                      <div className="bg-blue-100 text-blue-600 p-4 rounded-lg w-16 h-16 flex items-center justify-center shrink-0
        group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <item.icon width={25} height={25} className="fill-current" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
            </div>

            <div className="md:hidden flex flex-col gap-8">
              <FadeSection className="flex justify-center">
                <SkeletonImage src="/images/construct_build.png" alt="Construir"
                  width={280} height={360} className="object-contain" />
              </FadeSection>
              {[
                { title: "Experiência em Obras Públicas e Particulares", desc: "Anos de experiência ao serviço de clientes públicos e privados." },
                { title: "Equipa Qualificada e Especializada", desc: "Profissionais experientes, comprometidos com cada projeto." },
                { title: "Materiais de Elevada Qualidade", desc: "Selecionamos materiais que garantem durabilidade e bom acabamento." },
                { title: "Soluções Personalizadas", desc: "Cada projeto é pensado à medida das necessidades do cliente." },
                { title: "Rigor e Profissionalismo", desc: "Acompanhamento em todas as fases da obra, do início ao fim." },
              ].map((item, i) => (
                <FadeSection key={item.title} delay={i * 80}>
                  <div className="flex items-start gap-4 group">
                    <div className="bg-blue-100 p-4 rounded-lg w-14 h-14 flex items-center justify-center shrink-0
                      group-hover:bg-blue-600 transition-all duration-300" />
                    <div>
                      <h3 className="font-bold text-base">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>

            <FadeSection className="mt-12">
              <p className="text-center text-sm md:text-base font-semibold text-blue-700">
                Construímos com qualidade, remodelamos com dedicação e transformamos projetos em realidade.
              </p>
            </FadeSection>
          </section>

          <FadeSection className="my-24 md:my-[200px] flex flex-col items-center gap-6 pb-32 md:pb-[200px]">
            <h2 className="max-w-3xl text-2xl md:text-[30px] font-bold leading-tight mb-2 text-center">
              Pronto para transformar complexidade em tranquilidade, <span className="text-blue-700">e valor em cada metro quadrado?</span>
            </h2>
            <p className="text-center max-w-xl text-sm md:text-base">
              Vamos criar um projecto que respeite a sua visão, seu investimento e o seu tempo — com técnica, estética e planeamento.
            </p>
            <button onClick={() => scrollToSection("contactos")} className="bg-blue-700 text-white text-sm tracking-wider py-3 px-10 md:px-12 rounded uppercase font-semibold cursor-pointer
              hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-1
              active:scale-95 transition-all duration-300">
              Quero agendar minha visita
            </button>
          </FadeSection>
        </main>

        <div className="relative">
          <div className="px-6 md:px-16 lg:px-0 relative z-10 flex justify-center" style={{ marginBottom: "-1px" }}>
            <FadeSection className="w-full max-w-5xl -mb-16 md:-mb-24">
              <section id="contactos" className="bg-[#262626] px-6 md:px-12 py-8 md:py-10 rounded-2xl shadow-2xl
                flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2 w-full md:max-w-sm">
                  <p className="text-blue-700 text-sm font-bold">Entre em contacto</p>
                  <h2 className="text-white text-xl md:text-2xl font-semibold">Receba uma análise do seu projecto</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-4 flex flex-col gap-4">
                      <input type="text" name="name" placeholder="Nome:" required
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200" />
                      <input type="text" name="contact" placeholder="Número ou email:" required
                        value={contact} onChange={(e) => setContact(e.target.value)}
                        className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200" />
                      <input type="text" name="project-type" placeholder="Qual o tipo de projecto?"
                        value={project_type} onChange={(e) => setProjectType(e.target.value)}
                        className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200" />
                      <textarea name="message" placeholder="Descrição adicional:"
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200 resize-none h-24" />
                      <button type="submit" disabled={submitting}
                        className="bg-blue-700 text-white text-sm tracking-wider py-3 px-6 rounded uppercase font-semibold cursor-pointer
                      hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300
                      disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                        {submitting ? "A enviar..." : "Pedir orçamento"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="flex flex-col gap-5 w-full md:w-auto">
                  {[
                    { icon: PhoneInTalkIcon, title: "Número de telefone", value: "(351) 931 787 768" },
                    { icon: MailIcon, title: "Email", value: "geral@sclickconstroi.pt" },
                    { icon: LocationOnIcon, title: "Endereço", value: "Praceta Timor Lorosae, Lote 22B, R/C DTO" },
                    { icon: ScheduleIcon, title: "Horário de atendimento", value: "Segunda a Sexta: 9h - 18h" },
                  ].map((item) => (
                    <div key={item.title} className="flex flex-row gap-3 group">
                      <div className="bg-blue-800 p-2 rounded flex items-center justify-center shrink-0
                        group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                        <item.icon width={25} height={25} color="white" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">{item.title}</h5>
                        <p className="text-sm text-white/80">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeSection>
          </div>

          <footer className="bg-black/90 pt-32 md:pt-40 pb-10 px-6 md:px-16 lg:px-[250px]">
            <div className="py-4 flex justify-center gap-4">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: LinkedinIcon, label: "LinkedIn" },
                { icon: InstagramIcon, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} aria-label={label}
                  className="bg-blue-700 p-2 rounded cursor-pointer
                    hover:bg-blue-500 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40
                    active:scale-95 transition-all duration-300">
                  <Icon width={20} height={20} color="white" />
                </button>
              ))}
            </div>
            <div className="border-t border-gray-600 py-6">
              <p className="text-white text-xs text-center md:text-end">© 2026 SClick constroi. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      </div >

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}