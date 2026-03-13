
export default function CreatorAndPartners() {
  return (
    <section className="w-full bg-[#111111] text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Creator - Left */}
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Creator
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light">
              Bring Your Project to <span className="font-bold">FEA</span>
            </h2>
            <p className="mt-6 text-sm text-white/60 leading-relaxed">
              FEA is preparing for launch and is currently in conversations with
              creators and teams developing standout projects across Films & TV,
              Music, Games, Live Events, and Creator Projects.
            </p>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              If you&apos;re building something exceptional and exploring the right
              platform for your next stage, we&apos;d love to connect.
            </p>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Creator access will open in phases. Early inquiries are welcome.
            </p>
            <a
              href="/bring-your-project-to-fea"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-medium rounded-full w-fit hover:bg-white/90 transition-colors"
            >
              Start The conversation
            </a>
          </div>

          {/* Partners - Right */}
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Partners
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light">
              Strategic <span className="font-bold">Partners</span>
            </h2>
            <p className="mt-6 text-sm text-white/60 leading-relaxed">
              FEA is assembling a trusted network of capital partners, strategic
              advisors, legal experts, industry operators, and distribution teams.
            </p>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              If your work helps ambitious projects scale, let&apos;s connect.
            </p>
            <a
              href="/partner-with-fea"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-white text-white text-sm font-medium rounded-full w-fit hover:bg-white/10 transition-colors"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
