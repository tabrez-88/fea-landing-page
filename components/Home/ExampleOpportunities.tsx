import React from 'react'

export default function ExampleOpportunities() {
  return (
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
  )
}
