"use client";

import { CircleAlert } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'

export default function ExampleOpportunities() {
  return (
    <section className="flex flex-col gap-6 md:gap-12 w-full px-6 py-20 md:px-19.5 lg:px-37.5 transition-all duration-300" >
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xl font-bold uppercase tracking-[0.2em] text-[#4D4D4D]">
          Opportunities
        </span>
        <h2 className="text-3xl md:text-[40px] font-light">
          Example <span className="font-bold">Opportunities</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className='flex flex-col gap-6'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-bold text-xl">Support Layer</h3>
          <ul className="flex flex-col">
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Independent films and premium short form series
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Emerging artist releases and passion driven music projects
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Creator led content and original storytelling
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Early stage game concepts and interactive experiences
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Community driven live events
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Experimental and culturally driven creative work
            </li>
          </ul>
        </motion.div>
        <motion.div
          className='flex flex-col gap-6'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h3 className="font-bold text-xl">Participation Layer</h3>
          <ul className="flex flex-col">
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Film and television productions with distribution strategies
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Music catalogs and rights based assets
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Scalable creator led studios and intellectual property
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Original game titles and interactive franchises with monetization potential
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Tours, festivals, and premium live experiences with structured revenue
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Creator platforms with recurring income models
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Cross media franchises spanning film, music, gaming, and culture driven consumer brands
            </li>
            <li className="flex py-2 border-b border-[#E0E0E0] items-center gap-2 text-[#808080]">
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              Select AI powered entertainment ventures built for sustainable commercial growth
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        className="flex w-full items-start gap-2 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CircleAlert color='#808080' className='size-6' size={24} />
        <p className="text-[#808080] flex w-full ">
          Investment deal access is selectively granted. Creators with a strong
          Support track record may receive priority eligibility.
        </p>
      </motion.div>
    </section>
  )
}
