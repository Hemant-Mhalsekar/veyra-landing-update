import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../constants/translations";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const LangContext = createContext(null);

// ---------------------------------------------------------------------------
// Auto-detect helper
// ---------------------------------------------------------------------------

function detectLang() {
  // 1. Browser language preference
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  if (browserLang.startsWith("ar")) return "ar";

  // 2. Timezone fallback
  const arabicTimezones = new Set([
    "Asia/Kuwait",
    "Asia/Riyadh",
    "Asia/Dubai",
    "Asia/Qatar",
    "Asia/Bahrain",
    "Asia/Muscat",
  ]);
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (arabicTimezones.has(tz)) return "ar";
  } catch {
    // Intl not available — fall through
  }

  return "en";
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => detectLang());

  // Apply DOM side-effects whenever lang changes
  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.body.classList.toggle("rtl", lang === "ar");
  }, [lang]);

  function toggleLang() {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Custom hook
// ---------------------------------------------------------------------------

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  const { lang, toggleLang } = context;
  const t     = translations[lang];
  const isRTL = lang === "ar";
  return { lang, toggleLang, t, isRTL };
}
