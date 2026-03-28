/**
 * Normalise a phone number to a WhatsApp-compatible Indian number (e.g. "917519111234").
 * Returns empty string if input is blank — callers must guard the result before building URLs.
 * Strips non-digits, removes any leading +91 / 91 prefix, then prepends 91.
 */
export function toWaPhone(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  const local = digits.startsWith('91') && digits.length > 10 ? digits.slice(2) : digits
  return `91${local}`
}
