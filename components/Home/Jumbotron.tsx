import Image from "next/image";
import FEALogo from "@/public/assets/fea-light.png";
import bgJumbotron from "@/public/assets/bg-jumbotron.png";
import { Separator } from "../ui/separator";

export default function Jumbotron() {
  return (
    <section className="relative w-full flex flex-col items-start overflow-hidden px-6 py-20 md:px-19.5 lg:px-37.5 lg:py-26.75 transition-all duration-300" >
      <div className="p-6 z-20 absolute top-0 left-0">
        <Image src={FEALogo} alt="FEA Logo" className="h-12 w-12" />
      </div>
      <div className="relative z-10 flex flex-col h-full w-full">
        <div className="flex z-10 items-center gap-4 h-fit">
          <h1 className="text-[80px] md:text-[128px] font-extralight leading-none text-white tracking-tight">
            FEA
          </h1>
          <Separator orientation="vertical" className="bg-white/30" />
          <div className="flex flex-col justify-center h-full text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
            <p>is</p>
            <p className="bg-linear-to-r font-bold from-white to-white/16 inline-block text-transparent bg-clip-text">
              launching soon
            </p>
          </div>
        </div>
        <div className="flex items-center mt-2 max-w-md relative">
          <div className="size-73.75 rounded-full bg-radial from-white to-35% to-white/16 absolute -left-[32%] blur-2xl" />
          <div className="z-10 w-3 h-3 rounded-full bg-white" />
          <div className="z-10 flex-1 h-0.5 bg-white" />
        </div>
        <div className="flex z-10 flex-col gap-4">
          <div className="flex flex-wrap gap-3 mt-6">

            <span className="border text-white font-bold px-3 py-2 rounded-[40px]">
              Films & TV
            </span>
            <span className="border text-white font-bold px-3 py-2 rounded-[40px]">
              Music
            </span>
            <span className="border text-white font-bold px-3 py-2 rounded-[40px]">
              Games
            </span>
            <span className="border text-white font-bold px-3 py-2 rounded-[40px]">
              Live Events
            </span>
          </div>
          <div className=" text-4xl bg-linear-to-r from-white to-70% to-[#989898]/50 inline-block text-transparent bg-clip-text">
            <p>
              Start with community support.
            </p>
            <p>
              Scale with structured participation.
            </p>
          </div>
        </div>

        <div className="mt-10.5 max-w-md space-y-4">
          <p className="text-[#989898] leading-relaxed">
            <span className="font-bold text-white">Funkyland Entertainment Asset</span>{" "}
            A Curated Platform for entertainment projects built for longevity
            and success.
          </p>
          <p className="text-[#989898] leading-relaxed">
            Helping creators bring ambitious projects to life. Providing
            verified participants access to structured opportunities connected
            to high quality projects.
          </p>
        </div>
      </div>
      <Image
        src={bgJumbotron}
        alt=""
        fill
        className="object-cover"
        priority
      />
    </section >
  )
}
