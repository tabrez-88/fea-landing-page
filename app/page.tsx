import FEALogo from "@/public/assets/fea-light.png";
import bgJumbotron from "@/public/assets/bg-jumbotron.png";
import Image from "next/image";

const categories = [
  "Films & TV",
  "Music",
  "Games",
  "Live Events",
  "Creator Projects",
];

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-start overflow-hidden">
        <Image
          src={bgJumbotron}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex flex-col w-full px-8 md:px-16 lg:px-24 pt-8">
          {/* Logo */}
          <Image src={FEALogo} alt="FEA Logo" className="h-12 w-12" />

          {/* Main Heading */}
          <div className="mt-12 md:mt-20 flex items-end gap-4">
            <h1 className="text-[80px] md:text-[120px] lg:text-[150px] font-bold leading-none text-white tracking-tight">
              FEA
            </h1>
            <div className="flex items-center gap-3 pb-4 md:pb-6">
              <div className="w-0.5 h-16 md:h-20 bg-white" />
              <div className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
                <span>is</span>
                <br />
                <span className="font-bold">launch</span>
                <span className="text-white/40">ing soon</span>
              </div>
            </div>
          </div>

          {/* Horizontal line with dot */}
          <div className="flex items-center mt-2 max-w-md">
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="flex-1 h-0.5 bg-white" />
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className="border border-white text-white text-sm px-4 py-1.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <div className="mt-10 max-w-lg">
            <h2 className="text-2xl md:text-3xl text-white/80 font-light leading-snug">
              Start with community{" "}
              <span className="text-white">support.</span>
              <br />
              Scale with structured{" "}
              <span className="text-white">participation.</span>
            </h2>
          </div>

          {/* Description */}
          <div className="mt-8 max-w-md space-y-4">
            <p className="text-white text-sm leading-relaxed">
              <span className="font-bold">Funkyland Entertainment Asset</span>{" "}
              A Curated Platform for entertainment projects built for longevity
              and success.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Helping creators bring ambitious projects to life. Providing
              verified participants access to structured opportunities connected
              to high quality projects.
            </p>
          </div>
        </div>
      </section>

      {/* What is FEA Section */}
      <section className="w-full py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Text */}
            <div className="flex flex-col">
              <span className="te text-xs font-bold tracking-[0.2em] uppercase">
                Platform
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light">
                What is <span className="font-bold">FEA</span>?
              </h2>
              <p className="mt-6  text-sm leading-relaxed max-w-md">
                FEA is building a modern platform where standout entertainment
                projects launch with stronger structure, aligned support, and
                long term vision.
              </p>
              <p className="mt-4  text-sm leading-relaxed max-w-md">
                We connect high potential projects with the right supporters,
                partners, and opportunities at the moments that matter most.
              </p>
            </div>

            {/* Right - Isometric Image */}
            <div className="flex justify-center md:justify-end">
              {/* Replace src with your isometric city image */}
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/assets/about-fea.png"
                  alt="FEA Platform Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Who Is FEA For Section */}
      <section className="w-full py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/assets/audience-fea.png"
                  alt="FEA Audience Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] uppercase">
                Audience
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light">
                Who Is <span className="font-bold">FEA</span> For?
              </h2>

              <div className="mt-8 space-y-6">
                {/* Creators & Studios */}
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-sm">Creators & Studios</h3>
                    <p className="mt-1 text-sm opacity-70">
                      Bring structured entertainment projects to a curated
                      marketplace designed for long-term value.
                    </p>
                  </div>
                </div>

                {/* Supporters */}
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-sm">Supporters</h3>
                    <p className="mt-1 text-sm opacity-70">
                      Access exclusive releases, premiere invitations, and
                      priority participation opportunities.
                    </p>
                  </div>
                </div>

                {/* Verified Participants */}
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-sm">
                      Verified Participants
                    </h3>
                    <p className="mt-1 text-sm opacity-70">
                      Explore structured participation opportunities aligned
                      with project performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How FEA Works Section */}
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
            src="/assets/works-fea.png"
            alt="How FEA Works Illustration"
            fill
            className="object-contain"
          />
        </div>
      </section>
      {/* Example Opportunities Section */}
      <section className="w-full py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            Opportunities
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light">
            Example <span className="font-bold">Opportunities</span>
          </h2>

          {/* Two Column Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Support Layer */}
            <div>
              <h3 className="font-bold text-base mb-6">Support Layer</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Independent films and premium short form series
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Emerging artist releases and passion driven music projects
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Creator led content and original storytelling
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Early stage game concepts and interactive experiences
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Community driven live events
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Experimental and culturally driven creative work
                </li>
              </ul>
            </div>

            {/* Participation Layer */}
            <div>
              <h3 className="font-bold text-base mb-6">Participation Layer</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Film and television productions with distribution strategies
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Music catalogs and rights based assets
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Scalable creator led studios and intellectual property
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Original game titles and interactive franchises with monetization potential
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Tours, festivals, and premium live experiences with structured revenue
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Creator platforms with recurring income models
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Cross media franchises spanning film, music, gaming, and culture driven consumer brands
                </li>
                <li className="flex items-start gap-3 text-sm opacity-80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  Select AI powered entertainment ventures built for sustainable commercial growth
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 mt-12 max-w-lg">
            <svg
              className="w-5 h-5 mt-0.5 shrink-0 opacity-60"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs opacity-60 leading-relaxed">
              Investment deal access is selectively granted. Creators with a strong
              Support track record may receive priority eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* Creator & Partners Section */}
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
      {/* Closing Statement Section */}
      <section className="w-full py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-8 md:px-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
            <span className="font-bold">Great entertainment</span> doesn&apos;t
            <br />
            happen by accident.
          </h2>
          <p className="mt-6 text-sm opacity-60">
            It takes belief. It takes structure. It takes the right ecosystem.
          </p>
          <p className="mt-4 text-sm font-bold">
            FEA is being built to power that future.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t px-8 md:px-16 lg:px-24 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-1 text-xs opacity-60">
            <p>FEA is a technology platform supporting entertainment projects.</p>
            <p>Certain opportunities may be available only to qualified individuals.</p>
            <p>Nothing on this website constitutes an offer to sell or a solicitation of securities.</p>
          </div>
          <div className="space-y-1 text-xs text-right">
            <p className="opacity-60">
              General Inquiries: <span className="font-bold opacity-100">contact@funkyland.io</span>
            </p>
            <p className="opacity-60">
              &copy; 2026 FEA Funkyland Entertainment Asset. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
