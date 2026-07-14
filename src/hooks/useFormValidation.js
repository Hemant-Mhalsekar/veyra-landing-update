import { errorTexts, PHONE_RULES } from "../constants/translations";

// ---------------------------------------------------------------------------
// Shared regex
// ---------------------------------------------------------------------------

export const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

/**
 * Validates a name field.
 * @param {string} value
 * @param {"en"|"ar"} lang
 * @returns {{ valid: boolean, error: string }}
 */
function validateName(value, lang) {
  const e = errorTexts[lang] ?? errorTexts.en;
  const trimmed = (value ?? "").trim();

  if (!trimmed)           return { valid: false, error: e.nameRequired };
  if (trimmed.length < 2) return { valid: false, error: e.nameShort    };

  return { valid: true, error: "" };
}

/**
 * Validates an email address.
 * @param {string} value
 * @param {"en"|"ar"} lang
 * @returns {{ valid: boolean, error: string }}
 */
function validateEmail(value, lang) {
  const e = errorTexts[lang] ?? errorTexts.en;
  const trimmed = (value ?? "").trim();

  if (!trimmed)                    return { valid: false, error: e.emailRequired };
  if (!isValidEmail.test(trimmed)) return { valid: false, error: e.emailInvalid  };

  return { valid: true, error: "" };
}

/**
 * Validates a phone number against the selected country code rules.
 * @param {string} value       - Digits-only phone number (no country code).
 * @param {string} countryCode - E.g. "+965", "+91", "+971".
 * @param {"en"|"ar"} lang
 * @returns {{ valid: boolean, error: string }}
 */
function validatePhone(value, countryCode, lang) {
  const e = errorTexts[lang] ?? errorTexts.en;
  const trimmed = (value ?? "").trim();

  if (!trimmed) return { valid: false, error: e.phoneRequired };
  if (!/^\d+$/.test(trimmed)) return { valid: false, error: e.phoneDigitsOnly };

  const rule = PHONE_RULES[countryCode];

  if (rule) {
    const { min, max, msgKey } = rule;
    if (trimmed.length < min || trimmed.length > max) {
      return { valid: false, error: e[msgKey] };
    }
  } else {
    // Generic fallback: 7–15 digits
    if (trimmed.length < 7 || trimmed.length > 15) {
      return { valid: false, error: e.phoneGeneric };
    }
  }

  return { valid: true, error: "" };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns pure validation functions. No internal state — safe to call on every
 * render without side effects.
 *
 * @returns {{ validateName, validateEmail, validatePhone }}
 */
export function useFormValidation() {
  return { validateName, validateEmail, validatePhone };
}
