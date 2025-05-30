
// app/layout.tsx
import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
//import Script from "next/script";
import { AOSInit } from "./components/AOSInit";
import WowInit from "./components/WowInit";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "ApartmateMe",
  description: "Find your perfect rental",
  icons: { icon: "/images/icons/apartmateme_logo.jpeg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased index-page`}>
        <AOSInit />
        <WowInit />
        <Header />
        <main>{children}</main>
        <Footer />

        {/* <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/php-email-form/validate.js" strategy="afterInteractive" />
        <Script src="/vendor/aos/aos.js" strategy="afterInteractive" />
        <Script src="/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" />
        <Script src="/vendor/imagesloaded/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/vendor/isotope-layout/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/lib/wow/wow.min.js" strategy="lazyOnload" />
        <Script src="/lib/owlcarousel/owl.carousel.min.js" strategy="lazyOnload" />  */}
      </body>
    </html>
  );
}
