import CTA from "@/components/Home/CTA";
import ExampleOpportunities from "@/components/Home/ExampleOpportunities";
import HowFEAWorks from "@/components/Home/HowFEAWorks";
import Jumbotron from "@/components/Home/Jumbotron";
import WhatIsFEA from "@/components/Home/WhatIsFEA";
import WhoIsFEA from "@/components/Home/WhoIsFEA";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Jumbotron />
      <WhatIsFEA />
      <WhoIsFEA />
      <HowFEAWorks />
      <ExampleOpportunities />
      <CTA />
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
