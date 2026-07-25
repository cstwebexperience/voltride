import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WhyUs from "@/components/WhyUs";
import ShopGrid from "@/components/ShopGrid";
import Certificates from "@/components/Certificates";
import FinalCta from "@/components/FinalCta";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Ticker />
      <div id="bikes" />
      <ShopGrid />
      <WhyUs />
      <Certificates />
      <FinalCta />
      <Faq />
    </main>
  );
}
