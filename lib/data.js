/* ZEPHRIDE — countries, products, per-country pricing */

/* Price group per supplier tariff. Selling price = cost × 1.75, rounded up to a clean …9. */
export const COUNTRIES = [
  { code: "de", name: "Germany",        g: 0 },
  { code: "fr", name: "France",         g: 2 },
  { code: "it", name: "Italy",          g: 5 },
  { code: "es", name: "Spain",          g: 3 },
  { code: "nl", name: "Netherlands",    g: 1 },
  { code: "be", name: "Belgium",        g: 1 },
  { code: "at", name: "Austria",        g: 2 },
  { code: "pl", name: "Poland",         g: 6 },
  { code: "ro", name: "Romania",        g: 4 },
  { code: "cz", name: "Czech Republic", g: 3 },
  { code: "dk", name: "Denmark",        g: 2 },
  { code: "se", name: "Sweden",         g: 4 },
  { code: "fi", name: "Finland",        g: 4 },
  { code: "ie", name: "Ireland",        g: 4 },
  { code: "gr", name: "Greece",         g: 4 },
  { code: "hu", name: "Hungary",        g: 4 },
  { code: "lu", name: "Luxembourg",     g: 1 },
  { code: "ee", name: "Estonia",        g: 4 },
  { code: "lv", name: "Latvia",         g: 4 },
  { code: "lt", name: "Lithuania",      g: 4 },
  { code: "si", name: "Slovenia",       g: 4 },
  { code: "li", name: "Liechtenstein",  g: 4 },
];

export const flagUrl = (code, size = 40) => `https://flagcdn.com/w${size}/${code}.png`;

/* prices[] indexes match the price groups:
   0 DE · 1 BE/LU/NL · 2 AT/DK/FR · 3 CZ/ES · 4 EE/FI/GR/HU/IE/LI/LT/LV/RO/SE/SI · 5 IT · 6 PL */
export const PRODUCTS = [
  {
    id: "x80pro", name: "X80 Pro", badge: "Best-seller",
    prices: [1209, 1209, 1229, 1249, 1249, 1249, 1229],
    images: ["/assets/images/products/x80pro/1.jpg", "/assets/images/products/x80pro/2.jpg", "/assets/images/products/x80pro/3.jpg", "/assets/images/products/x80pro/4.jpg", "/assets/images/products/x80pro/5.jpg"],
    tagline: "The all-rounder that does everything.",
    short: "250 W · 50–65 km · Find My + Alarm",
    pitch: "One bike for the commute, the trail and the weekend. Smart, tracked, ready for a second rider — the one we'd buy first.",
    highlights: ["Find My anti-loss tracking", "Throttle + front rack + rear seat", "Hydraulic disc brakes"],
    specs: { Motor: "48 V · 250 W", Battery: "48 V · 15 Ah", Range: "50–65 km", "Top speed": "25 km/h", Brakes: "Front & rear hydraulic disc", Tyres: "20 × 4.0 fat", Smart: "NFC · APP · Anti-loss (Find My) · Alarm", Extras: "Throttle, front rack, rear seat", Weight: "43 kg net · 51 kg gross", Certified: "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X80 Pro is our do-everything fat-tyre e-bike. A smooth 250 W drive, 50–65 km of range and full smart connectivity — NFC unlock, app control, Find My anti-loss and a built-in alarm. It ships with a throttle, front rack and rear seat, so it's ready for the commute, the trail or a second rider straight out of the box."
  },
  {
    id: "x90", name: "X90", badge: "",
    prices: [1209, 1209, 1229, 1249, 1249, 1249, 1229],
    images: ["/assets/images/products/x90/1.jpg", "/assets/images/products/x90/2.jpg", "/assets/images/products/x90/3.jpg", "/assets/images/products/x90/4.jpg", "/assets/images/products/x90/5.jpg"],
    tagline: "Same power, cleaner lines.",
    short: "250 W · 50–65 km · Find My + Alarm",
    pitch: "Everything the X80 Pro does, wrapped in a sleeker frame. For riders who want the power without the bulk.",
    highlights: ["Streamlined frame", "Find My + Alarm", "20×4.0 all-terrain"],
    specs: { Motor: "48 V · 250 W", Battery: "48 V · 15 Ah", Range: "50–65 km", "Top speed": "25 km/h", Brakes: "Front & rear hydraulic disc", Tyres: "20 × 4.0 fat", Smart: "NFC · APP · Anti-loss (Find My) · Alarm", Extras: "Throttle, front rack, rear seat", Weight: "43 kg net · 50 kg gross", Certified: "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X90 shares the X80 Pro's drivetrain and smart features in a slightly sleeker package. 250 W, 50–65 km range, hydraulic discs and full anti-loss tracking — a clean, confident all-terrain ride for the city and beyond."
  },
  {
    id: "x80ultra", name: "X80 Ultra", badge: "Most range",
    prices: [1259, 1259, 1279, 1299, 1299, 1299, 1279],
    images: ["/assets/images/products/x80ultra/1.jpg", "/assets/images/products/x80ultra/2.jpg", "/assets/images/products/x80ultra/3.jpg", "/assets/images/products/x80ultra/4.jpg", "/assets/images/products/x80ultra/5.jpg", "/assets/images/products/x80ultra/6.jpg"],
    tagline: "More power. More battery. TFT dash.",
    short: "250/500 W · 60–80 km · TFT display",
    pitch: "The endurance machine. An 18.2 Ah battery, up to 80 km on a charge and a full-colour TFT dash — built for riders who never want to turn back early.",
    highlights: ["Up to 500 W", "60–80 km range", "Full-colour TFT display"],
    specs: { Motor: "48 V · 250 / 500 W", Battery: "48 V · 18.2 Ah", Range: "60–80 km", "Top speed": "25 km/h", Display: "Full-colour TFT", Brakes: "Front & rear hydraulic disc", Tyres: "20 × 4.0 fat", Smart: "TFT · NFC · APP · Anti-loss (Find My) · Alarm", Weight: "43 kg net · 48.5 kg gross", Certified: "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X80 Ultra steps everything up: a bigger 18.2 Ah battery for 60–80 km of range, up to 500 W on tap and a crisp full-colour TFT dashboard. All the smart features of the Pro, with the endurance and punch for longer, wilder rides."
  },
  {
    id: "x70", name: "X70", badge: "Most power",
    prices: [1279, 1279, 1299, 1319, 1319, 1299, 1279],
    images: ["/assets/images/products/x70/1.jpg", "/assets/images/products/x70/2.jpg", "/assets/images/products/x70/3.jpg", "/assets/images/products/x70/4.jpg", "/assets/images/products/x70/5.jpg", "/assets/images/products/x70/6.jpg"],
    tagline: "Steel-framed, up to 750 W.",
    short: "250/500/750 W · steel frame · 50–60 km",
    pitch: "Reinforced steel and a motor that scales to 750 W. The X70 hauls, climbs and takes a beating — pure muscle on fat tyres.",
    highlights: ["Up to 750 W", "Heavy-duty steel frame", "Hydraulic brakes"],
    specs: { Motor: "48 V · 250 / 500 / 750 W", Battery: "48 V · 15.6 Ah", Range: "50–60 km", "Top speed": "25 km/h", Frame: "Reinforced steel", Brakes: "Front & rear hydraulic disc", Tyres: "20 × 4.0 fat", Weight: "43 kg net · 51 kg gross", Certified: "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X70 is the muscle of the range — a reinforced steel frame and a motor that scales up to 750 W. Built to haul, climb and take a beating, with hydraulic discs to rein it all in. For riders who want maximum grunt."
  },
  {
    id: "x50", name: "X50", badge: "",
    prices: [1299, 1279, 1299, 1319, 1319, 1249, 1319],
    images: ["/assets/images/products/x50/1.jpg", "/assets/images/products/x50/2.jpg", "/assets/images/products/x50/3.jpg", "/assets/images/products/x50/4.jpg", "/assets/images/products/x50/5.jpg"],
    tagline: "Loaded with extras.",
    short: "250 W · 50–65 km · rear seat + phone bag",
    pitch: "The friendliest daily rider — alarm, chain cover, rear seat and phone bag included, at the lowest weight in the range.",
    highlights: ["Chain cover + alarm", "Rear seat + phone bag included", "Lightest at 41 kg"],
    specs: { Motor: "48 V · 250 W", Battery: "48 V · 15 Ah", Range: "50–65 km", "Top speed": "25 km/h", Brakes: "Front & rear hydraulic disc", Tyres: "20 × 4.0 fat", Extras: "Alarm, chain cover, rear seat, phone bag", Weight: "41 kg net · 46 kg gross", Certified: "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X50 comes fully kitted — alarm, chain cover, a rear passenger seat and a phone bag all included. At 41 kg it's the lightest in the line-up, making it the friendliest daily rider without giving up the fat-tyre, full-suspension DNA."
  },
];

/* rows for the model comparison table */
export const COMPARE_ROWS = [
  ["Motor", (p) => p.specs.Motor],
  ["Battery", (p) => p.specs.Battery],
  ["Range", (p) => p.specs.Range],
  ["Display", (p) => p.specs.Display || "LCD"],
  ["Frame", (p) => p.specs.Frame || "Alloy"],
  ["Smart features", (p) => p.specs.Smart || "Alarm"],
  ["Weight", (p) => p.specs.Weight],
];

export const euro = (n) => "€" + n.toLocaleString("en-US");
export const productById = (id) => PRODUCTS.find((p) => p.id === id) || null;
export const priceFor = (p, country) => p.prices[country ? country.g : 0];
