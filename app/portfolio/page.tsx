"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import FacebookIcon from '../../public/icons/facebook-f.svg'
import FactoryIcon from '../../public/icons/factory.svg'
import InstagramIcon from '../../public/icons/instagram.svg'
import LinkedinIcon from '../../public/icons/linkedin-in.svg'
import ManufacturingIcon from '../../public/icons/manufacturing.svg'
import PaintIcon from '../../public/icons/paint.svg'
import SquareIcon from '../../public/icons/square.svg'
import HandymanIcon from '../../public/icons/handyman.svg'
import WallIcon from '../../public/icons/power_input.svg'

const navLinks = [
  { label: "Inicio", id: "inicio" },
  { label: "Sobre", id: "sobre" },
  { label: "Serviços", id: "servicos" },
  { label: "Diferenciais", id: "diferenciais" },
  { label: "Portfólio", id: "portfolio" },
  { label: "Contactos", id: "contactos" },
]

const serviceMenuItems = [
  { icon: FactoryIcon, label: "Construção civil", id: "construcao-civil" },
  { icon: SquareIcon, label: "Arquitetura e design", id: "arquitetura-design" },
  { icon: ManufacturingIcon, label: "Remodelações gerais", id: "remodelacoes" },
  { icon: WallIcon, label: "Levantamento de alvenarias", id: "alvenaria" },
  { icon: HandymanIcon, label: "Construção Lsf", id: "lsf" },
  { icon: PaintIcon, label: "Rebocos e pinturas", id: "reboco-estuque" },
]

// Galeria de projetos — substitua/adicione imagens reais em /public/portfolio
const galleryItems = [
  { image: "/images/trabalho-1.jpeg", title: "Remodelação", category: "Remodelação" },
  { image: "/projects/project-2.jpg", title: "Remodelação Completa", category: "Remodelação" },
  { image: "/projects/project-3.jpg", title: "Edifício Comercial", category: "Construção civil" },
  { image: "/projects/project-4.jpg", title: "Construção LSF", category: "Construção LSF" },
  { image: "/images/about-us.jpeg", title: "Projeto Residencial", category: "Construção civil" },
  { image: "/images/construct_build.png", title: "Obra em Curso", category: "Construção civil" },
]

// ── HOOKS ──────────────────────────────────────────────────

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

function SkeletonImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />}
      <Image
        src={src} alt={alt} fill
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

// ── PAGE ───────────────────────────────────────────────────

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [filter, setFilter] = useState("Todos")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollToServiceOnServicesPage = useCallback((id: string) => {
    window.location.href = `/servicos#${id}`
  }, [])

  const categories = ["Todos", ...Array.from(new Set(galleryItems.map((g) => g.category)))]
  const filtered = filter === "Todos" ? galleryItems : galleryItems.filter((g) => g.category === filter)

  return (
    <>
      <div className="h-full overflow-x-hidden">
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"}`}>
          <nav className="flex justify-between items-center px-6 md:px-16 lg:px-[250px] py-4">

            <button onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer" aria-label="Abrir menu">
              <span className="w-6 h-0.5 bg-gray-800" />
              <span className="w-6 h-0.5 bg-gray-800" />
              <span className="w-4 h-0.5 bg-gray-800" />
            </button>

            <Link href="/">
              <Image src="/logo.png" alt="Sclick Constroi" width={40} height={20} priority />
            </Link>

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
                          <button key={item.id} onClick={() => scrollToServiceOnServicesPage(item.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer">
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : link.id === "portfolio" ? (
                  <li key={link.id}>
                    <span className="text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-semibold">
                      {link.label}
                    </span>
                  </li>
                ) : (
                  <li key={link.id}>
                    <Link href={`/#${link.id}`}
                      className="hover:text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                )
              ))}
              <li>
                <Link href="/#contactos" className="border-2 border-blue-400 text-blue-400 py-2 px-4 lg:px-6 rounded uppercase font-bold text-sm
                  hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200
                  active:scale-95 transition-all duration-300 cursor-pointer inline-block">
                  Pedir análise
                </Link>
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
                    </div>
                  </div>
                </div>
              ) : link.id === "portfolio" ? (
                <span key={link.id}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  className={`text-left py-3 px-4 rounded-lg text-blue-700 font-semibold
                    transition-all duration-200
                    ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                  {link.label}
                </span>
              ) : (
                <Link key={link.id} href={`/#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  className={`text-left py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700
                    transition-all duration-200 cursor-pointer
                    ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          <div className="px-6 py-6 border-t border-gray-100">
            <Link href="/#contactos" onClick={() => setMenuOpen(false)}
              className="w-full text-center border-2 border-blue-600 text-blue-600 py-3 px-6 rounded uppercase font-bold
                hover:bg-blue-600 hover:text-white active:scale-95 transition-all duration-300 cursor-pointer text-sm block">
              Pedir análise
            </Link>
          </div>
        </aside>

        {/* HERO */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-16 lg:px-[250px] bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <FadeSection className="max-w-2xl">
            <p className="text-blue-700 text-sm font-bold mb-3">Portfólio</p>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-5">O Nosso Portfólio</h1>
            <p className="leading-7 text-sm md:text-base font-light">
              Conheça alguns dos projetos que já desenvolvemos. Cada obra reflete o mesmo compromisso com a qualidade, o rigor técnico e a atenção ao detalhe que aplicamos em todos os trabalhos da SClick constroi.
            </p>
          </FadeSection>
        </section>

        <main className="px-6 md:px-16 lg:px-[250px]">

          {/* GALERIA — secção final da página */}
          <section id="galeria" className="my-16 md:my-20 pb-24 md:pb-32">
            <FadeSection className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`text-sm font-medium py-2 px-5 rounded-full border transition-all duration-200 cursor-pointer
                    ${filter === cat
                      ? "bg-blue-700 border-blue-700 text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700"}`}>
                  {cat}
                </button>
              ))}
            </FadeSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, i) => (
                <FadeSection key={i} delay={i * 80}>
                  <div className="group relative overflow-hidden rounded-lg h-64 shadow-md hover:shadow-xl transition-all duration-300">
                    <SkeletonImage src={item.image} alt={item.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white/70 text-xs uppercase tracking-wide mb-1">{item.category}</p>
                      <h3 className="text-white text-base font-semibold">{item.title}</h3>
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-black/90 pt-16 pb-10 px-6 md:px-16 lg:px-[250px]">
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
    </>
  )
}