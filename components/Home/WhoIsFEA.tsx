"use client";

import AudienceFEA from '@/public/assets/audience-fea.png'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function WhoIsFEA() {
  return (
    <section className="w-full px-6 py-4 md:py-20 md:px-19.5 lg:px-37.5 transition-all duration-300" >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          className="relative w-full h-103 order-2 md:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={AudienceFEA}
            alt="FEA Audience Illustration"
            fill
            className="object-contain"
          />
        </motion.div>
        <div className="flex flex-col gap-11 order-1 md:order-2">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xl font-bold tracking-[0.2em] uppercase">
              Audience
            </span>
            <h2 className="text-3xl md:text-[40px] font-light">
              Who Is <span className="font-bold">FEA</span> For?
            </h2>
          </motion.div>
          <div className="space-y-6">
            <motion.div
              className="flex gap-2 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CircleCheck fill='black' color='white' className='size-6' size={20} />
              <div className='flex flex-col w-full'>
                <h3 className="font-bold text-xl">Creators & Studios</h3>
                <p className="text-[#808080]">
                  Bring structured entertainment projects to a curated
                  marketplace designed for long-term value.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CircleCheck fill='black' color='white' className='size-6' size={20} />
              <div className='flex flex-col w-full'>
                <h3 className="font-bold text-xl">Supporters</h3>
                <p className="text-[#808080]">
                  Access exclusive releases, premiere invitations, and
                  priority participation opportunities.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CircleCheck fill='black' color='white' className='size-6' size={20} />
              <div className='flex flex-col w-full'>
                <h3 className="font-bold text-xl">
                  Verified Participants
                </h3>
                <p className="text-[#808080]">
                  Explore structured participation opportunities aligned
                  with project performance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section >
  )
}
