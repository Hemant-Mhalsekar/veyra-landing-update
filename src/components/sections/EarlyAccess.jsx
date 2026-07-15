import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useFormValidation } from "../../hooks/useFormValidation";
import { submitEmail } from "../../utils/api";
import SuccessDialog from "../shared/SuccessDialog";
import ErrorDialog from "../shared/ErrorDialog";

// ---------------------------------------------------------------------------
// EarlyAccess
// ---------------------------------------------------------------------------
export default function EarlyAccess({ onOpenWhatsApp }) {
  const { t, isRTL, lang } = useLang();
  const { validateEmail }  = useFormValidation();

  // Form state
  const [email,       setEmail]       = useState("");
  const [emailError,  setEmailError]  = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError,   setShowError]   = useState(false);
  const [focused,     setFocused]     = useState(false);

  // Scroll reveal
  const sectionRef        = useRef(null);
  const { isVisible }     = useScrollReveal(sectionRef);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  function handleEmailChange(e) {
    const val = e.target.value;
    setEmail(val);
    if (emailError) {
      const { error } = validateEmail(val, lang);
      setEmailError(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { valid, error } = validateEmail(email, lang);
    if (!valid) {
      setEmailError(error);
      return;
    }
    setEmailError("");
    setSubmitting(true);
    try {
      await submitEmail(email.trim());
      setEmail("");
      setShowSuccess(true);
    } catch {
      setShowError(true);
    } finally {
      setSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Variants
  // ---------------------------------------------------------------------------
  const headingVariant = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const benefitContainerVariant = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const benefitItemVariant = {
    hidden:  { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const fadeInVariant = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const animState = isVisible ? "visible" : "hidden";

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <section
      ref={sectionRef}
      id="early-access"
      className="section-early"
      style={{
        padding:  "6rem 1.5rem 5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth:  "560px",
          margin:    "0 auto",
          textAlign: "center",
        }}
      >
        {/* ── Badge ── */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          animate={animState}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "0.35rem",
            padding:        "0.35rem 0.9rem",
            marginBottom:   "1rem",
            border:         "1px solid rgba(214,192,111,0.45)",
            borderRadius:   "999px",
            fontSize:       "0.78rem",
            fontWeight:     600,
            color:          "rgba(255,255,255,0.80)",
            background:     "rgba(214,192,111,0.07)",
            letterSpacing:  "0.03em",
          }}
        >
          🔒 Limited First Batch
        </motion.div>

        {/* ── 1. Heading ── */}
        <motion.h2
          variants={headingVariant}
          initial="hidden"
          animate={animState}
          style={{
            margin:        "0 0 2rem",
            fontSize:      "clamp(1.7rem, 3.5vw, 2.4rem)",
            fontWeight:    800,
            color:         "#fff",
            letterSpacing: "-0.02em",
            lineHeight:    1.2,
          }}
        >
          {t.earlyTitle}
        </motion.h2>

        {/* ── 2. Benefits list ── */}
        <motion.ul
          variants={benefitContainerVariant}
          initial="hidden"
          animate={animState}
          style={{
            listStyle:      "none",
            padding:        0,
            margin:         "0 0 2.25rem",
            display:        "flex",
            flexDirection:  "column",
            gap:            "0.8rem",
            alignItems:     "center",
          }}
        >
          {t.earlyBenefits.map((benefit, i) => (
            <motion.li
              key={i}
              variants={benefitItemVariant}
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "0.65rem",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink:      0,
                  width:           "20px",
                  height:          "20px",
                  borderRadius:    "50%",
                  background:      "linear-gradient(135deg, #d6c06f, #bfa24a)",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  fontSize:        "0.68rem",
                  color:           "#0a1a10",
                  fontWeight:      900,
                }}
              >
                ✔
              </span>
              <span
                style={{
                  fontSize:   "0.95rem",
                  fontWeight: 500,
                  color:      "rgba(255,255,255,0.85)",
                  textAlign:  isRTL ? "right" : "left",
                }}
              >
                {benefit}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── 3. WhatsApp CTA ── */}
        <motion.button
          variants={fadeInVariant}
          initial="hidden"
          animate={animState}
          onClick={onOpenWhatsApp}
          whileHover={{ scale: 1.03 }}
          whileTap={{   scale: 0.97 }}
          className="whatsapp-cta-btn"
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "0.6rem",
            width:          "100%",
            padding:        "1rem 1.5rem",
            background:     "linear-gradient(135deg, #1fba5a, #128C3B)",
            border:         "none",
            borderRadius:   "14px",
            color:          "#fff",
            fontSize:       "1rem",
            fontWeight:     700,
            letterSpacing:  "0.02em",
            cursor:         "pointer",
            marginBottom:   "1.75rem",
            animation:      isVisible ? "waEntrancePulse 0.8s ease 0.4s both" : "none",
          }}
        >
          <img
            src="/assets/whatsapp.png"
            alt=""
            aria-hidden
            style={{ width: "22px", height: "22px", objectFit: "contain" }}
          />
          {t.cta}
        </motion.button>

        {/* ── 4. Divider ── */}
        <div
          aria-hidden
          style={{
            height:       "1px",
            background:   "rgba(255,255,255,0.15)",
            margin:       "0 0 1.75rem",
          }}
        />

        {/* ── 5. Prefer email label ── */}
        <motion.p
          variants={fadeInVariant}
          initial="hidden"
          animate={animState}
          style={{
            margin:        "0 0 1rem",
            fontSize:      "0.88rem",
            fontWeight:    500,
            color:         "rgba(255,255,255,0.55)",
            letterSpacing: "0.02em",
          }}
        >
          {t.preferEmail}
        </motion.p>

        {/* ── 6. Email form ── */}
        <motion.form
          variants={fadeInVariant}
          initial="hidden"
          animate={animState}
          onSubmit={handleSubmit}
          noValidate
          style={{
            display:       "flex",
            gap:           "0.6rem",
            flexDirection: isRTL ? "row-reverse" : "row",
            marginBottom:  "0.5rem",
          }}
          className="email-form"
        >
          <div style={{ flex: 1, position: "relative" }}>
            <input
              id="early-access-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setFocused(true)}
              onBlur={()  => setFocused(false)}
              placeholder={t.emailPlaceholder}
              autoComplete="email"
              style={{
                width:           "100%",
                boxSizing:       "border-box",
                height:          "48px",
                padding:         "0 1rem",
                background:      "rgba(255,255,255,0.07)",
                border:          `1px solid ${
                  emailError
                    ? "rgba(220,80,80,0.7)"
                    : focused
                      ? "rgba(214,192,111,0.6)"
                      : isVisible
                        ? "rgba(255,255,255,0.20)"
                        : "rgba(255,255,255,0.00)"
                }`,
                borderRadius:    "0.75rem",
                color:           "#fff",
                fontSize:        "0.9rem",
                outline:         "none",
                transition:      "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow:       focused
                                   ? "0 0 0 3px rgba(214,192,111,0.18)"
                                   : "none",
                textAlign:       isRTL ? "right" : "left",
                direction:       isRTL ? "rtl" : "ltr",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              flexShrink:    0,
              height:        "48px",
              minWidth:      "180px",
              padding:       "0 1.2rem",
              background:    submitting
                               ? "rgba(214,192,111,0.5)"
                               : "linear-gradient(135deg, #d6c06f, #bfa24a)",
              border:        "none",
              borderRadius:  "0.75rem",
              color:         "#0a1a10",
              fontSize:      "0.88rem",
              fontWeight:    700,
              cursor:        submitting ? "not-allowed" : "pointer",
              whiteSpace:    "nowrap",
              transition:    "background 0.2s ease, opacity 0.2s ease",
              opacity:       submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "…" : "Get 10% Early Access →"}
          </button>
        </motion.form>

        {/* Inline error */}
        {emailError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin:    "0 0 0.5rem",
              fontSize:  "0.8rem",
              color:     "#e07070",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {emailError}
          </motion.p>
        )}

        {/* ── 7. Trust text ── */}
        <motion.p
          variants={fadeInVariant}
          initial="hidden"
          animate={animState}
          style={{
            margin:    "0.5rem 0 0",
            fontSize:  "0.75rem",
            color:     "rgba(255,255,255,0.35)",
            textAlign: "center",
          }}
        >
          {t.trustText}
        </motion.p>

        {/* Social proof line */}
        <motion.p
          variants={fadeInVariant}
          initial="hidden"
          animate={animState}
          style={{
            margin:    "0.5rem 0 0",
            fontSize:  "0.78rem",
            color:     "rgba(255,255,255,0.40)",
            textAlign: "center",
          }}
        >
          Already 500+ people waiting. Spots are limited.
        </motion.p>
      </div>

      {/* ── Dialogs ── */}
      <SuccessDialog isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog  isOpen={showError}   onClose={() => setShowError(false)}   />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes waEntrancePulse {
          0%   { box-shadow: 0 0 0   0px  rgba(37,211,102,0.0); }
          40%  { box-shadow: 0 0 0  16px  rgba(37,211,102,0.28); }
          100% { box-shadow: 0 0 0  20px  rgba(37,211,102,0.0); }
        }

        @media (max-width: 540px) {
          .email-form {
            flex-direction: column !important;
          }
          .email-form button {
            width:     100% !important;
            min-width: 0   !important;
          }
        }
      `}</style>
    </section>
  );
}
