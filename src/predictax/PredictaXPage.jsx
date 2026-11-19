// PredictaX product page (from the supplied predicta-x project), served at /predictaX.
import { useEffect } from "react";
import "@fontsource/google-sans/400.css";
import "@fontsource/google-sans/500.css";
import "@fontsource/google-sans/600.css";
import "@fontsource/google-sans/700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "./styles.css";
import { Header } from "../components/Top.jsx";
import { Footer } from "../components/Bottom.jsx";
import { CTA, Comparison, Decision, Engine, Hero, Layers, Problem, Stats, Steps } from "./components/Sections";

export default function PredictaXPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "PredictaX | NSquare";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="page pxp-page">
      {/* Innovators logo bar (menu hidden on this page) */}
      <div className="px-top">
        <Header logoOnly />
      </div>
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Engine />
        <Layers />
        <Steps />
        <Comparison />
        <Decision />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
