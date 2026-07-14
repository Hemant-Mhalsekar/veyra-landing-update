import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_CLOSE_MS = 4500;

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1,   y: 0  },
  exit:    { opacity: 0, scale: 0.95        },
};

const cardTransition = { type: "spring", stiffness: 300, damping: 25 };

export default function SuccessDialog({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(id);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="success-dialog-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         9999,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            backgroundColor:"rgba(0,0,0,0.55)",
            padding:        "1.5rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="success-dialog-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={cardTransition}
            style={{
              backgroundColor: "#0a3d2f",
              borderRadius:    "1.25rem",
              padding:         "2.5rem 2rem",
              maxWidth:        "420px",
              width:           "100%",
              textAlign:       "center",
              color:           "#fff",
              animation:       "successPulse 0.8s ease forwards",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h2 style={{
              margin:       "0 0 0.75rem",
              fontSize:     "1.6rem",
              fontWeight:   700,
              letterSpacing:"-0.02em",
            }}>
              You&rsquo;re on the list!
            </h2>
            <p style={{
              margin:     "0 0 2rem",
              fontSize:   "1rem",
              lineHeight: 1.6,
              opacity:    0.85,
            }}>
              We&rsquo;ll notify you as soon as VEYRA launches.
            </p>
            <button
              onClick={onClose}
              style={{
                background:   "linear-gradient(135deg, #d6c06f, #bfa24a)",
                color:        "#0a0a0a",
                border:       "none",
                borderRadius: "0.75rem",
                padding:      "0.8rem 2.5rem",
                fontSize:     "1rem",
                fontWeight:   700,
                cursor:       "pointer",
                letterSpacing:"0.04em",
              }}
            >
              Awesome
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
