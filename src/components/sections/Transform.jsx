import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ---------------------------------------------------------------------------
// Transform
// ---------------------------------------------------------------------------
export default function Transform() {
  const { t } = useLang();

  const sectionRef             = useRef(null);
  const videoRef               = useRef(null);
  const { isVisible }          = useScrollReveal(sectionRef);

  // IntersectionObserver — play when ≥20% in view, pause when out
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-transform"
      style={{
        padding:  "60px 1.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth:  "900px",
          margin:    "0 auto",
          textAlign: "center",
        }}
      >
        {/* ── Heading ── */}
        <h2
          style={{
            margin:        "0 0 1.5rem",
            fontSize:      "2rem",
            fontWeight:    800,
            letterSpacing: "-0.02em",
            lineHeight:    1.2,
          }}
        >
          {/* "Same fruit." — fades in first */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            style={{ color: "#fff", display: "inline" }}
          >
            {t.transformText}
          </motion.span>

          {/* Non-breaking space between phrases */}
          <span aria-hidden style={{ display: "inline" }}>&nbsp;</span>

          {/* "Smarter form." — gold, delayed */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.4 }}
            style={{
              background:           "linear-gradient(135deg, #d6c06f, #f6e6a1, #bfa24a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              display:              "inline",
            }}
          >
            {t.transformTextAccent}
          </motion.span>
        </h2>

        {/* ── Video ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.2 }}
          style={{
            width:  "90%",
            maxWidth: "580px",
            margin:   "0 auto",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/transform-process.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="transform-video"
            style={{
              width:        "100%",
              display:      "block",
              borderRadius: "16px",
              boxShadow:    "0 30px 60px rgba(0,0,0,0.5)",
              animation:    "videoGlow 4s ease-in-out infinite",
            }}
          />
        </motion.div>

        {/* ── Context paragraph ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          style={{
            maxWidth:   "480px",
            margin:     "1.75rem auto 0",
            fontSize:   "0.95rem",
            lineHeight: 1.7,
            color:      "rgba(255,255,255,0.70)",
            textAlign:  "center",
          }}
        >
          Freeze-drying removes moisture while locking in natural flavour, nutrients,
          and crunch. No heat. No additives. Just fruit at its best.
        </motion.p>

        {/* ── Feature pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
          style={{
            display:        "flex",
            justifyContent: "center",
            flexWrap:       "wrap",
            gap:            "0.75rem",
            marginTop:      "1.25rem",
          }}
        >
          {[
            { icon: "❄️", label: "Freeze-Dried"  },
            { icon: "🍓", label: "100% Fruit"    },
            { icon: "⚡",  label: "Stays Crunchy" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             "0.35rem",
                padding:         "0.4rem 1rem",
                background:      "rgba(10,61,47,0.65)",
                border:          "1px solid rgba(214,192,111,0.30)",
                borderRadius:    "999px",
                fontSize:        "0.85rem",
                color:           "#fff",
                fontWeight:      500,
                backdropFilter:  "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              {icon} {label}
            </span>
          ))}
        </motion.div>

        {/* ── Gold divider ── */}
        <div
          aria-hidden
          style={{
            maxWidth:   "500px",
            margin:     "3.5rem auto 0",
            height:     "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(214,192,111,0.40) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes videoGlow {
          0%, 100% {
            box-shadow:
              0 30px 60px rgba(0,0,0,0.50),
              0 0 0 1px rgba(214,192,111,0.00);
          }
          50% {
            box-shadow:
              0 30px 60px rgba(0,0,0,0.50),
              0 0 0 1.5px rgba(214,192,111,0.22),
              0 0 28px 4px rgba(214,192,111,0.08);
          }
        }
      `}</style>
    </section>
  );
}
