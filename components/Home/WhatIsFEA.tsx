import Image from 'next/image'
import AboutFEA from '@/public/assets/about-fea.png'

export default function WhatIsFEA() {
  return (
    <section className="flex flex-col md:flex-row gap-6 w-full px-6 py-20 md:px-19.5 lg:px-37.5 transition-all duration-300">
      <div className="flex flex-1 flex-col gap-6">
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
      </div>

      <div className="flex flex-1 justify-center md:justify-end">
        <div className="relative w-full h-94">
          <Image
            src={AboutFEA}
            alt="FEA Platform Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
