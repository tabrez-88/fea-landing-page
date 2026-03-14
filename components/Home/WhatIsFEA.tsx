"use client";

import Image from 'next/image'
import AboutFEA from '@/public/assets/about-fea.png'
import { motion } from 'motion/react'

export default function WhatIsFEA() {
  return (
    <section className="flex flex-col md:flex-row gap-6 w-full px-6 pb-4 pt-20 md:py-20 md:px-19.5 lg:px-37.5 transition-all duration-300">
      <motion.div
        className="flex flex-1 flex-col gap-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-4">
          <span className="text-xl text-[#4D4D4D] font-bold uppercase">
            Platform
          </span>
          <h2 className="text-3xl md:text-[40px] font-light">
            What is <span className="font-bold">FEA</span>?
          </h2>
        </div>
        <p className="text-[#808080] leading-relaxed">
          FEA is building a modern platform where standout entertainment
          projects launch with stronger structure, aligned support, and
          long term vision.
        </p>
        <p className="text-[#808080] leading-relaxed">
          We connect high potential projects with the right supporters,
          partners, and opportunities at the moments that matter most.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-1 justify-center md:justify-end"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative w-full h-94">
          <Image
            src={AboutFEA}
            alt="FEA Platform Illustration"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </section>
  )
}
