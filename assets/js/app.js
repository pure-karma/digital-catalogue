// ── Contact info – edit these to update the Contact page ──────────────────
const CONTACT = {
  persons: [
    { name: "Krish Dhorda",  phone: "+971-585586755" },
    { name: "Nirav Mehta",   phone: "+971-585871151" },
  ],
  officePhone: "+971 04 336 7677",
  address: "Pure Karma Jewellery LLC, Office No. 405, Al Buteen Building 2, Near Gate 1, Gold Souk, Deira, Dubai"
};

// ── Catalogue data (ported from PHP catalog.php) ──────────────────────────
const CATEGORIES = [
  { name: "Rings",              tone: 34,  grams: ["Short", "Medium"],        styles: ["Lotus Crown", "Royal Band", "Halo Bloom", "Temple Curve", "Classic Solitaire", "Pearl Studded"] },
  { name: "Earrings",           tone: 8,   grams: ["Short", "Medium"],        styles: ["Jhumka Drop", "Pearl Stud", "Chandbali Arc", "Floral Hoop", "Temple Dangler", "Royal Tops"] },
  { name: "Necklaces",          tone: 154, grams: ["Medium", "Long"],         styles: ["Heritage Collar", "Layered Vine", "Bridal Cascade", "Coin Line", "Antique Choker", "Lakshmi Haar"] },
  { name: "Bangles & Bracelets",tone: 214, grams: ["Medium", "Long"],         styles: ["Royal Kada", "Temple Bangle", "Floral Bracelet", "Diamond Cut", "Pearl Bangle", "Antique Kada"] },
  { name: "Pendants",           tone: 282, grams: ["Short", "Medium", "Long"],styles: ["Om Medallion", "Heart Leaf", "Diamond Frame", "Minimal Bar", "Temple Drop", "Pearl Charm"] },
  { name: "Chains",             tone: 188, grams: ["Short", "Medium", "Long"],styles: ["Rope Chain", "Box Chain", "Figaro Line", "Bead Link", "Snake Chain", "Curb Chain"] },
  { name: "Mangalsutras",       tone: 326, grams: ["Medium", "Long"],         styles: ["Black Bead Classic", "Twin Vati", "Modern Drop", "Temple Bead", "Floral Vati", "Pearl Line"] },
  { name: "Nose Pins",          tone: 46,  grams: ["Short"],                  styles: ["Tiny Floral", "Single Stone", "Crescent Dot", "Leaf Spark", "Round Stud", "Star Pin"] },
  { name: "Anklets",            tone: 104, grams: ["Short", "Medium"],        styles: ["Ghungroo Line", "Charm Trail", "Silver Wave", "Bead Border", "Leaf Chain", "Classic Payal"] },
];

function slugValue(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildCatalog() {
  const products = [];
  CATEGORIES.forEach((category, categoryIndex) => {
    category.grams.forEach((grams, gramIndex) => {
      category.styles.forEach((style, styleIndex) => {
        const imageNumber = styleIndex + 1;
        const id = slugValue(category.name) + "-" + slugValue(grams) + "-" + imageNumber;
        const ci = String(categoryIndex + 1).padStart(2, "0");
        const gi = String(gramIndex + 1).padStart(2, "0");
        const si = String(imageNumber).padStart(2, "0");
        products.push({
          id,
          name: style + " " + category.name,
          style,
          category: category.name,
          grams,
          imageTag: `IMG-${ci}-${gi}-${si}`,
          sku: `JW-${ci}${gi}${si}`,
          hue: (category.tone + gramIndex * 24 + styleIndex * 13) % 360,
        });
      });
    });
  });
  return products;
}

// ── SVG product art (ported from PHP product-art.php) ─────────────────────
function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function productVisual(category, design) {
  const sparkle = '<circle cx="-128" cy="-88" r="10" fill="#fff7c9"/><circle cx="126" cy="-72" r="8" fill="#fff7c9"/><path d="M0-168l8 18 18 8-18 8-8 18-8-18-18-8 18-8z" fill="#fff1a6"/>';
  const bead = (design.length % 4) * 12;
  const common = 'filter="url(#shadow)" stroke-linecap="round" stroke-linejoin="round"';

  const shapes = {
    "Rings": `<g transform="translate(450 330)" ${common}><circle r="135" fill="none" stroke="url(#gold)" stroke-width="34"/><circle r="88" fill="none" stroke="#fff4b7" stroke-width="10"/><path d="M-62-112l62-78 62 78-62 54z" fill="url(#gold)" stroke="#9a6807" stroke-width="3"/><circle cy="-116" r="28" fill="#fff7c9"/>${sparkle}</g>`,
    "Earrings": `<g transform="translate(450 320)" ${common}><g transform="translate(-105 0)"><path d="M0-125c52 64 82 112 82 164a82 82 0 0 1-164 0c0-52 30-100 82-164z" fill="url(#gold)"/><circle cy="34" r="${24 + bead / 4}" fill="#fff7c9"/></g><g transform="translate(105 0)"><path d="M0-125c52 64 82 112 82 164a82 82 0 0 1-164 0c0-52 30-100 82-164z" fill="url(#gold)"/><circle cy="34" r="${24 + bead / 4}" fill="#fff7c9"/></g>${sparkle}</g>`,
    "Necklaces": `<g transform="translate(450 330)" ${common}><path d="M-190-65C-142 80-54 155 0 155S142 80 190-65" fill="none" stroke="url(#gold)" stroke-width="34"/><path d="M-132-40C-96 56-34 104 0 104S96 56 132-40" fill="none" stroke="#fff4b7" stroke-width="9"/><circle cy="156" r="40" fill="url(#gold)"/><path d="M-34 192L0 246L34 192z" fill="url(#gold)"/><circle cx="-104" cy="62" r="13" fill="#fff7c9"/><circle cx="104" cy="62" r="13" fill="#fff7c9"/>${sparkle}</g>`,
    "Bangles & Bracelets": `<g transform="translate(450 340)" ${common}><ellipse rx="210" ry="92" fill="none" stroke="url(#gold)" stroke-width="34"/><ellipse rx="145" ry="52" fill="none" stroke="#fff4b7" stroke-width="10"/><circle cx="${80 + bead}" cy="0" r="28" fill="#fff7c9" stroke="#9a6807" stroke-width="7"/>${sparkle}</g>`,
    "Pendants": `<g transform="translate(450 330)" ${common}><path d="M0-185v130" stroke="url(#gold)" stroke-width="22"/><path d="M-102-52L0 168 102-52C66-118-66-118-102-52z" fill="url(#gold)"/><circle cy="-20" r="${34 + bead / 3}" fill="#fff7c9"/><path d="M-42 68h84M-28 112h56" stroke="#fff4b7" stroke-width="10"/>${sparkle}</g>`,
    "Chains": `<g transform="translate(450 330)" ${common}><g fill="none" stroke="url(#gold)" stroke-width="30"><path d="M-180 20l92-92a70 70 0 0 1 99 99l-92 92"/><path d="M80-120l92-92a70 70 0 0 1 99 99l-92 92" transform="translate(-80 170)"/></g><path d="M-78 78L78-78" stroke="#fff4b7" stroke-width="12"/>${sparkle}</g>`,
    "Mangalsutras": `<g transform="translate(450 330)" ${common}><path d="M-190-75C-140 74-58 154 0 154S140 74 190-75" fill="none" stroke="url(#gold)" stroke-width="28"/><path d="M-146-30h292" stroke="#24190f" stroke-width="11" stroke-dasharray="2 28"/><circle cx="-35" cy="155" r="36" fill="url(#gold)"/><circle cx="35" cy="155" r="36" fill="url(#gold)"/><circle cx="-35" cy="155" r="18" fill="#fff7c9"/><circle cx="35" cy="155" r="18" fill="#fff7c9"/>${sparkle}</g>`,
    "Nose Pins": `<g transform="translate(450 330)" ${common}><path d="M90-20A120 120 0 1 1-20-135" fill="none" stroke="url(#gold)" stroke-width="32"/><circle cx="88" cy="-72" r="${38 + bead / 5}" fill="url(#gold)"/><circle cx="88" cy="-72" r="18" fill="#fff7c9"/><path d="M88-146v-42M88 2v42M14-72h-42M204-72h-42" stroke="#fff4b7" stroke-width="10"/>${sparkle}</g>`,
    "Anklets": `<g transform="translate(450 330)" ${common}><path d="M-220-12C-135 82 135 82 220-12" fill="none" stroke="url(#gold)" stroke-width="30"/><path d="M-155 42v82M-78 64v82M0 70v82M78 64v82M155 42v82" stroke="url(#gold)" stroke-width="15"/><circle cx="-155" cy="142" r="20" fill="#fff7c9"/><circle cx="-78" cy="164" r="18" fill="#fff7c9"/><circle cy="170" r="18" fill="#fff7c9"/><circle cx="78" cy="164" r="18" fill="#fff7c9"/><circle cx="155" cy="142" r="20" fill="#fff7c9"/>${sparkle}</g>`,
  };

  return shapes[category] || shapes["Necklaces"];
}

function productArtSvg(product) {
  const title = escapeXml(product.name);
  const desc = escapeXml(product.grams + " | " + product.imageTag);
  const visual = productVisual(product.category, product.style);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 720" role="img" aria-labelledby="title-${escapeXml(product.id)} desc-${escapeXml(product.id)}">
  <title id="title-${escapeXml(product.id)}">${title}</title>
  <desc id="desc-${escapeXml(product.id)}">${desc}</desc>
  <defs>
    <linearGradient id="bg-${escapeXml(product.id)}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fffdf8"/>
      <stop offset="100%" stop-color="#f7efe1"/>
    </linearGradient>
    <radialGradient id="gold" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#fff4a8"/>
      <stop offset="42%" stop-color="#d7a51f"/>
      <stop offset="100%" stop-color="#9a6807"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="18" flood-color="#725018" flood-opacity=".18"/>
    </filter>
  </defs>
  <rect width="900" height="720" fill="url(#bg-${escapeXml(product.id)})"/>
  <circle cx="160" cy="120" r="92" fill="#fff7d8" opacity=".72"/>
  <circle cx="772" cy="610" r="142" fill="#ead9ad" opacity=".5"/>
  <path d="M150 650C200 520 300 450 450 450s250 70 300 200" fill="#fffaf0" stroke="#eadfcf" stroke-width="4"/>
  ${visual}
</svg>`;
}

// ── Category images (Unsplash free stock — swap any URL with your own photo)
const categoryImages = {
  "Rings":               "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=220&h=220&fit=crop&q=80",
  "Earrings":            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60a6d?w=220&h=220&fit=crop&q=80",
  "Necklaces":           "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=220&h=220&fit=crop&q=80",
  "Bangles & Bracelets": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=220&h=220&fit=crop&q=80",
  "Pendants":            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=220&h=220&fit=crop&q=80",
  "Chains":              "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=220&h=220&fit=crop&q=80",
  "Mangalsutras":        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=220&h=220&fit=crop&q=80",
  "Nose Pins":           "https://images.unsplash.com/photo-1588444650733-d814c43b3abb?w=220&h=220&fit=crop&q=80",
  "Anklets":             "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=220&h=220&fit=crop&q=80",
};

// ── Category icons ─────────────────────────────────────────────────────────
const categoryIcons = {

  "Rings": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- band -->
    <path d="M17 38 C17 28 47 28 47 38" stroke="#fffaf0" stroke-width="2.4"/>
    <ellipse cx="32" cy="44" rx="15" ry="5.5" stroke="#fffaf0" stroke-width="2.4"/>
    <line x1="17" y1="38" x2="17" y2="44" stroke="#fffaf0" stroke-width="2.4"/>
    <line x1="47" y1="38" x2="47" y2="44" stroke="#fffaf0" stroke-width="2.4"/>
    <!-- prongs -->
    <line x1="26" y1="29" x2="26" y2="21" stroke="#fffaf0" stroke-width="1.8"/>
    <line x1="38" y1="29" x2="38" y2="21" stroke="#fffaf0" stroke-width="1.8"/>
    <!-- stone -->
    <path d="M24 19 L32 12 L40 19 L38 21 L26 21 Z" fill="rgba(255,250,240,.6)" stroke="#fffaf0" stroke-width="1.8"/>
    <line x1="24" y1="19" x2="40" y2="19" stroke="#fffaf0" stroke-width="1.2" opacity=".55"/>
    <line x1="32" y1="12" x2="28" y2="19" stroke="#fffaf0" stroke-width="1" opacity=".45"/>
    <line x1="32" y1="12" x2="36" y2="19" stroke="#fffaf0" stroke-width="1" opacity=".45"/>
  </svg>`,

  "Earrings": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- left jhumka -->
    <circle cx="20" cy="11" r="2.8" fill="#fffaf0" opacity=".9"/>
    <line x1="20" y1="14" x2="20" y2="19" stroke="#fffaf0" stroke-width="2.2"/>
    <path d="M12 25 C12 18 28 18 28 25 L25 37 Q23 43 20 45 Q17 43 15 37 Z" stroke="#fffaf0" stroke-width="2" fill="rgba(255,250,240,.18)"/>
    <line x1="14" y1="29" x2="26" y2="29" stroke="#fffaf0" stroke-width="1.2" opacity=".4"/>
    <circle cx="20" cy="47" r="3.5" fill="rgba(255,250,240,.7)" stroke="#fffaf0" stroke-width="1.8"/>
    <circle cx="20" cy="47" r="1.4" fill="#fffaf0" opacity=".9"/>
    <!-- right jhumka -->
    <circle cx="44" cy="11" r="2.8" fill="#fffaf0" opacity=".9"/>
    <line x1="44" y1="14" x2="44" y2="19" stroke="#fffaf0" stroke-width="2.2"/>
    <path d="M36 25 C36 18 52 18 52 25 L49 37 Q47 43 44 45 Q41 43 39 37 Z" stroke="#fffaf0" stroke-width="2" fill="rgba(255,250,240,.18)"/>
    <line x1="38" y1="29" x2="50" y2="29" stroke="#fffaf0" stroke-width="1.2" opacity=".4"/>
    <circle cx="44" cy="47" r="3.5" fill="rgba(255,250,240,.7)" stroke="#fffaf0" stroke-width="1.8"/>
    <circle cx="44" cy="47" r="1.4" fill="#fffaf0" opacity=".9"/>
  </svg>`,

  "Necklaces": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- chain arc -->
    <path d="M10 16 Q10 46 32 50 Q54 46 54 16" stroke="#fffaf0" stroke-width="2.2"/>
    <circle cx="10" cy="16" r="2.2" fill="#fffaf0" opacity=".7"/>
    <circle cx="54" cy="16" r="2.2" fill="#fffaf0" opacity=".7"/>
    <!-- chain beads -->
    <circle cx="19" cy="33" r="1.6" fill="#fffaf0" opacity=".55"/>
    <circle cx="45" cy="33" r="1.6" fill="#fffaf0" opacity=".55"/>
    <circle cx="14" cy="25" r="1.6" fill="#fffaf0" opacity=".45"/>
    <circle cx="50" cy="25" r="1.6" fill="#fffaf0" opacity=".45"/>
    <!-- pendant -->
    <path d="M32 50 L32 53" stroke="#fffaf0" stroke-width="2"/>
    <path d="M25 53 L32 63 L39 53 Z" stroke="#fffaf0" stroke-width="2" fill="rgba(255,250,240,.5)"/>
    <line x1="25" y1="53" x2="39" y2="53" stroke="#fffaf0" stroke-width="1.4" opacity=".6"/>
    <line x1="28" y1="56" x2="32" y2="53" stroke="#fffaf0" stroke-width="1" opacity=".4"/>
    <line x1="36" y1="56" x2="32" y2="53" stroke="#fffaf0" stroke-width="1" opacity=".4"/>
  </svg>`,

  "Bangles & Bracelets": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- outer bangle -->
    <ellipse cx="32" cy="34" rx="21" ry="10" stroke="#fffaf0" stroke-width="4.5" opacity=".85"/>
    <!-- inner highlight line -->
    <ellipse cx="32" cy="34" rx="21" ry="10" stroke="#fffaf0" stroke-width="1" opacity=".3"/>
    <!-- inner ring -->
    <ellipse cx="32" cy="34" rx="14" ry="6" stroke="#fffaf0" stroke-width="1.2" opacity=".35"/>
    <!-- gem on right -->
    <circle cx="53" cy="34" r="4.5" fill="rgba(255,250,240,.65)" stroke="#fffaf0" stroke-width="2"/>
    <circle cx="53" cy="34" r="2" fill="#fffaf0" opacity=".85"/>
    <line x1="50.5" y1="31.5" x2="55.5" y2="36.5" stroke="#fffaf0" stroke-width="1" opacity=".45"/>
    <line x1="55.5" y1="31.5" x2="50.5" y2="36.5" stroke="#fffaf0" stroke-width="1" opacity=".45"/>
  </svg>`,

  "Pendants": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- bail loop -->
    <path d="M32 9 C27 9 27 16 32 16 C37 16 37 9 32 9 Z" stroke="#fffaf0" stroke-width="2"/>
    <!-- chain drop -->
    <line x1="32" y1="16" x2="32" y2="22" stroke="#fffaf0" stroke-width="2"/>
    <!-- diamond shape -->
    <path d="M32 22 L20 34 L32 56 L44 34 Z" stroke="#fffaf0" stroke-width="2.2" fill="rgba(255,250,240,.2)"/>
    <!-- facets -->
    <line x1="20" y1="34" x2="44" y2="34" stroke="#fffaf0" stroke-width="1.4" opacity=".6"/>
    <line x1="32" y1="22" x2="25" y2="30" stroke="#fffaf0" stroke-width="1" opacity=".4"/>
    <line x1="32" y1="22" x2="39" y2="30" stroke="#fffaf0" stroke-width="1" opacity=".4"/>
    <line x1="24" y1="38" x2="32" y2="56" stroke="#fffaf0" stroke-width="1" opacity=".35"/>
    <line x1="40" y1="38" x2="32" y2="56" stroke="#fffaf0" stroke-width="1" opacity=".35"/>
  </svg>`,

  "Chains": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- interlocking oval links -->
    <ellipse cx="18" cy="18" rx="10" ry="5" transform="rotate(-40 18 18)" stroke="#fffaf0" stroke-width="2.5"/>
    <ellipse cx="30" cy="26" rx="10" ry="5" transform="rotate(-40 30 26)" stroke="#fffaf0" stroke-width="2.5"/>
    <ellipse cx="42" cy="34" rx="10" ry="5" transform="rotate(-40 42 34)" stroke="#fffaf0" stroke-width="2.5"/>
    <ellipse cx="30" cy="44" rx="10" ry="5" transform="rotate(-40 30 44)" stroke="#fffaf0" stroke-width="2.5"/>
    <!-- connector lines -->
    <line x1="24" y1="22" x2="26" y2="24" stroke="#fffaf0" stroke-width="1.5" opacity=".5"/>
    <line x1="36" y1="30" x2="38" y2="32" stroke="#fffaf0" stroke-width="1.5" opacity=".5"/>
  </svg>`,

  "Mangalsutras": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- clasp at top -->
    <path d="M22 12 Q32 7 42 12" stroke="#fffaf0" stroke-width="2.2"/>
    <!-- two bead strings -->
    <path d="M22 12 Q16 30 22 48" stroke="#fffaf0" stroke-width="1.8" stroke-dasharray="3 4"/>
    <path d="M42 12 Q48 30 42 48" stroke="#fffaf0" stroke-width="1.8" stroke-dasharray="3 4"/>
    <!-- vati (pendant) left -->
    <circle cx="25" cy="49" r="5.5" stroke="#fffaf0" stroke-width="2" fill="rgba(255,250,240,.25)"/>
    <circle cx="25" cy="49" r="2.2" fill="#fffaf0" opacity=".75"/>
    <!-- vati right -->
    <circle cx="39" cy="49" r="5.5" stroke="#fffaf0" stroke-width="2" fill="rgba(255,250,240,.25)"/>
    <circle cx="39" cy="49" r="2.2" fill="#fffaf0" opacity=".75"/>
    <!-- connecting link -->
    <line x1="30.5" y1="49" x2="33.5" y2="49" stroke="#fffaf0" stroke-width="2"/>
  </svg>`,

  "Nose Pins": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- nose ring arc (almost full circle) -->
    <path d="M47 33 A17 17 0 1 1 33 16" stroke="#fffaf0" stroke-width="3.2"/>
    <!-- stone cluster at end -->
    <circle cx="33" cy="16" r="6" fill="rgba(255,250,240,.6)" stroke="#fffaf0" stroke-width="2.2"/>
    <circle cx="33" cy="16" r="2.5" fill="#fffaf0" opacity=".9"/>
    <!-- sparkle lines -->
    <line x1="33" y1="8" x2="33" y2="11" stroke="#fffaf0" stroke-width="1.5" opacity=".6"/>
    <line x1="39" y1="10" x2="37" y2="12" stroke="#fffaf0" stroke-width="1.5" opacity=".6"/>
    <line x1="27" y1="10" x2="29" y2="12" stroke="#fffaf0" stroke-width="1.5" opacity=".6"/>
    <!-- pin end curl -->
    <path d="M47 33 Q52 30 50 26" stroke="#fffaf0" stroke-width="2.5"/>
  </svg>`,

  "Anklets": `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
    <!-- main chain arc -->
    <path d="M9 28 Q9 14 32 12 Q55 14 55 28" stroke="#fffaf0" stroke-width="2.4"/>
    <!-- hanging chains -->
    <line x1="16" y1="25" x2="16" y2="35" stroke="#fffaf0" stroke-width="1.8"/>
    <line x1="24" y1="18" x2="24" y2="29" stroke="#fffaf0" stroke-width="1.8"/>
    <line x1="32" y1="15" x2="32" y2="26" stroke="#fffaf0" stroke-width="1.8"/>
    <line x1="40" y1="18" x2="40" y2="29" stroke="#fffaf0" stroke-width="1.8"/>
    <line x1="48" y1="25" x2="48" y2="35" stroke="#fffaf0" stroke-width="1.8"/>
    <!-- bells (ghungroo) -->
    <path d="M13 35 Q13 42 16 42 Q19 42 19 35 Z" stroke="#fffaf0" stroke-width="1.8" fill="rgba(255,250,240,.28)"/>
    <line x1="13" y1="35" x2="19" y2="35" stroke="#fffaf0" stroke-width="1.4"/>
    <path d="M21 29 Q21 36 24 36 Q27 36 27 29 Z" stroke="#fffaf0" stroke-width="1.8" fill="rgba(255,250,240,.28)"/>
    <line x1="21" y1="29" x2="27" y2="29" stroke="#fffaf0" stroke-width="1.4"/>
    <path d="M29 26 Q29 33 32 33 Q35 33 35 26 Z" stroke="#fffaf0" stroke-width="1.8" fill="rgba(255,250,240,.28)"/>
    <line x1="29" y1="26" x2="35" y2="26" stroke="#fffaf0" stroke-width="1.4"/>
    <path d="M37 29 Q37 36 40 36 Q43 36 43 29 Z" stroke="#fffaf0" stroke-width="1.8" fill="rgba(255,250,240,.28)"/>
    <line x1="37" y1="29" x2="43" y2="29" stroke="#fffaf0" stroke-width="1.4"/>
    <path d="M45 35 Q45 42 48 42 Q51 42 51 35 Z" stroke="#fffaf0" stroke-width="1.8" fill="rgba(255,250,240,.28)"/>
    <line x1="45" y1="35" x2="51" y2="35" stroke="#fffaf0" stroke-width="1.4"/>
  </svg>`,
};

// ── App state ──────────────────────────────────────────────────────────────
const state = {
  products: buildCatalog(),
  activeCategory: "",
  activeGram: "",
};

// ── DOM refs ───────────────────────────────────────────────────────────────
const cataloguePage      = document.querySelector("#cataloguePage");
const contactPage        = document.querySelector("#contactPage");
const catalogueNavButton = document.querySelector("#catalogueNavButton");
const contactNavButton   = document.querySelector("#contactNavButton");
const categoryFilters    = document.querySelector("#categoryFilters");
const gramFilters        = document.querySelector("#gramFilters");
const productGrid        = document.querySelector("#productGrid");
const catalogTitle       = document.querySelector("#catalogTitle");

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  renderContact();
  renderFilters();
  renderProducts();

  catalogueNavButton.addEventListener("click", () => showPage("catalogue"));
  contactNavButton.addEventListener("click", () => showPage("contact"));
}

// ── Page switching ─────────────────────────────────────────────────────────
function showPage(page) {
  const isCatalogue = page === "catalogue";
  cataloguePage.hidden = !isCatalogue;
  contactPage.hidden = isCatalogue;
  catalogueNavButton.classList.toggle("active", isCatalogue);
  contactNavButton.classList.toggle("active", !isCatalogue);
}

// ── Contact ────────────────────────────────────────────────────────────────
function renderContact() {
  const persons = document.querySelector("#contactPersons");
  if (persons) {
    persons.innerHTML = CONTACT.persons.map(p => `
      <article class="contact-card contact-person-card">
        <span>Contact</span>
        <strong>${escapeHtml(p.name)}</strong>
        <a class="contact-phone-link" href="tel:${escapeHtml(p.phone)}">${escapeHtml(p.phone)}</a>
      </article>
    `).join("");
  }
  const officeEl = document.querySelector("#contactOfficePhone");
  if (officeEl) officeEl.textContent = CONTACT.officePhone;
  const addrEl = document.querySelector("#contactAddress");
  if (addrEl) addrEl.textContent = CONTACT.address;
}

// ── Filters ────────────────────────────────────────────────────────────────
function renderFilters() {
  const categories = [...new Set(state.products.map(p => p.category))];
  const grams = state.activeCategory
    ? [...new Set(state.products.filter(p => p.category === state.activeCategory).map(p => p.grams))]
    : [];

  categoryFilters.innerHTML = categories.map(cat => `
    <button class="category-chip" type="button" data-value="${escapeHtml(cat)}" aria-pressed="${state.activeCategory === cat}">
      <span class="category-icon"><span class="category-label-inner">${escapeHtml(cat)}</span></span>
    </button>
  `).join("");

  gramFilters.innerHTML = grams.length
    ? grams.map(gram => `<button class="gram-chip" type="button" data-value="${escapeHtml(gram)}" aria-pressed="${state.activeGram === gram}">${escapeHtml(gram)}</button>`).join("")
    : `<div class="empty-filter-note">Select a category first.</div>`;

  categoryFilters.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.value;
      state.activeGram = "";
      renderFilters();
      renderProducts();
      scrollTo("subCategoryAnchor");
    });
  });

  gramFilters.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeGram = btn.dataset.value;
      renderFilters();
      renderProducts();
      scrollTo("productAnchor");
    });
  });
}

// ── Products ───────────────────────────────────────────────────────────────
function renderProducts() {
  const catalogArea = document.querySelector("#productAnchor");

  if (!state.activeCategory || !state.activeGram) {
    if (catalogArea) catalogArea.hidden = true;
    return;
  }

  if (catalogArea) catalogArea.hidden = false;

  const products = state.products.filter(p => p.category === state.activeCategory && p.grams === state.activeGram);
  catalogTitle.textContent = `${state.activeCategory} | ${state.activeGram}`;

  if (products.length === 0) {
    productGrid.innerHTML = `<div class="empty-state">No products match these filters.</div>`;
    return;
  }

  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-img">${productArtSvg(product)}</div>
      <div class="product-body">
        <div class="product-meta">
          <span>${escapeHtml(product.sku)}</span>
          <span>${escapeHtml(product.imageTag)}</span>
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="grams">${escapeHtml(product.grams)}</div>
      </div>
    </article>
  `).join("");
}

// ── Helpers ────────────────────────────────────────────────────────────────
function scrollTo(id) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();
