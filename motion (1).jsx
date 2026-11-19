import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Fade + slide in when scrolled into view (Framer "Appear" effect). */
export function Reveal({ children, y = 20, x = 0, delay = 0, duration = 0.8, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Word-by-word blur reveal used on the hero headline. */
export function BlurWords({ text, className, delay = 0.2, stagger = 0.08, as = 'h1' }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{
            hidden: { opacity: 0, y: 10, filter: 'blur(10px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
          }}
        >
          {w + (i < words.length - 1 ? ' ' : '')}
        </motion.span>
      ))}
    </Tag>
  )
}

/** Pill button with the 3D text-flip hover from the Framer button component. */
export function FlipButton({ href, children, variant = 'orange', className = '' }) {
  return (
    <a href={href} className={`flip-btn flip-btn--${variant} ${className}`}>
      <span className="flip-btn__inner">
        <span className="flip-btn__t1">{children}</span>
        <span className="flip-btn__t2" aria-hidden="true">{children}</span>
      </span>
    </a>
  )
}
