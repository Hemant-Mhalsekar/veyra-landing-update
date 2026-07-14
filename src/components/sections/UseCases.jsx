import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ---------------------------------------------------------------------------
// Per-card entrance direction
// ---------------------------------------------------------------------------
const CARD_INITIAL = [
  { x: -60, y: 0,  opacity: 0 }, // left  — slides from left
  { x:   0, y: 60, opacity: 0 }, // center — slides from below
  { x:  60, y: 0,  opacity: 0 }, // right — slides from right
];

const CARDS_DATA = [
  { img: "/assets/use-gym.jpeg",  useCase: 0 },
  { img: "/assets/use-desk.jpeg", useCase: 1 },
  { img: "/assets/use-go.jpeg",   useCase: 2 },
];

// ---------------------------------------------------------------------------
// Single UseCase card
// ---------------------------------------------------------------------------
function UseCaseCard({ img, title, desc, initial, delay, isRTL }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ ...initial }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      style={{
        borderRadius:    "20px",
        overflow:        "hidden",
        background:      hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        backdropFilter:  "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border:          "1px solid rgba(255,255,255,0.09)",
        boxShadow:       hovered
                           ? "0 24px 56px rgba(0,0,0,0.55)"
                           : "0 8px 28px rgba(0,0,0,0.30)",
        transform:       hovered ? "translateY(-8px)" : "translateY(0px)",
        transition:      "background 0.3s ease, box-shadow 0.3s ease, transform 0.35s ease",
        cursor:          "default",
      }}
    >
      {/* Image with slow zoom */}
      <div
        style={{
          width:    "100%",
          height:   "240px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={img}
          alt={title}
          loading="lazy"
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
            transform:  hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.8s ease",
          }}
        />
      </div>

      {/* Text block */}
      <div
        style={{
          padding:   "1.4rem 1.5rem 1.6rem",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {/* Title with animated gold underline */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "0.6rem" }}>
          <h3
            style={{
              margin:        0,
              fontSize:      "clamp(1rem, 1.8vw, 1.2rem)",
              fontWeight:    700,
              color:         "#fff",
              letterSpacing: "-0.01em",
              lineHeight:    1.3,
            }}
          >
            {title}
          </h3>
          {/* Gold underline: scaleX 0→1 on hover, origin matches text direction */}
          <span
            aria-hidden
            style={{
              display:         "block",
              height:          "2px",
              marginTop:       "4px",
              background:      "linear-gradient(90deg, #d6c06f, #f6e6a1, #bfa24a)",
              borderRadius:    "2px",
              transformOrigin: isRTL ? "right center" : "left center",
              transform:       hovered ? "scaleX(1)" : "scaleX(0)",
              transition:      "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        <p
          style={{
            margin:     0,
            fontSize:   "0.9rem",
            lineHeight: 1.6,
            color:      "rgba(255,255,255,0.62)",
            fontWeight: 400,
          }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// UseCases section
// ---------------------------------------------------------------------------
export default function UseCases() {
  const { t, isRTL } = useLang();
  const sectionRef   = useRef(null);
  const { isVisible } = useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "radial-gradient(circle at top, #0a3d2f 0%, #041f18 70%)",
        padding:    "6rem 1.5rem 5rem",
        overflow:   "hidden",
      }}
    >
      <div
        style={{
          maxWidth:            "1100px",
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "1.5rem",
          direction:           "ltr", // layout always LTR
        }}
        className="use-cases-grid"
      >
        {CARDS_DATA.map(({ img, useCase }, i) => (
          <UseCaseCard
            key={img}
            img={img}
            title={t.useCases[useCase].title}
            desc={t.useCases[useCase].desc}
            initial={CARD_INITIAL[i]}
            delay={i * 0.15}
            isRTL={isRTL}
            // Only animate when section is visible — re-trigger on scroll back
            style={{ visibility: isVisible ? "visible" : "hidden" }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .use-cases-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .use-cases-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
