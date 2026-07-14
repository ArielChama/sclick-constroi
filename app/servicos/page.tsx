"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import FacebookIcon from '../../public/icons/facebook-f.svg'
import FactoryIcon from '../../public/icons/factory.svg'
import InstagramIcon from '../../public/icons/instagram.svg'
import LinkedinIcon from '../../public/icons/linkedin-in.svg'
import LocationOnIcon from '/../../public/icons/location_on.svg'
import MailIcon from '../../public/icons/mail.svg'
import ManufacturingIcon from '../../public/icons/manufacturing.svg'
import PaintIcon from '../../public/icons/paint.svg'
import PhoneInTalkIcon from '../../public/icons/phone_in_talk.svg'
import ScheduleIcon from '../../public/icons/schedule.svg'
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

// Itens do menu suspenso "Serviços" — têm de corresponder aos ids usados nesta página
const serviceMenuItems = [
  { icon: FactoryIcon, label: "Construção civil", id: "construcao-civil" },
  { icon: SquareIcon, label: "Arquitetura e design", id: "arquitetura-design" },
  { icon: ManufacturingIcon, label: "Remodelações gerais", id: "remodelacoes" },
  { icon: WallIcon, label: "Levantamento de alvenarias", id: "alvenaria" },
  { icon: HandymanIcon, label: "Construção Lsf", id: "lsf" },
  { icon: PaintIcon, label: "Rebocos e pinturas", id: "reboco-estuque" },
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

// Lista de bullets reutilizável
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-black/80 space-y-1.5 list-none mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

// Card de subsecção de serviço
function ServiceCard({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 p-5 md:p-6 rounded-md bg-gray-100 hover:bg-white hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
      <h4 className="font-semibold text-base md:text-lg mb-2">{title}</h4>
      {children}
    </div>
  )
}

// ── PAGE ───────────────────────────────────────────────────

export default function ServicosPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  // Ao abrir a página com uma âncora (ex: /servicos#lsf), faz scroll suave até à secção certa
  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.replace("#", "")
    const timeout = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: "smooth" })
  }, [])

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
                    <span className="text-blue-700 transition-colors duration-200 cursor-pointer text-sm font-semibold">
                      {link.label}
                    </span>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200
                      ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                      <div className="bg-white rounded-lg shadow-2xl border border-gray-100 py-2 w-64">
                        {serviceMenuItems.map((item) => (
                          <button key={item.id} onClick={() => scrollToSection(item.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer">
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={link.id}>
                    <Link href={link.id === "portfolio" ? "/portfolio" : `/#${link.id}`}
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
                    className={`w-full flex items-center justify-between text-left py-3 px-4 rounded-lg text-blue-700 font-semibold
                      transition-all duration-200 cursor-pointer
                      ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                    {link.label}
                    <span className={`text-xs transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="flex flex-col pl-4">
                      {serviceMenuItems.map((item) => (
                        <button key={item.id}
                          onClick={() => { setMenuOpen(false); scrollToSection(item.id) }}
                          className="text-left py-2.5 px-4 text-sm text-gray-600 hover:text-blue-700 transition-colors duration-150 cursor-pointer">
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.id} href={link.id === "portfolio" ? "/portfolio" : `/#${link.id}`}
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
        <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-16 lg:px-[250px] bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <FadeSection className="max-w-2xl">
            <p className="text-blue-700 text-sm font-bold mb-3">Serviços</p>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-5">Os Nossos Serviços</h1>
            <p className="leading-7 text-sm md:text-base font-light">
              Na nossa empresa, colocamos a qualidade, a confiança e o rigor técnico em cada projeto que realizamos. Atuamos em obras públicas e particulares, oferecendo soluções completas na área da construção civil, remodelação e reabilitação, desde a fase de planeamento até à entrega final da obra. A nossa equipa é composta por profissionais experientes, comprometidos em transformar ideias em projetos sólidos, funcionais e duradouros.
            </p>
          </FadeSection>
        </section>

        <main className="px-6 md:px-16 lg:px-[250px]">

          {/* CONSTRUÇÃO CIVIL */}
          <section id="construcao-civil" className="scroll-mt-24 my-20 md:my-28">
            <FadeSection>
              <div className="w-10 h-10 bg-blue-600 rounded-md mb-4 flex items-center justify-center">
                <FactoryIcon width={20} height={20} color="white" />
              </div>
              <h2 className="text-2xl md:text-[30px] font-bold leading-tight mb-3">Construção Civil</h2>
              <p className="leading-7 text-sm md:text-base font-light max-w-2xl">
                Executamos projetos de construção civil de diferentes dimensões, assegurando elevados padrões de qualidade, segurança e eficiência em todas as fases da obra.
              </p>
            </FadeSection>

            <FadeSection delay={80} className="mt-6">
              <h3 className="font-bold text-lg mb-2">Construção de Casas</h3>
              <p className="leading-7 text-sm md:text-base font-light max-w-2xl">
                Construímos moradias e edifícios personalizados, adaptados às necessidades e ao estilo de vida de cada cliente. Desde as fundações até aos acabamentos finais, garantimos um acompanhamento rigoroso, utilizando materiais de qualidade e técnicas de construção modernas. Os nossos serviços incluem:
              </p>
            </FadeSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <FadeSection delay={100}>
                <ServiceCard id="alvenaria" title="Levantamento de Alvenaria">
                  <p className="text-sm text-black/80">
                    Executamos trabalhos de alvenaria para construção nova, remodelações e ampliações, garantindo estruturas sólidas e acabamentos de elevada qualidade. Realizamos:
                  </p>
                  <BulletList items={[
                    "Construção de paredes interiores e exteriores",
                    "Muros de vedação",
                    "Divisórias",
                    "Estruturas em tijolo e bloco",
                  ]} />
                  <p className="text-sm text-black/80 mt-3">
                    Cada trabalho é executado com rigor técnico, assegurando resistência, alinhamento e durabilidade.
                  </p>
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={150}>
                <ServiceCard id="reboco-estuque" title="Reboco e Estuque Projetado">
                  <p className="text-sm text-black/80">
                    Aplicamos sistemas de reboco e estuque projetado que garantem superfícies uniformes, resistentes e prontas para receber os acabamentos finais. Vantagens:
                  </p>
                  <BulletList items={[
                    "Maior rapidez de execução",
                    "Acabamento homogéneo",
                    "Excelente aderência",
                    "Elevada durabilidade",
                    "Melhor isolamento e proteção das paredes",
                  ]} />
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={200}>
                <ServiceCard id="microbetao" title="Microbetão Projetado">
                  <p className="text-sm text-black/80">
                    O microbetão projetado é uma solução moderna e versátil, ideal para revestimentos contínuos e contemporâneos. Aplicamos microbetão em:
                  </p>
                  <BulletList items={[
                    "Pavimentos",
                    "Paredes",
                    "Casas de banho",
                    "Espaços comerciais",
                    "Áreas interiores e exteriores",
                  ]} />
                  <p className="text-sm text-black/80 mt-3">
                    Este sistema destaca-se pela sua elevada resistência, impermeabilidade e estética minimalista.
                  </p>
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={250}>
                <ServiceCard id="ladrilhos" title="Aplicação de Ladrilhos">
                  <p className="text-sm text-black/80">
                    Executamos a aplicação de ladrilhos e revestimentos cerâmicos com precisão e atenção ao detalhe, garantindo acabamentos duradouros e de elevada qualidade. Aplicamos:
                  </p>
                  <BulletList items={[
                    "Azulejos",
                    "Cerâmicos",
                    "Grés porcelânico",
                    "Revestimentos decorativos",
                    "Pavimentos interiores e exteriores",
                  ]} />
                  <p className="text-sm text-black/80 mt-3">
                    Cada projeto é desenvolvido de acordo com as necessidades do cliente e as características do espaço.
                  </p>
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={300} className="md:col-span-2">
                <ServiceCard id="impermeabilizacao" title="Impermeabilização com Tela Asfáltica">
                  <p className="text-sm text-black/80">
                    Realizamos trabalhos de impermeabilização com tela asfáltica para proteger edifícios contra infiltrações e humidades, aumentando a durabilidade das estruturas. Aplicações:
                  </p>
                  <BulletList items={[
                    "Coberturas",
                    "Terraços",
                    "Varandas",
                    "Fundações",
                    "Garagens e zonas enterradas",
                  ]} />
                  <p className="text-sm text-black/80 mt-3">
                    Utilizamos materiais de elevada qualidade e técnicas adequadas para garantir uma proteção eficaz e duradoura.
                  </p>
                </ServiceCard>
              </FadeSection>
            </div>
          </section>

          {/* REMODELAÇÕES */}
          <section id="remodelacoes" className="scroll-mt-24 my-20 md:my-28">
            <FadeSection>
              <div className="w-10 h-10 bg-blue-600 rounded-md mb-4 flex items-center justify-center">
                <ManufacturingIcon width={20} height={20} color="white" />
              </div>
              <h2 className="text-2xl md:text-[30px] font-bold leading-tight mb-3">Remodelações</h2>
              <p className="leading-7 text-sm md:text-base font-light max-w-2xl">
                Damos uma nova vida aos espaços, tornando-os mais funcionais, modernos e confortáveis.
              </p>
            </FadeSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <FadeSection delay={100}>
                <ServiceCard title="Acabamentos de Qualidade">
                  <p className="text-sm text-black/80">
                    Os acabamentos são um dos elementos mais importantes de qualquer construção. Por isso, trabalhamos com materiais selecionados e mão de obra especializada para garantir um resultado de excelência. Realizamos:
                  </p>
                  <BulletList items={[
                    "Pinturas interiores e exteriores",
                    "Aplicação de revestimentos",
                    "Instalação de pavimentos",
                    "Soluções decorativas modernas",
                  ]} />
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={150}>
                <ServiceCard title="Remodelação de Interiores">
                  <p className="text-sm text-black/80">
                    Transformamos divisões antigas em ambientes modernos e adaptados às necessidades atuais. Realizamos:
                  </p>
                  <BulletList items={[
                    "Remodelação de cozinhas",
                    "Remodelação de casas de banho",
                    "Alteração de divisões",
                    "Renovação de pavimentos e revestimentos",
                    "Instalações elétricas e hidráulicas",
                  ]} />
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={200}>
                <ServiceCard title="Remodelação Exterior">
                  <p className="text-sm text-black/80">
                    Valorizamos o aspeto e a funcionalidade dos espaços exteriores. Os nossos serviços incluem:
                  </p>
                  <BulletList items={[
                    "Reabilitação de fachadas",
                    "Construção de muros",
                    "Pavimentação exterior",
                    "Pintura de exteriores",
                    "Criação de áreas de lazer",
                  ]} />
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={250}>
                <ServiceCard title="Renovação de Espaços">
                  <p className="text-sm text-black/80">
                    Seja uma habitação, um estabelecimento comercial ou um edifício de serviços, desenvolvemos soluções de renovação que aumentam o conforto, a eficiência e o valor do imóvel.
                  </p>
                </ServiceCard>
              </FadeSection>
            </div>
          </section>

          {/* CONSTRUÇÃO LSF */}
          <section id="lsf" className="scroll-mt-24 my-20 md:my-28">
            <FadeSection>
              <div className="w-10 h-10 bg-blue-600 rounded-md mb-4 flex items-center justify-center">
                <HandymanIcon width={20} height={20} color="white" />
              </div>
              <h2 className="text-2xl md:text-[30px] font-bold leading-tight mb-3">Construção em LSF (Light Steel Frame)</h2>
              <p className="leading-7 text-sm md:text-base font-light max-w-2xl">
                A construção em LSF representa uma solução moderna, eficiente e sustentável para diversos tipos de projetos.
              </p>
            </FadeSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <FadeSection delay={100}>
                <ServiceCard title="Construção Moderna">
                  <p className="text-sm text-black/80">
                    Utilizamos sistemas construtivos inovadores que permitem uma execução mais rápida, limpa e precisa.
                  </p>
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={150}>
                <ServiceCard title="Soluções Eficientes">
                  <p className="text-sm text-black/80">As estruturas em aço leve oferecem:</p>
                  <BulletList items={[
                    "Excelente isolamento térmico",
                    "Melhor eficiência energética",
                    "Redução dos tempos de construção",
                    "Menor desperdício de materiais",
                    "Maior sustentabilidade",
                  ]} />
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={200}>
                <ServiceCard title="Alta Resistência">
                  <p className="text-sm text-black/80">
                    O sistema LSF apresenta elevada resistência estrutural, durabilidade e excelente desempenho perante diferentes condições climatéricas e sísmicas. A nossa empresa acompanha todo o processo, desde o projeto até à execução final, garantindo uma construção segura e de elevada qualidade.
                  </p>
                </ServiceCard>
              </FadeSection>
            </div>
          </section>

          {/* ARQUITETURA E DESIGN */}
          <section id="arquitetura-design" className="scroll-mt-24 my-20 md:my-28">
            <FadeSection>
              <div className="w-10 h-10 bg-blue-600 rounded-md mb-4 flex items-center justify-center">
                <SquareIcon width={20} height={20} color="white" />
              </div>
              <h2 className="text-2xl md:text-[30px] font-bold leading-tight mb-3">Arquitetura e Design</h2>
              <p className="leading-7 text-sm md:text-base font-light max-w-2xl">
                Acreditamos que cada projeto deve refletir a personalidade e as necessidades de cada cliente. Por isso, disponibilizamos serviços de arquitetura e design que unem funcionalidade, estética e inovação. Agendamos uma reunião com o arquiteto, no nosso escritório ou no local da sua obra, e junto com ele encontre a solução mais adequada para o seu projeto.
              </p>
            </FadeSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <FadeSection delay={100}>
                <ServiceCard title="Design de Interiores">
                  <p className="text-sm text-black/80">
                    Criamos espaços harmoniosos, modernos e confortáveis, otimizando cada detalhe para proporcionar ambientes únicos.
                  </p>
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={150}>
                <ServiceCard title="Planeamento">
                  <p className="text-sm text-black/80">Estudamos cuidadosamente cada projeto para garantir:</p>
                  <BulletList items={[
                    "Melhor aproveitamento dos espaços",
                    "Soluções técnicas eficientes",
                    "Planeamento de custos e prazos",
                    "Integração entre funcionalidade e design",
                  ]} />
                </ServiceCard>
              </FadeSection>

              <FadeSection delay={200}>
                <ServiceCard title="Escolha de Materiais">
                  <p className="text-sm text-black/80">Aconselhamos os nossos clientes na seleção dos materiais mais adequados, tendo em consideração:</p>
                  <BulletList items={[
                    "Durabilidade",
                    "Estética",
                    "Eficiência energética",
                    "Relação qualidade-preço",
                  ]} />
                </ServiceCard>
              </FadeSection>
            </div>
          </section>

          {/* CTA */}
          <FadeSection className="my-20 md:my-28 flex flex-col items-center gap-6 pb-24 md:pb-32">
            <h2 className="max-w-3xl text-2xl md:text-[30px] font-bold leading-tight mb-2 text-center">
              Pronto para começar o seu <span className="text-blue-700">próximo projecto?</span>
            </h2>
            <p className="text-center max-w-xl text-sm md:text-base">
              Fale connosco e receba uma análise gratuita e sem compromisso para o seu projecto.
            </p>
            <Link href="/#contactos" className="bg-blue-700 text-white text-sm tracking-wider py-3 px-10 md:px-12 rounded uppercase font-semibold cursor-pointer
              hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-1
              active:scale-95 transition-all duration-300 inline-block">
              Pedir análise de projecto
            </Link>
          </FadeSection>
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