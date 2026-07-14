import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../../context/LangContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { submitPhone } from "../../utils/api";
import CountrySelector from "../shared/CountrySelector";

// ---------------------------------------------------------------------------
// Shared animation variants
// ---------------------------------------------------------------------------
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1,   y: 0  },
  exit:    { opacity: 0, scale: 0.95, y: 10 },
};

const cardTransition = { type: "spring", stiffness: 300, damping: 25 };

// ---------------------------------------------------------------------------
// Shared field styles
// ---------------------------------------------------------------------------
const inputStyle = (hasError, isRTL) => ({
  width:       "100%",
  boxSizing:   "border-box",
  height:      "48px",
  padding:     "0 1rem",
  background:  "rgba(255,255,255,0.07)",
  border:      `1px solid ${hasError ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.15)"}`,
  borderRadius:"0.75rem",
  color:       "#fff",
  fontSize:    "0.9rem",
  outline:     "none",
  textAlign:   isRTL ? "right" : "left",
  direction:   isRTL ? "rtl"   : "ltr",
  transition:  "border-color 0.2s, box-shadow 0.2s",
});

const errorStyle = (isRTL) => ({
  marginTop:  "0.3rem",
  fontSize:   "0.78rem",
  color:      "#e07070",
  textAlign:  isRTL ? "right" : "left",
});

// ---------------------------------------------------------------------------
// WhatsAppModal
// ---------------------------------------------------------------------------
export default function WhatsAppModal({ isOpen, onClose, onSuccess }) {
  const { t, isRTL, lang }   = useLang();
  const { validateName, validatePhone } = useFormValidation();

  const [name,        setName]        = useState("");
  const [phone,       setPhone]       = useState("");
  const [countryCode, setCountryCode] = useState("+965");
  const [nameError,   setNameError]   = useState("");
  const [phoneError,  setPhoneError]  = useState("");
  const [isSubmitting,setIsSubmitting]= useState(false);
  const [attempted,   setAttempted]   = useState(false);

  function resetForm() {
    setName("");  setPhone("");  setCountryCode("+965");
    setNameError(""); setPhoneError(""); setAttempted(false);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    if (attempted) setNameError(validateName(e.target.value, lang).error);
  }

  function handlePhoneChange(e) {
    const val = e.target.value.replace(/\D/g, "");
    setPhone(val);
    if (attempted) setPhoneError(validatePhone(val, countryCode, lang).error);
  }

  async function handleSubmit() {
    setAttempted(true);
    const nv = validateName(name, lang);
    const pv = validatePhone(phone, countryCode, lang);
    setNameError(nv.error);
    setPhoneError(pv.error);
    if (!nv.valid || !pv.valid) return;

    setIsSubmitting(true);
    try {
      await submitPhone(name.trim(), countryCode, phone);
      resetForm();
      onSuccess?.();
      onClose?.();
    } catch {
      // surface error silently — parent handles dialogs
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) { resetForm(); onClose(); } }}
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          10000,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            padding:         "1.5rem",
            backdropFilter:  "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.75)",
          }}
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={cardTransition}
            style={{
              position:        "relative",
              width:           "100%",
              maxWidth:        "420px",
              background:      "#0a3d2f",
              borderRadius:    "18px",
              border:          "1px solid rgba(255,255,255,0.10)",
              padding:         "2rem 1.75rem",
              color:           "#fff",
              direction:       isRTL ? "rtl" : "ltr",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => { resetForm(); onClose(); }}
              aria-label="Close"
              style={{
                position:   "absolute",
                top:        "1rem",
                [isRTL ? "left" : "right"]: "1rem",
                background: "rgba(255,255,255,0.08)",
                border:     "none",
                borderRadius:"50%",
                width:      "32px",
                height:     "32px",
                color:      "rgba(255,255,255,0.7)",
                fontSize:   "1.1rem",
                lineHeight: 1,
                cursor:     "pointer",
                display:    "flex",
                alignItems: "center",
                justifyContent:"center",
              }}
            >
              ×
            </button>

            {/* Heading */}
            <h2
              style={{
                margin:        "0 0 0.5rem",
                fontSize:      "1.35rem",
                fontWeight:    800,
                letterSpacing: "-0.02em",
                textAlign:     isRTL ? "right" : "left",
                paddingInlineEnd: "2rem",
              }}
            >
              {t.whatsappTitle}
            </h2>

            {/* Description */}
            <p
              style={{
                margin:     "0 0 1.5rem",
                fontSize:   "0.88rem",
                lineHeight: 1.6,
                color:      "rgba(255,255,255,0.65)",
                textAlign:  isRTL ? "right" : "left",
              }}
            >
              {t.whatsappDesc}
            </p>

            {/* Name field */}
            <div style={{ marginBottom: "0.85rem" }}>
              <input
                id="wa-name"
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={handleNameChange}
                autoComplete="name"
                style={inputStyle(!!nameError, isRTL)}
                onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(214,192,111,0.18)"; e.target.style.borderColor = "rgba(214,192,111,0.5)"; }}
                onBlur={(e)  => { e.target.style.boxShadow = "none"; e.target.style.borderColor = nameError ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.15)"; }}
              />
              {nameError && <p style={errorStyle(isRTL)}>{nameError}</p>}
            </div>

            {/* Phone row */}
            <div style={{ marginBottom: "0.85rem" }}>
              <div
                style={{
                  display:       "flex",
                  gap:           "0.5rem",
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                <CountrySelector
                  value={countryCode}
                  onChange={setCountryCode}
                />
                <input
                  id="wa-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={handlePhoneChange}
                  autoComplete="tel-national"
                  style={{ ...inputStyle(!!phoneError, isRTL), flex: 1 }}
                  onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(214,192,111,0.18)"; e.target.style.borderColor = "rgba(214,192,111,0.5)"; }}
                  onBlur={(e)  => { e.target.style.boxShadow = "none"; e.target.style.borderColor = phoneError ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.15)"; }}
                />
              </div>
              {phoneError && <p style={errorStyle(isRTL)}>{phoneError}</p>}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{   scale: isSubmitting ? 1 : 0.97 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width:         "100%",
                height:        "50px",
                background:    isSubmitting
                                 ? "rgba(214,192,111,0.5)"
                                 : "linear-gradient(135deg, #d6c06f, #bfa24a)",
                border:        "none",
                borderRadius:  "0.85rem",
                color:         "#0a1a10",
                fontSize:      "0.95rem",
                fontWeight:    700,
                letterSpacing: "0.02em",
                cursor:        isSubmitting ? "not-allowed" : "pointer",
                opacity:       isSubmitting ? 0.7 : 1,
                transition:    "opacity 0.2s, background 0.2s",
                marginBottom:  "0.85rem",
              }}
            >
              {isSubmitting ? "…" : t.cta}
            </motion.button>

            {/* Form note */}
            <p
              style={{
                margin:    0,
                fontSize:  "0.75rem",
                color:     "rgba(255,255,255,0.35)",
                textAlign: "center",
              }}
            >
              {t.formNote}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
