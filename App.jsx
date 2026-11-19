import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header, Hero, About, Partners, Products } from "./components/Top.jsx";
import { WhyChooseUs, CTA, Testimonials, Contact, Footer } from "./components/Bottom.jsx";

const PredictaXPage = lazy(() => import("./predictax/PredictaXPage.jsx"));

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Partners />
        <Products />
        <WhyChooseUs />
        <CTA />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// /manthan360 is a static page (public/manthan360.html). Vercel serves it directly via
// vercel.json; this fallback covers `npm run dev` and any in-app navigation.
function Manthan360Redirect() {
  useEffect(() => {
    window.location.replace("/manthan360.html");
  }, []);
  return null;
}

// Start each page at the top (or at the #section in the URL).
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#000" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Route matching is case-insensitive, so /predictax and /PredictaX also work */}
          <Route path="/predictaX" element={<PredictaXPage />} />
          <Route path="/products/predicta-x" element={<Navigate to="/predictaX" replace />} />
          <Route path="/manthan360" element={<Manthan360Redirect />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}
