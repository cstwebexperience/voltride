import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryModal from "@/components/CountryModal";
import Toast from "@/components/Toast";
import TranslateBridge from "@/components/TranslateBridge";
import SupportChat from "@/components/SupportChat";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800"] });
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] });

export const metadata = {
  metadataBase: new URL("https://voltride-nine.vercel.app"),
  title: { default: "ZEPHRIDE — Fat-Tire Electric Bikes", template: "%s · ZEPHRIDE" },
  description: "CE-certified fat-tire electric bikes. Five models, full suspension, hydraulic brakes. Free shipping across Europe.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ZEPHRIDE — Fat-Tire Electric Bikes",
    description: "Where the road ends, you keep going. Five all-terrain electric bikes. Free shipping across Europe.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEPHRIDE — Fat-Tire Electric Bikes",
    description: "Where the road ends, you keep going. Five all-terrain electric bikes. Free shipping across Europe.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3efe7",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZEPHRIDE",
  url: "https://voltride-nine.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="grain" aria-hidden="true" />
        <StoreProvider>
          <TranslateBridge />
          <CountryModal />
          <Header />
          {children}
          <Footer />
          <Toast />
          <SupportChat />
        </StoreProvider>
      </body>
    </html>
  );
}
