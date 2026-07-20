import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Showroom from "@/components/Showroom";
import WhyUs from "@/components/WhyUs";
import ShopGrid from "@/components/ShopGrid";
import Faq from "@/components/Faq";
import Certificates from "@/components/Certificates";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <div id="bikes" />
      <Showroom />
      <ShopGrid />
      <WhyUs />
      <Faq />
      <Certificates />
      <FinalCta />
    </main>
  );
}
