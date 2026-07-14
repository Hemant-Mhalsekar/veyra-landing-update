import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";

const SCROLL_THRESHOLD = 60;

export default function Navbar() {
  const { t, switchLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(10, 28, 20, 0.88)"
          : "rgba(0, 0, 0, 0)",
        borderBottomColor: scrolled
          ? "rgba(214, 192, 111, 0.20)"
          : "rgba(214, 192, 111, 0)",
        backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position:       "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         50,
        borderBottom:   "1px solid transparent",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
      }}
    >
      <div
        style={{
          maxWidth:      "1200px",
          margin:        "0 auto",
          padding:       "0 1.5rem",
          height:        "clamp(56px, 6vh, 72px)",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
        }}
      >
        {/* ── Logo ── */}
        <a
          href="/"
          aria-label="VEYRA home"
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <img
            src="/assets/veyra_logo.jpg"
            alt="VEYRA"
            style={{
              height:       "36px",
              width:        "36px",
              objectFit:    "cover",
              borderRadius: "8px",
              display:      "block",
            }}
          />
        </a>

        {/* ── Language Toggle ── */}
        <motion.button
          onClick={switchLang}
          whileHover={{ scale: 1.04 }}
          whileTap={{   scale: 0.96 }}
          style={{
            display:         "flex",
            alignItems:      "center",
            gap:             "0.35rem",
            padding:         "0.45rem 1rem",
            background:      "rgba(255, 255, 255, 0.08)",
            border:          "1px solid rgba(255, 255, 255, 0.22)",
            borderRadius:    "999px",
            backdropFilter:  "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color:           "#fff",
            fontSize:        "0.85rem",
            fontWeight:      500,
            letterSpacing:   "0.02em",
            cursor:          "pointer",
            userSelect:      "none",
            whiteSpace:      "nowrap",
            transition:      "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.14)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>🌐</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={t.langToggle}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {t.langToggle}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}
