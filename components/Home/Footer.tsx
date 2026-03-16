"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-19.5 lg:px-37.5">
      <motion.div
        className="py-10 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-6 mx-auto md:px-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-thin">
            <span className="font-bold">Great entertainment</span> doesn&apos;t
            <br />
            happen by accident.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-[#808080]">
              It takes belief. It takes structure. It takes the right ecosystem.
            </p>
            <p className="font-bold">
              FEA is being built to power that future.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col py-6 border-t md:flex-row justify-between gap-6 text-[#808080]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col w-full gap-2 lg:text-nowrap leading-tight">
          <p>FEA is a technology platform supporting entertainment projects.</p>
          <p>
            Certain opportunities may be available only to qualified
            individuals.
          </p>
          <p>
            Nothing on this website constitutes an offer to sell or a
            solicitation of securities.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2 text-right lg:text-nowrap leading-tight">
          <p>
            General Inquiries:{" "}
            <span className="font-bold text-[#1A1A1A]">
              contact@funkyland.io
            </span>
          </p>
          <p>
            &copy; 2026 FEA Funkyland Entertainment Asset. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
