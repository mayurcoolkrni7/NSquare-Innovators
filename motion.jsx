import { motion } from "framer-motion";

const ease = [0.44, 0, 0.56, 1];

/**
 * Word-by-word blur-in text effect (same as the Framer "Text Effect":
 * each word starts at opacity 0, blur(10px), translateY(10px)).
 * Pass `lines` as an array of arrays: [[text, className?], ...] per line.
 */
export function BlurWords({ as = "h2", className, lines, delay = 0, onLoad = false }) {
  const Tag = motion[as];
  let i = 0;
  const trigger = onLoad
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.map(([text, cls], si) =>
            text.split(" ").map((word, wi, arr) => {
              const idx = i++;
              return (
                <motion.span
                  key={`${si}-${wi}`}
                  className={`word ${cls || ""}`}
                  variants={{
                    hidden: { opacity: 0.001, filter: "blur(10px)", y: 10 },
                    show: {
                      opacity: 1,
                      filter: "blur(0px)",
                      y: 0,
                      transition: { duration: 0.6, ease, delay: delay + idx * 0.08 },
                    },
                  }}
                >
                  {word}
                  {wi < arr.length - 1 || si < line.length - 1 ? " " : ""}
                </motion.span>
              );
            })
          )}
        </span>
      ))}
    </Tag>
  );
}

/** Fade + slide in when scrolled into view. */
export function Reveal({ x = 0, y = 0, delay = 0, duration = 0.8, className, children, as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", bounce: 0, duration, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Vertical grid lines shown behind each section. */
export function Lines() {
  return (
    <div className="lines" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

/** Button whose label rolls up on hover (two stacked copies of the text). */
export function RollLabel({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}
