import { useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

function Dot() {
  return (
    <span
      aria-hidden
      className="footer-dot"
      style={{ opacity: 0.35, userSelect: "none" }}
    >
      ·
    </span>
  );
}

export default function Footer() {
  const { t, isRTL } = useLang();
  const footerRef    = useRef(null);
  const { isVisible } = useScrollReveal(footerRef);

  const rowStyle = {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    flexWrap:       "wrap",
    gap:            "0.55rem",
    flexDirection:  isRTL ? "row-reverse" : "row",
  };

  const linkStyle = {
    color:          "rgba(255,255,255,0.70)",
    textDecoration: "none",
    transition:     "color 0.2s",
  };

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        background: "radial-gradient(circle at top, #0a3d2f 0%, #041f18 70%)",
        padding:    "30px 8%",
        fontSize:   "13px",
        color:      "rgba(255,255,255,0.70)",
        direction:  isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Row 1 */}
      <div style={{ ...rowStyle, marginBottom: "0.55rem" }}>
        <span>{t.footerLaunching}</span>
        <Dot />
        <span>{t.footerFulfilled}</span>
        <Dot />
        <a
          href={`mailto:${t.footerEmail}`}
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d6c06f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
        >
          {t.footerEmail}
        </a>
      </div>

      {/* Row 2 */}
      <div style={rowStyle}>
        <a
          href="#"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d6c06f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
        >
          {t.footerPrivacy}
        </a>
        <Dot />
        <a
          href="#"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d6c06f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
        >
          {t.footerTerms}
        </a>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .footer-dot { display: none; }
        }
      `}</style>
    </motion.footer>
  );
}
