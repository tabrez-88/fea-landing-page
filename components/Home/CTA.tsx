"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function CreatorAndPartners() {
  return (
    <section className="w-full bg-[#111111] text-white px-6 py-20 md:px-19.5 lg:px-37.5 transition-all duration-300">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            className="flex flex-col gap-8 md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-xl font-bold uppercase text-[#B2B2B2]">
                  Creator
                </span>
                <h2 className="text-3xl md:text-[40px] font-light">
                  Bring Your Project to <span className="font-bold">FEA</span>
                </h2>
              </div>
              <p className="text-[#989898]">
                FEA is preparing for launch and is currently in conversations with
                creators and teams developing standout projects across Films & TV,
                Music, Games, Live Events, and Creator Projects.
              </p>
              <p className="text-[#989898]">
                If you&apos;re building something exceptional and exploring the right
                platform for your next stage, we&apos;d love to connect.
              </p>
              <p className="text-[#989898]">
                Creator access will open in phases. Early inquiries are welcome.
              </p>
            </div>
            <Link
              href="/bring-your-project-to-fea"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white text-sm font-medium rounded-lg w-fit hover:bg-white/10 transition-colors"
            >
              Start The conversation
            </Link>
          </motion.div>

          {/* Partners - Right */}
          <motion.div
            className="flex flex-col gap-8 md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-xl font-bold uppercase text-[#B2B2B2]">
                  Partners
                </span>
                <h2 className="text-3xl md:text-[40px] font-light">
                  Strategic <span className="font-bold">Partners</span>
                </h2>
              </div>
              <p className="text-[#989898]">
                FEA is assembling a trusted network of capital partners, strategic
                advisors, legal experts, industry operators, and distribution teams.
              </p>
              <p className="text-[#989898]">
                If your work helps ambitious projects scale, let&apos;s connect.
              </p>
            </div>
            <Link
              href="/partner-with-fea"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white text-sm font-medium rounded-lg w-fit hover:bg-white/10 transition-colors"
            >
              Partner With Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
