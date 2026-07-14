import { AnimatePresence, motion } from "framer-motion";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { useLang } from "../context/LangContext";

// ---------------------------------------------------------------------------
// Animated digit group — slides the old value up and the new one in from below
// ---------------------------------------------------------------------------
function AnimatedDigit({ value }) {
  const display = String(value).padStart(2, "0");

  return (
    <div
      style={{
        position:   "relative",
        display:    "inline-block",
        overflow:   "hidden",
        height:     "1.2em",
        minWidth:   "2ch",
        textAlign:  "center",
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={display}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y: "-100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display:  "block",
            position: "absolute",
            inset:    0,
            lineHeight: "1.2em",
          }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Separator colon — static, vertically centred
// ---------------------------------------------------------------------------
function Colon() {
  return (
    <span
      aria-hidden
      style={{
        padding:    "0 0.18em",
        opacity:    0.55,
        lineHeight: "1.2em",
      }}
    >
      :
    </span>
  );
}

// ---------------------------------------------------------------------------
// LaunchTimer
// ---------------------------------------------------------------------------
export default function LaunchTimer() {
  const { phase, hours, minutes, seconds } = useCountdownTimer();
  const { t } = useLang();

  return (
    <div
      style={{
        width:           "100%",
        background:      "rgba(255,255,255,0.04)",
        borderBottom:    "1px solid rgba(255,255,255,0.06)",
        padding:         "0.9rem 1rem",
        textAlign:       "center",
        direction:       "ltr",          // numbers always LTR
      }}
    >
      {phase === "running" ? (
        <>
          {/* Label */}
          <p
            style={{
              margin:        "0 0 0.35rem",
              fontSize:      "0.65rem",
              fontWeight:    700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "#d6c06f",
              opacity:       0.8,
            }}
          >
            {t.timerRunning}
          </p>

          {/* Digit display */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       "clamp(24px, 4vw, 32px)",
              fontWeight:     700,
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum"',
              color:          "#d6c06f",
              lineHeight:     1.2,
            }}
          >
            <AnimatedDigit value={hours}   />
            <Colon />
            <AnimatedDigit value={minutes} />
            <Colon />
            <AnimatedDigit value={seconds} />
          </div>
        </>
      ) : (
        /* Closed phase */
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            margin:        0,
            fontSize:      "0.9rem",
            fontWeight:    600,
            letterSpacing: "0.04em",
            color:         "#e07070",
          }}
        >
          {t.timerClosed}
        </motion.p>
      )}
    </div>
  );
}
