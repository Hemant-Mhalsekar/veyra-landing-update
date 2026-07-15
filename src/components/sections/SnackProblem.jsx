import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ---------------------------------------------------------------------------
// Video card with IntersectionObserver play / pause
// ---------------------------------------------------------------------------
function ProblemCard({ src, caption, isRTL, index }) {
  const videoRef = useRef(null);
  const cardRef  = useRef(null);

  // Play when ≥20% visible, pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // swallow NotAllowedError in strict browsers
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden:  { opacity: 0, y: 40, rotate: 2 },
    visible: {
      opacity: 1,
      y:       0,
      rotate:  0,
      transition: {
        type:      "spring",
        stiffness: 100,
        damping:   15,
        delay:     index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{
        y:          -8,
        boxShadow: "0 0 0 1.5px rgba(214,192,111,0.50), 0 20px 48px rgba(0,0,0,0.5)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{
        borderRadius:    "16px",
        border:          "1px solid rgba(255,255,255,0.10)",
        overflow:        "hidden",
        background:      "rgba(255,255,255,0.04)",
        boxShadow:       "0 8px 32px rgba(0,0,0,0.3)",
        cursor:          "default",
      }}
    >
      {/* Video */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
          }}
        />
        {/* Subtle vignette over video */}
        <div
          aria-hidden
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to bottom, transparent 60%, rgba(4,31,24,0.7) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          padding:    "1.1rem 1.25rem 1.35rem",
          textAlign:  isRTL ? "right" : "left",
        }}
      >
        <p
          style={{
            margin:     0,
            fontSize:   "0.92rem",
            lineHeight: 1.55,
            color:      "rgba(255,255,255,0.78)",
            fontWeight: 400,
          }}
        >
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SnackProblem
// ---------------------------------------------------------------------------
export default function SnackProblem() {
  const { t, isRTL } = useLang();

  const sectionRef             = useRef(null);
  const { isVisible }          = useScrollReveal(sectionRef);

  // Split title into words for staggered word animation
  const titleWords = t.problemTitle.split(" ");

  const wordContainerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const wordVariants = {
    hidden:  { opacity: 0, x: isRTL ? 24 : -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const cardContainerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0 } }, // delay handled per-card
  };

  const footerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.8 } },
  };

  // Split problemFooter — bold "VEYRA" separately
  const footer        = t.problemFooter;
  const veyraIdx      = footer.indexOf("VEYRA");
  const beforeVeyra   = veyraIdx > -1 ? footer.slice(0, veyraIdx)            : footer;
  const afterVeyra    = veyraIdx > -1 ? footer.slice(veyraIdx + "VEYRA".length) : "";

  const VIDEOS = [
    { src: "/assets/problem-sugar.mp4",  caption: t.problems[0] },
    { src: "/assets/problem-crash.mp4",  caption: t.problems[1] },
    { src: "/assets/problem-messy.mp4",  caption: t.problems[2] },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-problem"
      style={{
        padding:  "6rem 1.5rem 5rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Heading — word-by-word stagger ── */}
        <motion.h2
          variants={wordContainerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          aria-label={t.problemTitle}
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            justifyContent: "center",
            gap:            "0 0.35em",
            margin:         "0 0 3.5rem",
            fontSize:       "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight:     800,
            color:          "#fff",
            letterSpacing:  "-0.02em",
            lineHeight:     1.25,
            textAlign:      "center",
            direction:      isRTL ? "rtl" : "ltr",
          }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* ── Cards grid ── */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(3, 1fr)",
            gap:                   "1.5rem",
            direction:             "ltr", // layout stability in RTL
          }}
          className="problem-cards-grid"
        >
          {VIDEOS.map((video, i) => (
            <ProblemCard
              key={video.src}
              src={video.src}
              caption={video.caption}
              isRTL={isRTL}
              index={i}
            />
          ))}
        </motion.div>

        {/* ── Footer line ── */}
        <motion.p
          variants={footerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          style={{
            marginTop:  "3rem",
            textAlign:  "center",
            fontSize:   "clamp(0.9rem, 1.6vw, 1.05rem)",
            color:      "rgba(255,255,255,0.60)",
            lineHeight: 1.6,
          }}
        >
          {beforeVeyra}
          <strong
            style={{
              fontSize:             "1.15em",
              fontWeight:           800,
              background:           "linear-gradient(135deg, #d6c06f, #f6e6a1, #bfa24a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}
          >
            VEYRA
          </strong>
          {afterVeyra}
        </motion.p>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .problem-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .problem-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
