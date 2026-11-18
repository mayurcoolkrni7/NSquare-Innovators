import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header, Hero, About, Partners, Products } from "./components/Top.jsx";
import { WhyChooseUs, CTA, Testimonials, Contact, Footer } from "./components/Bottom.jsx";

const PredictaXPage = lazy(() => import("./pages/PredictaX.jsx"));

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
          <Route path="/products/predicta-x" element={<PredictaXPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}
