import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black h-full py-52 px-40">
      <main className="">
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="Sclick Constroi"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Website em construção
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Voltaremos muito em breve com um site incrível para mostrar nossos projetos e serviços de construção.
          </p>
        </div>
      </main>
    </div>
  );
}
