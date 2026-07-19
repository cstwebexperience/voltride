import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Showroom from "@/components/Showroom";
import WhyUs from "@/components/WhyUs";
import Compare from "@/components/Compare";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <div id="bikes" />
      <Showroom />
      <WhyUs />
      <Compare />
      <Faq />
      <FinalCta />
    </main>
  );
}
