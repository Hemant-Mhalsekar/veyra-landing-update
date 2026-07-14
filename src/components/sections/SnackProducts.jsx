import { useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ---------------------------------------------------------------------------
// Product data — order is fixed, never reversed in RTL
// ---------------------------------------------------------------------------
const PRODUCTS = [
  { src: "/assets/product-red.png",    name: "Apple Dices",   floatDuration: "4.5s" },
  { src: "/assets/product-green.png",  name: "Kiwi Slices",   floatDuration: "5.0s" },
  { src: "/assets/product-yellow.png", name: "Pineapple",     floatDuration: "4.8s" },
  { src: "/assets/product-orange.png", name: "Mango",         floatDuration: "5.3s" },
  { src: "/assets/product-dark.png",   name: "Banana",        floatDuration: "4.6s" },
];

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------
const headingVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const bagVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const bagHover = {
  rotate: 3,
  scale:  1.08,
  filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.6))",
};

// ---------------------------------------------------------------------------
// SnackProducts
// ---------------------------------------------------------------------------
export default function SnackProducts() {
  const { t, isRTL } = useLang();

  const sectionRef  = useRef(null);
  const textRef     = useRef(null);
  const { isVisible: sectionVisible } = useScrollReveal(sectionRef);
  const { isVisible: textVisible    } = useScrollReveal(textRef);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "radial-gradient(circle at top, #0a3d2f 0%, #041f18 70%)",
        padding:    "6rem 1.5rem 4rem",
        overflow:   "hidden",
      }}
    >
      {/* ── Text block ── */}
      <div
        ref={textRef}
        style={{
          maxWidth:  "700px",
          margin:    "0 auto 4rem",
          textAlign: isRTL ? "right" : "center",
        }}
      >
        {/* Title — two lines */}
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={textVisible ? "visible" : "hidden"}
          style={{
            margin:        "0 0 1.25rem",
            fontSize:      "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight:    800,
            color:         "#fff",
            letterSpacing: "-0.02em",
            lineHeight:    1.2,
          }}
        >
          {t.snackTitle.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {i === 0 ? (
                line
              ) : (
                <span
                  style={{
                    background:           "linear-gradient(135deg, #d6c06f, #f6e6a1, #bfa24a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                    backgroundClip:       "text",
                  }}
                >
                  {line}
                </span>
              )}
            </span>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={headingVariants}
          initial="hidden"
          animate={textVisible ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
          style={{
            margin:     "0 0 0.75rem",
            fontSize:   "clamp(0.95rem, 1.6vw, 1.05rem)",
            lineHeight: 1.7,
            color:      "rgba(255,255,255,0.65)",
          }}
        >
          {t.snackDesc}
        </motion.p>

        {/* Note */}
        <motion.p
          variants={headingVariants}
          initial="hidden"
          animate={textVisible ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          style={{
            margin:        "0",
            fontSize:      "0.82rem",
            fontWeight:    600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background:    "linear-gradient(90deg, #d6c06f, #f6e6a1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >
          {t.snackNote}
        </motion.p>
      </div>

      {/* ── Product bags row ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={sectionVisible ? "visible" : "hidden"}
        style={{
          display:        "flex",
          justifyContent: "center",
          alignItems:     "flex-end",
          flexWrap:       "wrap",
          gap:            "clamp(1rem, 3vw, 2.5rem)",
          maxWidth:       "1100px",
          margin:         "0 auto",
          direction:      "ltr", // product order never reverses in RTL
        }}
      >
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.src}
            variants={bagVariants}
            whileHover={bagHover}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{
              flexShrink: 0,
              cursor:     "pointer",
              animation:  `productFloat ${product.floatDuration} ease-in-out ${i * 0.3}s infinite`,
              willChange: "transform",
            }}
          >
            <img
              src={product.src}
              alt={product.name}
              loading="lazy"
              style={{
                height:     "clamp(180px, 22vw, 300px)",
                width:      "auto",
                objectFit:  "contain",
                filter:     "drop-shadow(0 16px 32px rgba(0,0,0,0.45))",
                display:    "block",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Gold divider ── */}
      <div
        aria-hidden
        style={{
          maxWidth: "700px",
          margin:   "4rem auto 0",
          height:   "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(214,192,111,0.40) 50%, transparent 100%)",
        }}
      />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes productFloat {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
