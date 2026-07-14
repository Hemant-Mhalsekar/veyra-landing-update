import { API_URL } from "../constants/translations";

/**
 * Submits an email address to the waitlist.
 * Uses no-cors mode — no response body is available, which is expected.
 *
 * @param {string} email
 * @returns {Promise<Response>}
 */
export function submitEmail(email) {
  return fetch(API_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    mode:    "no-cors",
    body:    JSON.stringify({ email }),
  });
}

/**
 * Submits a name and phone number (with country code) to the waitlist.
 * Uses no-cors mode — no response body is available, which is expected.
 *
 * @param {string} name
 * @param {string} countryCode - E.g. "+965"
 * @param {string} phone       - Digits only, no country code
 * @returns {Promise<Response>}
 */
export function submitPhone(name, countryCode, phone) {
  return fetch(API_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    mode:    "no-cors",
    body:    JSON.stringify({ name, phone: countryCode + phone }),
  });
}
