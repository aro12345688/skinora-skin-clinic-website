export const SKIN_SERVICES = [
  { icon: '⚡', name: 'Jet Plasma Therapy', desc: 'Non-invasive plasma treatment for skin rejuvenation, tightening, and resurfacing without surgery.' },
  { icon: '❄️', name: 'Cryo Plasma Therapy', desc: 'Cold plasma technology to calm inflammation, reduce redness, and accelerate skin healing.' },
  { icon: '✨', name: 'Anti-Melasma Treatment', desc: 'Advanced protocol targeting pigmentation and dark spots for a visibly even, luminous complexion.' },
  { icon: '🌿', name: 'Anti-Sensitivity Treatment', desc: 'Gentle therapy to restore the skin barrier, reduce reactivity, and soothe sensitive skin.' },
  { icon: '👁️', name: 'Under Eye Brightening', desc: 'Targeted brightening treatment to reduce dark circles, puffiness, and fine lines around the eyes.' },
  { icon: '💫', name: 'Instant Glow Hybrid Treatment', desc: 'A signature multi-step glow treatment combining actives and light therapy for immediate radiance.' },
  { icon: '🎯', name: 'BB Glow', desc: 'Semi-permanent foundation treatment that gives a naturally flawless, airbrushed complexion.' },
  { icon: '🔥', name: 'Plasma Skin Tightening', desc: 'Plasma energy used to tighten lax skin and smooth fine lines with precision and minimal downtime.' },
  { icon: '🌸', name: 'Hollywood Hair Reduction', desc: 'Premium long-lasting hair reduction treatment for silky, smooth skin using advanced technology.' },
]

export const BEAUTY_SERVICES = [
  { icon: '🖌️', name: 'Eyebrow Tinting', desc: 'Professionally tinted brows to enhance shape, definition, and fullness — perfectly framing your face.' },
  { icon: '💋', name: 'Lip Shading', desc: 'Expert lip shading to add dimension, correct asymmetry, and create a naturally fuller look.' },
  { icon: '👁️', name: 'Lashes Extension', desc: 'Luxurious lash extensions applied strand by strand for dramatic, long-lasting fullness and curl.' },
  { icon: '✏️', name: 'Micro Blading | Micro Shading', desc: 'Hair-stroke or powder brow technique for beautifully realistic, semi-permanent eyebrows.' },
  { icon: '🌊', name: 'Eyebrow Laminating', desc: 'Brow lamination for a sleek, brushed-up, perfectly groomed finish that lasts weeks.' },
  { icon: '🎀', name: 'Lip Pigmentation', desc: 'Semi-permanent lip colour correction and enhancement for naturally beautiful, defined lips every day.' },
]

/** Flat list of all service names for dropdowns */
export const ALL_SERVICE_NAMES = [
  ...SKIN_SERVICES.map(s => s.name),
  ...BEAUTY_SERVICES.map(s => s.name),
]
