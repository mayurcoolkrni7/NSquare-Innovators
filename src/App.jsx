import { Header, Hero, About, Partners, Products } from "./components/Top.jsx";
import { WhyChooseUs, CTA, Testimonials, Contact, Footer } from "./components/Bottom.jsx";

export default function App() {
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
