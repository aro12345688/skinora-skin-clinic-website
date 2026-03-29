export const SKIN_SERVICES = [
  { icon: '⚡', name: 'LuminAir Therapy', desc: 'Non-invasive ionised-air treatment for skin rejuvenation, tightening, and resurfacing without surgery.', image: '/01-luminair-therapy.jpeg' },
  { icon: '❄️', name: 'Cryo Plasma Therapy', desc: 'Cold plasma technology to calm inflammation, reduce redness, and accelerate skin healing.', image: '/02-cryo-plasma-therapy.jpeg' },
  { icon: '✨', name: 'Anti-Melasma Treatment', desc: 'Advanced protocol targeting pigmentation and dark spots for a visibly even, luminous complexion.', image: '/03-anti-melasma-treatment.jpeg' },
  { icon: '🌿', name: 'Anti-Sensitivity Treatment', desc: 'Gentle therapy to restore the skin barrier, reduce reactivity, and soothe sensitive skin.', image: '/04-anti-sensitivity-treatment.jpeg' },
  { icon: '👁️', name: 'Under Eye Brightening', desc: 'Targeted brightening treatment to reduce dark circles, puffiness, and fine lines around the eyes.', image: '/05-under-eye-brightening.jpeg' },
  { icon: '💫', name: 'Instant Glow Hybrid Treatment', desc: 'A signature multi-step glow treatment combining actives and light therapy for immediate radiance.', image: '/06-instant-glow-hybrid.jpeg' },
  { icon: '🎯', name: 'BB Glow', desc: 'Semi-permanent foundation treatment that gives a naturally flawless, airbrushed complexion.', image: '/12-bb-glow.jpeg' },
  { icon: '🔥', name: 'Plasma Skin Tightening', desc: 'Plasma energy used to tighten lax skin and smooth fine lines with precision and minimal downtime.', image: '/14-plasma-skin-tightening.jpeg' },
  { icon: '🌸', name: 'Hollywood Hair Reduction', desc: 'Premium long-lasting hair reduction treatment for silky, smooth skin using advanced technology.', image: '/15-hollywood-hair-reduction.jpeg' },
]

export const BEAUTY_SERVICES = [
  { icon: '🖌️', name: 'Eyebrow Tinting', desc: 'Professionally tinted brows to enhance shape, definition, and fullness — perfectly framing your face.', image: '/07-eyebrow-tinting.jpeg' },
  { icon: '💋', name: 'Lip Shading', desc: 'Expert lip shading to add dimension, correct asymmetry, and create a naturally fuller look.', image: '/08-lip-shading.jpeg' },
  { icon: '👁️', name: 'Lashes Extension', desc: 'Luxurious lash extensions applied strand by strand for dramatic, long-lasting fullness and curl.', image: '/09-lashes-extension.jpeg' },
  { icon: '✏️', name: 'Micro Blading | Micro Shading', desc: 'Hair-stroke or powder brow technique for beautifully realistic, semi-permanent eyebrows.', image: '/10-microblading.jpeg' },
  { icon: '🌊', name: 'Eyebrow Laminating', desc: 'Brow lamination for a sleek, brushed-up, perfectly groomed finish that lasts weeks.', image: '/11-eyebrow-laminating.jpeg' },
  { icon: '🎀', name: 'Lip Pigmentation', desc: 'Semi-permanent lip colour correction and enhancement for naturally beautiful, defined lips every day.', image: '/13-lip-pigmentation.jpeg' },
]

/** Flat list of all service names for dropdowns */
export const ALL_SERVICE_NAMES = [
  ...SKIN_SERVICES.map(s => s.name),
  ...BEAUTY_SERVICES.map(s => s.name),
]
