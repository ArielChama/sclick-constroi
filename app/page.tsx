"use client"
import Image from "next/image"
import { useState } from "react"
import BalanceIcon from '../public/icons/balance.svg'
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

const services = [
  {
    icon: FactoryIcon,
    title: "Construção civil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore! Debitis qui impedit maxime et perspiciatis. Nihil, totam sed in iste exercitationem necessitatibus corrupti adipisci ipsa?",
  },
  {
    icon: SquareIcon,
    title: "Arquitetura e design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore! Debitis qui impedit maxime et perspiciatis. Nihil, totam sed in iste exercitationem necessitatibus corrupti adipisci ipsa?",
  },
  {
    icon: ManufacturingIcon,
    title: "Remodelações gerais",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore! Debitis qui impedit maxime et perspiciatis. Nihil, totam sed in iste exercitationem necessitatibus corrupti adipisci ipsa?",
  },
  {
    icon: WallIcon,
    title: "Levantamento de alvenarias",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore! Debitis qui impedit maxime et perspiciatis. Nihil, totam sed in iste exercitationem necessitatibus corrupti adipisci ipsa?",
  },
  {
    icon: HandymanIcon,
    title: "Construção Lsf",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore! Debitis qui impedit maxime et perspiciatis. Nihil, totam sed in iste exercitationem necessitatibus corrupti adipisci ipsa?",
  },
  {
    icon: PaintIcon,
    title: "Rebocos e pinturas",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore! Debitis qui impedit maxime et perspiciatis. Nihil, totam sed in iste exercitationem necessitatibus corrupti adipisci ipsa?",
  },
]


const slides = [
  {
    image: "/images/trabalho-1.jpeg",
    title: "Remodelação",
    description: "Remodelação de interiores para espaços modernos e funcionais",
  },
  {
    image: "/projects/project-2.jpg",
    title: "Remodelação Completa",
    description: "Transformação total de espaços residenciais",
  },
  {
    image: "/projects/project-3.jpg",
    title: "Edifício Comercial",
    description: "Projetos corporativos com design funcional",
  },
  {
    image: "/projects/project-4.jpg",
    title: "Construção LSF",
    description: "Estruturas leves, rápidas e duráveis",
  }
]

export default function Home() {
  const [current, setCurrent] = useState(0)

  const go = (index: number) => {
    if (index < 0 || index >= slides.length) return
    setCurrent(index)
  }

  const slide = slides[current]

  return (
    <div className="h-full">
      <section className="">
        <div className="relative z-10">
          <header>
            <nav className="flex justify-between items-center md:px-[250px]">
              <div>
                <Image
                  className=""
                  src="/logo.png"
                  alt="Sclick Constroi"
                  width={40}
                  height={20}
                  priority
                />
              </div>

              <div>
                <ol className="flex gap-6 items-center">
                  <li>Inicio</li>
                  <li>Sobre</li>
                  <li>Serviços</li>
                  <li>Depoimentos</li>
                  <li>Contactos</li>
                  <li>
                    <button className="border-2 border-blue-400 text-blue-400 py-2 px-6 rounded uppercase font-bold hover:bg-blue-400 hover:text-white transition-colors duration-300 cursor-pointer">
                      Pedir análise
                    </button>
                  </li>
                </ol>
              </div>
            </nav>
          </header>

          <div className="flex md:flex-row flex-col justify-between items-center gap-6 py-30 md:px-[250px]">
            <div>
              <h1 className="max-w-lg capitalize text-[40px] font-bold leading-12 mb-5">
                Criando força e estilo em cada construção
              </h1>
              <p className="max-w-md text-md leading-7 mb-10 font-light text-sm">
                Na SClick constroi, damos vida às suas visões com trabalho artesenal especializado, técnicas inovadoras e uma paixão por superar expectativas.
              </p>

              <button className="self-start bg-blue-700 text-white text-sm tracking-wider py-3 px-12 rounded uppercase font-medium cursor-pointer hover:bg-blue-900 transition-colors duration-300">
                Nossos serviços
              </button>
            </div>

            <div className="">
              <Image
                src="/images/side_right_banner.png"
                alt="Banner decorativo da lateral direita"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mt-25 md:px-[250px]">
        <div className="flex md:flex-row flex-col justify-between items-center gap-20">
          <div className="relative inline-block">
            <Image
              src="/images/about-us.jpeg"
              alt="Sclick Constroi"
              width={400}
              height={400}
              priority
              className="rounded-lg"
            />

            <div className="absolute -bottom-6 -right-6 bg-blue-700 p-4 rounded-lg w-48">
              <h3 className="text-white text-3xl font-bold">+30</h3>
              <p className="text-white text-sm font-semibold mb-2">Projectos concluídos</p>
              <p className="text-white text-xs mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quidem voluptates esse commodi. Amet tempore beatae deleniti quos
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 py-20">
            <p className="text-blue-700 text-sm font-bold">Sobre nós</p>
            <h1 className="max-w-md capitalize text-[30px] font-bold leading-10">
              Construa sua empresa ou casa dos sonhos connosco
            </h1>

            <p className="max-w-md text-md leading-7 text-black font-light text-sm">
              Na Sclick constroi, transformamos sonhos em realidade, construindo espaços que inspiram e perduram.
              Com uma equipe dedicada e uma paixão pela excelência, estamos comprometidos em entregar projetos de construção de
              alta qualidade que superam as expectativas dos nossos clientes.
            </p>

            <p className="max-w-md text-md leading-7 text-black font-light text-sm">
              Seja para residências, edifícios comerciais ou projetos personalizados,
              a Sclick constroi é a escolha confiável para transformar suas visões em estruturas sólidas e impressionantes.
            </p>

            <button className="self-start bg-blue-700 text-white text-sm tracking-wider py-3 px-12 rounded uppercase font-medium cursor-pointer">
              Conhecer nossos serviços
            </button>
          </div>
        </div>

        <div className="my-[150px]">
          <p className="text-blue-700 text-sm font-bold">Serviços</p>
          <h2 className="max-w-md capitalize text-[30px] font-bold leading-10 my-2">Conheça as nossas áreas de atuação</h2>
          <p className="max-w-md font-light text-sm">
            Na Sclick constroi, destacamo-nos por nossa dedicação à qualidade, inovação e satisfação do cliente.
          </p>

          <div className="flex flex-wrap my-8 gap-4 ">
            {services.map((service, index) => (
              <div className="w-[350px] p-3 rounded-md bg-gray-200" key={index}>
                <div className="w-10 h-10 bg-blue-600 rounded-md mb-4 flex items-center justify-center">
                  <service.icon width={20} height={20} color="white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-black/80">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="my-20 px-6 max-w-6xl mx-auto">
          <p className="text-blue-700 text-sm font-bold text-center">Porquê nos escolher</p>
          <h2 className="text-3xl font-bold text-center mt-2 mb-16">Conheça Os Nossos Diferenciais</h2>

          <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
            <div className="flex flex-col gap-12">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-end text-right flex-1">
                  <h3 className="font-bold text-lg">Cronograma Realista</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Levantamento completo antes de dar prazos, eliminando estimativas que atrasam.
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg w-16 h-16 flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-end text-right flex-1">
                  <h3 className="font-bold text-lg">Comunicação Transparente</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Levantamento completo antes de dar prazos, eliminando estimativas que atrasam.
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg w-16 h-16 flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/construct_build.png"
                alt="Construir"
                width={380}
                height={500}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-12">
              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-lg w-16 h-16 flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-lg">Equipe Dedicada</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Profissionais específicos do início ao fim, evitando perda de contexto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-lg w-16 h-16 flex items-center justify-center shrink-0">
                  {/* icon */}
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-lg">Orçamento Protegido</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Todos os custos mapeados no planeamento, eliminando os imprevistos no projecto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="my-[150px]">
          <div className="flex flex-col justify-center items-center">
            <p className="text-blue-700 text-sm font-bold text-center">Projectos</p>
            <h2 className="capitalize text-[30px] font-bold leading-10 mb-2 text-center">Projectos recentes</h2>
            <p className="max-w-md font-light text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod facere in non inventore!
            </p>

          </div>
          <div className="mt-8">
            <div className="w-full max-w-3xl mx-auto">
              {/* Container */}
              <div className="relative overflow-hidden rounded-2xl">
                {/* Track */}
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {slides.map((s, i) => (
                    <div
                      key={i}
                      className="relative min-w-full h-[420px] flex-shrink-0"
                      aria-hidden={i !== current}
                    >
                      {/* Imagem */}
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                        priority={i === 0}
                      />

                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Texto sobre a imagem */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-white text-2xl font-semibold mb-1">
                          {s.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão anterior */}
                <button
                  onClick={() => go(current - 1)}
                  aria-label="Slide anterior"
                  disabled={current === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-xl hover:bg-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ‹
                </button>

                {/* Botão próximo */}
                <button
                  onClick={() => go(current + 1)}
                  aria-label="Próximo slide"
                  disabled={current === slides.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center text-xl hover:bg-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ›
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Slides">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Ir para slide ${i + 1}`}
                    onClick={() => go(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-none ${i === current ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="my-[300px] justify-center items-center flex flex-col gap-6 pb-[200px]">
          <h2 className="capitalize max-w-3xl text-[30px] font-bold leading-10 mb-2 text-center">Pronto para transformar complexidade em tranquilidade, e valor em cada metro quadrado?</h2>
          <p className="text-center max-w-xl">
            Vamor criar um proecto que respeite a sua visão, seu investimento e o seu tempo - com técnica, estética e planejamento.
          </p>

          <button className="self-center bg-blue-700 text-white text-sm tracking-wider py-3 px-12 rounded uppercase font-semibold cursor-pointer">
            Quero agendar minha visita
          </button>
        </div>
      </main>

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-full w-[calc(100%-500px)] z-10">
          <section className="bg-[#262626] px-12 py-10 rounded-2xl shadow-2xl flex justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-blue-700 text-sm font-bold">Entre em contacto</p>
              <h2 className="text-white text-2xl font-semibold max-w-sm">
                Receba uma análise do seu projecto
              </h2>

              <div className="mt-4 flex flex-col gap-4">
                <input type="text" name="" placeholder="Como podemos te chamar?" className="bg-white py-3 px-6 rounded-md focus:outline-offset-2 focus:outline-blue-500" />
                <input type="text" name="" placeholder="Informe um número ou email para contacto" className="bg-white py-3 px-6 rounded-md focus:outline-offset-2 focus:outline-blue-500" />
                <input type="text" name="" placeholder="Qual o tipo de projecto?" className="bg-white py-3 px-6 rounded-md focus:outline-offset-2 focus:outline-blue-500" />

                <button className="bg-blue-700 text-white text-start text-sm tracking-wider py-3 px-6 rounded uppercase font-semibold cursor-pointer">
                  Pedir análise de projecto
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-3">
                <div className="bg-blue-800 p-2 rounded flex items-center justify-center">
                  <PhoneInTalkIcon width={25} height={25} color="white" />
                </div>

                <div>
                  <h5 className="text-white font-semibold">Número de telefone</h5>
                  <p className="text-sm text-white">(351) 123 456 789</p>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="bg-blue-800 p-2 rounded flex items-center justify-center">
                  <MailIcon width={25} height={25} color="white" />
                </div>

                <div>
                  <h5 className="text-white font-semibold">Email</h5>
                  <p className="text-sm text-white">geral@sclick.com.pt</p>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="bg-blue-800 p-2 rounded flex items-center justify-center">
                  <LocationOnIcon width={25} height={25} color="white" />
                </div>

                <div>
                  <h5 className="text-white font-semibold">Endereço</h5>
                  <p className="text-sm text-white">Av. da Liberdade, 123 - 1000-000 Lisboa</p>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="bg-blue-800 p-2 rounded flex items-center justify-center">
                  <ScheduleIcon width={25} height={25} color="white" />
                </div>

                <div>
                  <h5 className="text-white font-semibold">Horário de atendimento</h5>
                  <p className="text-sm text-white">Segunda a Sexta: 9h - 18h</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="bg-black/90 pt-[150px] pb-10 md:px-[250px]">
          <div>
            <div className="py-4 flex-row justify-center items-center gap-4 flex">
              <button className="bg-blue-700 p-2 rounded cursor-pointer">
                <FacebookIcon width={20} height={20} color="white" />
              </button>

              <button className="bg-blue-700 p-2 rounded cursor-pointer">
                <LinkedinIcon width={20} height={20} color="white" />
              </button>

              <button className="bg-blue-700 p-2 rounded cursor-pointer">
                <InstagramIcon width={20} height={20} color="white" />
              </button>
            </div>
          </div>
          <div className="border-t border-gray-600 py-6">
            <p className="text-white text-xs text-end">© 2026 SClick constroi. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
