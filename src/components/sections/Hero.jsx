import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

const scaleIn = (delay = 0) => ({
  initial:    { opacity: 0, scale: 0.95 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

// ---------------------------------------------------------------------------
// Ripple hook — returns { ripples, triggerRipple }
// ---------------------------------------------------------------------------
function useRipple() {
  const [ripples, setRipples] = useState([]);

  const triggerRipple = useCallback((e) => {
    const btn  = e.currentTarget.getBoundingClientRect();
    const x    = e.clientX - btn.left;
    const y    = e.clientY - btn.top;
    const id   = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return { ripples, triggerRipple };
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export default function Hero({ onScrollToEarlyAccess }) {
  const { t, isRTL } = useLang();
  const { ripples, triggerRipple } = useRipple();

  // Mouse parallax on the image
  const imageRef  = useRef(null);
  const rafRef    = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left - rect.width  / 2,
      y: e.clientY - rect.top  - rect.height / 2,
    };

    if (rafRef.current) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      if (imageRef.current) {
        const { x, y } = mouseRef.current;
        imageRef.current.style.transform =
          `translateX(${x / 40}px) translateY(${y / 40}px)`;
      }
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = "translateX(0px) translateY(0px)";
      imageRef.current.style.transition = "transform 0.6s ease";
      setTimeout(() => {
        if (imageRef.current) imageRef.current.style.transition = "";
      }, 600);
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const heroTitle = t.heroTitle; // array of 3 lines
  const titleDelays = [0.25, 0.40, 0.55];

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position:   "relative",
        overflow:   "hidden",
        minHeight:  "100svh",
        display:    "flex",
        alignItems: "center",
        background: "radial-gradient(circle at center, #1b6b4a 0%, #135a3a 60%, #0a2e1e 100%)",
      }}
    >
      {/* Gold radial glow behind left-center text */}
      <div
        aria-hidden
        style={{
          position:    "absolute",
          inset:       0,
          background:  "radial-gradient(ellipse 55% 45% at 30% 40%, rgba(214,192,111,0.10) 0%, transparent 70%)",
          pointerEvents:"none",
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden
        style={{
          position:       "absolute",
          inset:          0,
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity:        0.4,
          pointerEvents:  "none",
        }}
      />

      {/* ── Two-column grid ── */}
      <div
        style={{
          position:              "relative",
          zIndex:                1,
          maxWidth:              "1200px",
          width:                 "100%",
          margin:                "0 auto",
          padding:               "6rem 1.5rem 4rem",
          display:               "grid",
          gridTemplateColumns:   "minmax(45%, 1fr) 1fr",
          gridTemplateAreas:     isRTL ? '"image text"' : '"text image"',
          gap:                   "3rem",
          alignItems:            "center",
        }}
        className="hero-grid"
      >
        {/* ────────────── TEXT column ────────────── */}
        <div style={{ gridArea: "text", textAlign: isRTL ? "right" : "left" }}>

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            style={{
              margin:        "0 0 1.25rem",
              fontSize:      "0.7rem",
              fontWeight:    700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         "#d6c06f",
              opacity:       0.85,
            }}
          >
            {t.heroEyebrow}
          </motion.p>

          {/* Title lines */}
          <h1 style={{ margin: "0 0 1.5rem", lineHeight: 1.15 }}>
            {heroTitle.map((line, i) => {
              const isLast = i === heroTitle.length - 1;
              return (
                <motion.span
                  key={i}
                  {...fadeUp(titleDelays[i])}
                  style={{
                    display:    "block",
                    fontSize:   "clamp(2.2rem, 3.5vw, 3.2rem)",
                    fontWeight: 800,
                    color:      "#fff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isLast ? (
                    <span className="hero-underline-wrap" style={{ position: "relative", display: "inline-block" }}>
                      {line}
                      <span
                        className="hero-gold-underline"
                        aria-hidden
                        style={{
                          position:   "absolute",
                          bottom:     "-4px",
                          left:       0,
                          height:     "3px",
                          width:      "100%",
                          borderRadius:"2px",
                          background: "linear-gradient(90deg, #d6c06f, #f6e6a1, #bfa24a)",
                          transformOrigin: "left center",
                          animation:  "growUnderline 0.6s ease 0.7s both",
                        }}
                      />
                    </span>
                  ) : line}
                </motion.span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <motion.p
            {...fadeIn(0.7)}
            style={{
              margin:     "0 0 2rem",
              fontSize:   "clamp(0.95rem, 1.8vw, 1.1rem)",
              lineHeight: 1.7,
              color:      "rgba(255,255,255,0.72)",
              maxWidth:   "480px",
              marginInlineEnd: isRTL ? 0 : "auto",
            }}
          >
            {t.heroDesc}
          </motion.p>

          {/* CTA button */}
          <motion.div {...scaleIn(0.85)} style={{ display: "inline-block", marginBottom: "0.75rem" }}>
            <button
              className="hero-cta-btn"
              onClick={(e) => {
                triggerRipple(e);
                onScrollToEarlyAccess?.();
              }}
              style={{
                position:      "relative",
                overflow:      "hidden",
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                padding:       "0.95rem 2rem",
                background:    "linear-gradient(135deg, #d6c06f 0%, #f6e6a1 50%, #bfa24a 100%)",
                backgroundSize: "200% 200%",
                border:        "none",
                borderRadius:  "0.85rem",
                color:         "#0a1a10",
                fontSize:      "clamp(0.9rem, 1.5vw, 1rem)",
                fontWeight:    700,
                letterSpacing: "0.03em",
                cursor:        "pointer",
                animation:     "ctaPulse 3s ease-in-out infinite",
                whiteSpace:    "nowrap",
              }}
            >
              {t.cta}
              <span style={{ fontSize: "1.1em" }}>→</span>

              {/* Ripple layers */}
              {ripples.map((r) => (
                <span
                  key={r.id}
                  style={{
                    position:     "absolute",
                    left:         r.x,
                    top:          r.y,
                    width:        "8px",
                    height:       "8px",
                    transform:    "translate(-50%, -50%) scale(0)",
                    background:   "rgba(255,255,255,0.55)",
                    borderRadius: "50%",
                    animation:    "rippleExpand 0.6s ease-out forwards",
                    pointerEvents:"none",
                  }}
                />
              ))}
            </button>
          </motion.div>

          {/* CTA subtext */}
          <motion.p
            {...fadeIn(0.95)}
            style={{
              display:    "block",
              margin:     "0.5rem 0 0",
              fontSize:   "0.78rem",
              color:      "rgba(255,255,255,0.45)",
              letterSpacing:"0.02em",
            }}
          >
            {t.ctaSubtext}
          </motion.p>

          {/* Bullet points */}
          <ul
            style={{
              listStyle:      "none",
              padding:        0,
              margin:         "2rem 0 0",
              display:        "flex",
              flexDirection:  "column",
              gap:            "0.65rem",
              alignItems:     isRTL ? "flex-end" : "flex-start",
            }}
          >
            {t.heroPoints.map((point, i) => (
              <motion.li
                key={i}
                {...fadeIn(1.0 + i * 0.1)}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "0.6rem",
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink:         0,
                    width:              "18px",
                    height:             "18px",
                    borderRadius:       "50%",
                    background:         "linear-gradient(135deg, #d6c06f, #bfa24a)",
                    display:            "flex",
                    alignItems:         "center",
                    justifyContent:     "center",
                    fontSize:           "0.65rem",
                    color:              "#0a1a10",
                    fontWeight:         900,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize:   "0.92rem",
                    fontWeight: 500,
                    background: "linear-gradient(135deg, #fff 60%, rgba(214,192,111,0.8))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {point}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Trust line */}
          <motion.p
            {...fadeIn(1.35)}
            style={{
              marginTop:  "1rem",
              fontSize:   "0.8rem",
              color:      "rgba(255,255,255,0.50)",
              textAlign:  isRTL ? "right" : "left",
            }}
          >
            Join 500+ people already on the early access list.
          </motion.p>
        </div>

        {/* ────────────── IMAGE column ────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 120, damping: 20 }}
          style={{
            gridArea:       "image",
            display:        "flex",
            justifyContent: "center",
            alignItems:     "center",
          }}
        >
          <div
            style={{
              animation:    "heroFloat 6s ease-in-out infinite",
              willChange:   "transform",
              display:      "flex",
              justifyContent:"center",
            }}
          >
            <img
              ref={imageRef}
              src="/assets/product.png"
              alt="VEYRA freeze-dried fruit product"
              style={{
                maxWidth:   "min(420px, 90%)",
                width:      "100%",
                height:     "auto",
                filter:     "drop-shadow(0 24px 48px rgba(0,0,0,0.45)) drop-shadow(0 4px 16px rgba(214,192,111,0.18))",
                willChange: "transform",
                transition: "filter 0.3s ease",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Inline responsive + keyframe styles ── */}
      <style>{`
        @keyframes growUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px);    }
          50%       { transform: translateY(-12px);  }
        }

        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0   0px rgba(214,192,111,0.0),  0 6px 24px rgba(0,0,0,0.25); }
          50%       { box-shadow: 0 0 20px 4px rgba(214,192,111,0.35), 0 6px 24px rgba(0,0,0,0.25); }
        }

        @keyframes rippleExpand {
          to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }

        /* Mobile: single column */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas:   "text" "image" !important;
            padding-top: 5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
