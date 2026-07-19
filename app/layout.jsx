import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryModal from "@/components/CountryModal";
import Toast from "@/components/Toast";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800"] });
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] });

export const metadata = {
  metadataBase: new URL("https://voltride-nine.vercel.app"),
  title: { default: "ZEPHRIDE — Fat-Tire Electric Bikes", template: "%s · ZEPHRIDE" },
  description: "CE-certified, street-legal fat-tire electric bikes. Five models, full suspension, hydraulic brakes. Free shipping across Europe.",
  openGraph: {
    title: "ZEPHRIDE — Fat-Tire Electric Bikes",
    description: "Where the road ends, you keep going. Five all-terrain electric bikes. Free shipping across Europe.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08080a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <StoreProvider>
          <CountryModal />
          <Header />
          {children}
          <Footer />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
