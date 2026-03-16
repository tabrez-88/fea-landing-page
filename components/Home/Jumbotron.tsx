"use client";

import Image from "next/image";
import FEALogo from "@/public/assets/fea-light.png";
import bgJumbotron from "@/public/assets/bg-jumbotron.png";
import { Separator } from "../ui/separator";
import { motion } from "motion/react";

export default function Jumbotron() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full flex flex-col items-start overflow-hidden px-6 py-20 md:px-19.5 lg:px-37.5 lg:py-26.75 transition-all duration-300"
    >
      <motion.div
        className="p-6 z-20 absolute top-0 left-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image src={FEALogo} alt="FEA Logo" className="h-12 w-12" />
      </motion.div>
      <div className="relative z-10 flex flex-col h-full w-full">
        <motion.div
          className="flex z-10 items-center gap-4 h-fit"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-[80px] md:text-[128px] font-extralight leading-none text-white tracking-tight">
            FEA
          </h1>
          <Separator orientation="vertical" className="bg-white/30" />
          <p className="flex flex-col justify-center h-full text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
            <span>is</span>
            <span className="bg-linear-to-r font-bold from-white to-white/16 inline-block text-transparent bg-clip-text">
              launching soon
            </span>
          </p>
        </motion.div>
        <motion.div
          className="flex items-center mt-2 max-w-2xl relative"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ originX: 0 }}
        >
          <div className="size-73.75 rounded-full bg-radial from-white to-35% to-white/16 absolute -left-[20%] blur-2xl" />
          <div className="z-10 w-3 h-3 rounded-full bg-white" />
          <div className="z-10 flex-1 h-0.5 bg-linear-to-r from-white to-white/16" />
        </motion.div>
        <motion.div
          className="flex z-10 flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
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
            <span className="border text-white font-bold px-3 py-2 rounded-[40px]">
              Creator Projects
            </span>
          </div>
          <h2 className="text-4xl bg-linear-to-r from-white to-45% to-white/16 inline-block text-transparent bg-clip-text">
            <span className="block">Start with community support.</span>
            <span className="block">Scale with structured participation.</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10.5 max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-[#989898] leading-relaxed">
            <span className="font-bold text-white">
              Funkyland Entertainment Asset
            </span>{" "}
            A Curated Platform for entertainment projects built for longevity
            and success.
          </p>
          <p className="text-[#989898] leading-relaxed">
            Helping creators bring ambitious projects to life. Providing
            verified participants access to structured opportunities connected
            to high quality projects.
          </p>
        </motion.div>
      </div>
      <Image
        src={bgJumbotron}
        alt="FEA hero background"
        role="presentation"
        fill
        className="object-cover"
        priority
      />
    </section>
  );
}
