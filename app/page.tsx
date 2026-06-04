"use client"
import Image from "next/image"
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
import ForumIcon from '../public/icons/forum.svg'
import PointSaleIcon from '../public/icons/point_of_sale.svg'

const arquiteturaItems = [
  "Design de interiores para o seu projeto, dos acabamentos à decoração",
  "Acompanhamento personalizado em todas as fases do projeto",
  "Escolha de materiais, acabamentos e soluções adaptadas ao seu estilo e orçamento",
  "Planeamento detalhado desde o início, para que o orçamento seja sem surpresas",
  "Transparência, organização e comunicação constante",
]

const services = [
  { icon: FactoryIcon, title: "Construção civil", description: "Construímos com qualidade, segurança e eficiência. Desde o planeamento à execução, cuidamos de cada detalhe para entregar obras sólidas e duradouras.", list: null },
  { icon: SquareIcon, title: "Arquitetura e design", description: null, list: arquiteturaItems },
  { icon: ManufacturingIcon, title: "Remodelações gerais", description: "Remodelações completas e parciais de interiores e exteriores. Valorizamos e transformamos espaços, sempre com acabamentos de excelência.", list: null },
  { icon: WallIcon, title: "Levantamento de alvenarias", description: "Execução de alvenaria de tijolo com precisão e qualidade estrutural.", list: null },
  { icon: HandymanIcon, title: "Construção Lsf", description: "Soluções inovadoras, sustentáveis e eficientes. Construções mais rápidas, resistentes, de alta qualidade e com excelente desempenho térmico e acústico.", list: null },
  { icon: PaintIcon, title: "Rebocos e pinturas", description: "Aplicação de reboco tradicional com excelente acabamento e durabilidade.", list: null },
]

const slides = [
  { image: "/images/trabalho-1.jpeg", title: "Remodelação", description: "Remodelação de interiores para espaços modernos e funcionais" },
  { image: "/projects/project-2.jpg", title: "Remodelação Completa", description: "Transformação total de espaços residenciais" },
  { image: "/projects/project-3.jpg", title: "Edifício Comercial", description: "Projetos corporativos com design funcional" },
  { image: "/projects/project-4.jpg", title: "Construção LSF", description: "Estruturas leves, rápidas e duráveis" },
]

const navLinks = ["Inicio", "Sobre", "Serviços", "Depoimentos", "Contactos"]

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
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

// ── PAGE ───────────────────────────────────────────────────

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [paused, setPaused] = useState(false)
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

  // Slideshow automático
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
    return () => clearInterval(id)
  }, [paused])

  const go = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length)
  }, [])

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

            <Image src="/logo.png" alt="Sclick Constroi" width={40} height={20} priority />

            <ol className="hidden md:flex gap-4 lg:gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link} className="hover:text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium">{link}</li>
              ))}
              <li>
                <button className="border-2 border-blue-400 text-blue-400 py-2 px-4 lg:px-6 rounded uppercase font-bold text-sm
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
            <Image src="/logo.png" alt="Sclick Constroi" width={40} height={20} priority />
            <button onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-gray-600 text-xl leading-none">✕</span>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {navLinks.map((link, i) => (
              <button key={link} onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                className={`text-left py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700
                  transition-all duration-200 cursor-pointer
                  ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                {link}
              </button>
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

        <section className="relative overflow-hidden pt-20">
          <div ref={heroBg.ref} className="absolute inset-0 -z-10"
            style={{ transform: `translateY(${heroBg.offset}px)` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 py-16 md:py-24 lg:py-30 px-6 md:px-16 lg:px-[250px]">
            <FadeSection className="flex-1">
              <h1 className="max-w-lg capitalize text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-5">
                Criando força e estilo em cada construção
              </h1>
              <p className="max-w-md leading-7 mb-10 font-light text-sm">
                Na SClick constroi, damos vida às suas visões com trabalho artesenal especializado, técnicas inovadoras e uma paixão por superar expectativas.
              </p>
              <button className="bg-blue-700 text-white text-sm tracking-wider py-3 px-10 rounded uppercase font-bold cursor-pointer
                hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5
                active:scale-95 transition-all duration-300">
                Nossos serviços
              </button>
            </FadeSection>

            <FadeSection delay={150} className="flex-1 flex justify-center">
              <div ref={bannerParallax.ref} style={{ transform: `translateY(${bannerParallax.offset * -0.5}px)` }}>
                <SkeletonImage src="/images/side_right_banner.png" alt="Banner decorativo"
                  width={500} height={500} priority className="w-full max-w-xs md:max-w-sm lg:max-w-[500px] h-auto" />
              </div>
            </FadeSection>
          </div>
        </section>

        <main className="px-6 md:px-16 lg:px-[250px]">

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16 lg:gap-20 mt-20 md:mt-25">
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
              <h2 className="max-w-md capitalize text-2xl md:text-[30px] font-bold leading-tight">
                Construa sua empresa ou casa dos sonhos connosco
              </h2>
              <p className="max-w-md leading-7 text-black font-light text-sm">
                Na Sclick constroi, transformamos sonhos em realidade, construindo espaços que inspiram e perduram. Com uma equipe dedicada e uma paixão pela excelência, estamos comprometidos em entregar projetos de alta qualidade que superam as expectativas dos nossos clientes.
              </p>
              <p className="max-w-md leading-7 text-black font-light text-sm">
                Seja para residências, edifícios comerciais ou projetos personalizados, a Sclick constroi é a escolha confiável para transformar suas visões em estruturas sólidas e impressionantes.
              </p>
              <button className="self-start bg-blue-700 text-white text-sm tracking-wider py-3 px-10 rounded uppercase font-bold cursor-pointer
                hover:bg-blue-900 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                Conhecer nossos serviços
              </button>
            </FadeSection>
          </div>

          <div className="my-24 md:my-[150px]">
            <FadeSection>
              <p className="text-blue-700 text-sm font-bold">Serviços</p>
              <h2 className="max-w-md capitalize text-2xl md:text-[30px] font-bold leading-tight my-2">Conheça as nossas áreas de atuação</h2>
              <p className="max-w-md font-light text-sm">Na Sclick constroi, destacamo-nos por nossa dedicação à qualidade, inovação e satisfação do cliente.</p>
            </FadeSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
              {services.map((service, index) => (
                <FadeSection key={index} delay={index * 80}>
                  <div className="h-full p-4 rounded-md bg-gray-100
                    hover:bg-white hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1
                    transition-all duration-300 cursor-default group">
                    <div className="w-10 h-10 bg-blue-600 rounded-md mb-4 flex items-center justify-center
                      group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">
                      <service.icon width={20} height={20} color="white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>

                    {service.list ? (
                      <ul className="text-sm text-black/80 space-y-1 list-none">
                        {service.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-black/80">{service.description}</p>
                    )}
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>

          <section className="my-24 md:my-[200px]">
            <FadeSection>
              <p className="text-blue-700 text-sm font-bold text-center">Porquê nos escolher</p>
              <h2 className="text-2xl md:text-3xl font-bold text-center mt-2 mb-12 md:mb-16">Conheça Os Nossos Diferenciais</h2>
            </FadeSection>

            {/* Desktop: 3 colunas */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
              <div className="flex flex-col gap-12">
                {[
                  { icon: CalendarIcon, title: "Cronograma Realista", desc: "Levantamento completo antes de dar prazos, eliminando estimativas que atrasam." },
                  { icon: ForumIcon, title: "Comunicação Transparente", desc: "Relatórios periódicos e canal directo com o responsável de obra." },
                ].map((item, i) => (
                  <FadeSection key={item.title} delay={i * 100}>
                    <div className="flex items-start gap-4 group">
                      <div className="flex flex-col items-end text-right flex-1">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                      {/* Mudamos o texto inicial para azul escuro (text-blue-600) e no hover para branco (group-hover:text-white) */}
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
                  { icon: PeopleIcon, title: "Equipe Dedicada", desc: "Profissionais específicos do início ao fim, evitando perda de contexto." },
                  { icon: PointSaleIcon, title: "Orçamento Protegido", desc: "Todos os custos mapeados no planeamento, eliminando os imprevistos no projecto." },
                ].map((item, i) => (
                  <FadeSection key={item.title} delay={i * 100}>
                    <div className="flex items-start gap-4 group">
                      {/* Aplicamos a mesma lógica de inversão de cores aqui */}
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
                { title: "Cronograma Realista", desc: "Levantamento completo antes de dar prazos, eliminando estimativas que atrasam." },
                { title: "Comunicação Transparente", desc: "Relatórios periódicos e canal directo com o responsável de obra." },
                { title: "Equipe Dedicada", desc: "Profissionais específicos do início ao fim, evitando perda de contexto." },
                { title: "Orçamento Protegido", desc: "Todos os custos mapeados no planeamento, eliminando os imprevistos no projecto." },
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
          </section>

          <div className="my-24 md:my-[150px]">
            <FadeSection className="flex flex-col items-center">
              <p className="text-blue-700 text-sm font-bold text-center">Projectos</p>
              <h2 className="capitalize text-2xl md:text-[30px] font-bold leading-tight mb-2 text-center">Projectos recentes</h2>
              <p className="max-w-md font-light text-sm text-center">Conheça alguns dos nossos trabalhos mais recentes e inspire-se para o seu projecto.</p>
            </FadeSection>

            <FadeSection delay={100} className="mt-8">
              <div className="w-full max-w-3xl mx-auto"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `translateX(-${current * 100}%)` }}>
                    {slides.map((s, i) => (
                      <div key={i} className="relative min-w-full h-64 sm:h-80 md:h-[420px] flex-shrink-0" aria-hidden={i !== current}>
                        <SkeletonImage src={s.image} alt={s.title} fill priority={i === 0} className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">{s.title}</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{s.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => go(current - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-xl
                      hover:bg-white/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">‹</button>
                  <button onClick={() => go(current + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-xl
                      hover:bg-white/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">›</button>

                  {!paused && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
                      style={{ animation: "progress 4s linear infinite", width: "100%" }} />
                  )}
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => go(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-none
                        ${i === current ? "w-6 bg-blue-600" : "w-2 bg-gray-300 hover:bg-gray-400"}`} />
                  ))}
                </div>
              </div>
            </FadeSection>
          </div>

          <FadeSection className="my-24 md:my-[200px] flex flex-col items-center gap-6 pb-32 md:pb-[200px]">
            <h2 className="capitalize max-w-3xl text-2xl md:text-[30px] font-bold leading-tight mb-2 text-center">
              Pronto para transformar complexidade em tranquilidade, <span className="text-blue-700">e valor em cada metro quadrado?</span>
            </h2>
            <p className="text-center max-w-xl text-sm md:text-base">
              Vamos criar um projecto que respeite a sua visão, seu investimento e o seu tempo — com técnica, estética e planeamento.
            </p>
            <button className="bg-blue-700 text-white text-sm tracking-wider py-3 px-10 md:px-12 rounded uppercase font-semibold cursor-pointer
              hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-1
              active:scale-95 transition-all duration-300">
              Quero agendar minha visita
            </button>
          </FadeSection>
        </main>

        <div className="relative">
          <div className="px-6 md:px-16 lg:px-0 relative z-10 flex justify-center" style={{ marginBottom: "-1px" }}>
            <FadeSection className="w-full max-w-5xl -mb-16 md:-mb-24">
              <section className="bg-[#262626] px-6 md:px-12 py-8 md:py-10 rounded-2xl shadow-2xl
                flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2 w-full md:max-w-sm">
                  <p className="text-blue-700 text-sm font-bold">Entre em contacto</p>
                  <h2 className="text-white text-xl md:text-2xl font-semibold">Receba uma análise do seu projecto</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    <input type="text" placeholder="Como podemos te chamar?"
                      className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200" />
                    <input type="text" placeholder="Número ou email para contacto"
                      className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200" />
                    <input type="text" placeholder="Qual o tipo de projecto?"
                      className="bg-white py-3 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.01] transition-transform duration-200" />
                    <button className="bg-blue-700 text-white text-sm tracking-wider py-3 px-6 rounded uppercase font-semibold cursor-pointer
                      hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                      Pedir análise de projecto
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-5 w-full md:w-auto">
                  {[
                    { icon: PhoneInTalkIcon, title: "Número de telefone", value: "(351) 123 456 789" },
                    { icon: MailIcon, title: "Email", value: "geral@sclick.com.pt" },
                    { icon: LocationOnIcon, title: "Endereço", value: "Av. da Liberdade, 123 - 1000-000 Lisboa" },
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
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </>
  )
}