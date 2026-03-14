"use client";

import Image from 'next/image'
import WorksFEA from '@/public/assets/works-fea.png'
import { motion } from 'motion/react'

export default function HowFEAWorks() {
  return (
    <section className="w-full bg-[#090909] text-white relative ">
      <div className="flex flex-col gap-12 w-full md:absolute mx-auto px-8 md:px-16 lg:px-37.5 pb-4 pt-20 md:py-20">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xl font-bold tracking-[0.2em] uppercase text-[#B2B2B2]">
            Structure
          </span>
          <h2 className="text-3xl md:text-[40px] font-light">
            How <span className="font-bold">FEA</span> Works
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="flex flex-col gap-12 border border-[#535353] rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-[#808080] font-normal">01</span>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Support Layer</h3>
              <p className="text-[#989898]">
                Back projects you believe in and unlock exclusive rewards,
                limited releases, and early access experiences
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-12 border border-[#535353] rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <span className="text-[#808080] font-normal">02</span>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Participation Layer</h3>
              <p className="text-[#989898]">
                For select projects, verified participants may access structured
                opportunities connected to project performance.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Image
        src={WorksFEA}
        alt="How FEA Works Illustration"
        className="object-contain w-full"
        width={1440}
        height={1118}
      />
    </section>
  )
}
