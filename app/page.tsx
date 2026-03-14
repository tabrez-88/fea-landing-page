import CTA from "@/components/Home/CTA";
import ExampleOpportunities from "@/components/Home/ExampleOpportunities";
import HowFEAWorks from "@/components/Home/HowFEAWorks";
import Jumbotron from "@/components/Home/Jumbotron";
import WhatIsFEA from "@/components/Home/WhatIsFEA";
import WhoIsFEA from "@/components/Home/WhoIsFEA";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Jumbotron />
      <WhatIsFEA />
      <WhoIsFEA />
      <HowFEAWorks />
      <ExampleOpportunities />
      <CTA />
      <Footer />
    </main>
  );
}
