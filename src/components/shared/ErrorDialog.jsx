import { AnimatePresence, motion } from "framer-motion";

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

// Card fades/scales in then immediately shakes on the x axis
const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale:   1,
    x:       [0, -8, 8, -5, 5, 0],
    transition: {
      opacity:  { duration: 0.25 },
      scale:    { duration: 0.25 },
      x:        { duration: 0.4, delay: 0.2, ease: "easeInOut" },
    },
  },
  exit: { opacity: 0, scale: 0.95 },
};

export default function ErrorDialog({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="error-dialog-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          9999,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            backdropFilter:  "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.55)",
            padding:         "1.5rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="error-dialog-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              backgroundColor: "#2a0f0f",
              borderRadius:    "1.25rem",
              padding:         "2.5rem 2rem",
              maxWidth:        "420px",
              width:           "100%",
              textAlign:       "center",
              color:           "#fff",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
            <h2 style={{
              margin:        "0 0 0.75rem",
              fontSize:      "1.6rem",
              fontWeight:    700,
              letterSpacing: "-0.02em",
            }}>
              Something went wrong
            </h2>
            <p style={{
              margin:     "0 0 2rem",
              fontSize:   "1rem",
              lineHeight: 1.6,
              opacity:    0.85,
            }}>
              Please try again in a moment.
            </p>
            <button
              onClick={onClose}
              style={{
                background:    "linear-gradient(135deg, #c0392b, #922b21)",
                color:         "#fff",
                border:        "none",
                borderRadius:  "0.75rem",
                padding:       "0.8rem 2.5rem",
                fontSize:      "1rem",
                fontWeight:    700,
                cursor:        "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
