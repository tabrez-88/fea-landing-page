import Image from 'next/image'
import WorksFEA from '@/public/assets/works-fea.png'

export default function HowFEAWorks() {
  return (
    <section className="w-full bg-[#111111] text-white relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <span className="text-xs font-bold tracking-[0.2em] uppercase">
          Structure
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light">
          How <span className="font-bold">FEA</span> Works
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Card 01 */}
          <div className="border border-white/20 rounded-lg p-8">
            <span className="text-sm text-white/50">01</span>
            <h3 className="mt-6 text-lg font-bold">Support Layer</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Back projects you believe in and unlock exclusive rewards,
              limited releases, and early access experiences
            </p>
          </div>

          {/* Card 02 */}
          <div className="border border-white/20 rounded-lg p-8">
            <span className="text-sm text-white/50">02</span>
            <h3 className="mt-6 text-lg font-bold">Participation Layer</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              For select projects, verified participants may access structured
              opportunities connected to project performance.
            </p>
          </div>
        </div>

        {/* Bottom Illustration */}
        <Image
          src={WorksFEA}
          alt="How FEA Works Illustration"
          fill
          className="object-contain"
        />
      </div>
    </section>
  )
}
