import { KeyItem } from "@/entities";

const NON_FORWARD_CONNECTORS = new Set([
  1, 2, 3, 4, 12, 13, 14, 15, 16, 36, 100, 101, 102, 103, 104, 105, 106, 107,
  108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
]);

const INITIAL_KEYS: KeyItem[] = [
  {
    id: 1,
    label: "хамза",
    value: { isolated: "ء", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 2,
    label: "алиф",
    value: { isolated: "ا", final: "ﺎ", medial: "—", initial: "—" },
  },
  {
    id: 3,
    label: "алиф хамза",
    value: { isolated: "أ", final: "ﺄ", medial: "—", initial: "—" },
  },
  {
    id: 4,
    label: "алиф мадда",
    value: { isolated: "آ", final: "ﺂ", medial: "—", initial: "—" },
  },
  {
    id: 5,
    label: "бә",
    value: { isolated: "ب", final: "ﺐ", medial: "ﺒ", initial: "ﺑ" },
  },
  {
    id: 6,
    label: "тә",
    value: { isolated: "ت", final: "ﺖ", medial: "ﺘ", initial: "ﺗ" },
  },
  {
    id: 7,
    label: "цә",
    value: { isolated: "ث", final: "ﺚ", medial: "ﺜ", initial: "ﺛ" },
  },
  {
    id: 8,
    label: "жим",
    value: { isolated: "ج", final: "ﺞ", medial: "ﺠ", initial: "ﺟ" },
  },
  {
    id: 9,
    label: "чим",
    value: { isolated: "ﭺ", final: "ﭻ", medial: "ﭽ", initial: "ﭼ" },
  },
  {
    id: 10,
    label: "ха",
    value: { isolated: "ح", final: "ﺢ", medial: "ﺤ", initial: "ﺣ" },
  },
  {
    id: 11,
    label: "хо",
    value: { isolated: "خ", final: "ﺦ", medial: "ﺨ", initial: "ﺧ" },
  },
  {
    id: 12,
    label: "дәл",
    value: { isolated: "د", final: "ﺪ", medial: "ـ", initial: "د" },
  },
  {
    id: 13,
    label: "зәл",
    value: { isolated: "ذ", final: "ﺬ", medial: "—", initial: "—" },
  },
  {
    id: 14,
    label: "ра",
    value: { isolated: "ر", final: "ﺮ", medial: "—", initial: "—" },
  },
  {
    id: 15,
    label: "зәй",
    value: { isolated: "ز", final: "ﺰ", medial: "—", initial: "—" },
  },
  {
    id: 16,
    label: "же",
    value: { isolated: "ژ", final: "ﮋ", medial: "—", initial: "—" },
  },
  {
    id: 17,
    label: "син",
    value: { isolated: "س", final: "ﺲ", medial: "ﺴ", initial: "ﺳ" },
  },
  {
    id: 18,
    label: "шин",
    value: { isolated: "ش", final: "ﺶ", medial: "ﺸ", initial: "ﺷ" },
  },
  {
    id: 19,
    label: "сад",
    value: { isolated: "ص", final: "ﺺ", medial: "ﺼ", initial: "ﺻ" },
  },
  {
    id: 20,
    label: "дад",
    value: { isolated: "ض", final: "ﺾ", medial: "ﻀ", initial: "ﺿ" },
  },
  {
    id: 21,
    label: "та",
    value: { isolated: "ط", final: "ﻂ", medial: "ﻄ", initial: "ﻃ" },
  },
  {
    id: 22,
    label: "за",
    value: { isolated: "ظ", final: "ﻆ", medial: "ﻈ", initial: "ﻇ" },
  },
  {
    id: 23,
    label: "ъайн",
    value: { isolated: "ع", final: "ﻊ", medial: "ﻌ", initial: "ﻋ" },
  },
  {
    id: 24,
    label: "ғайн",
    value: { isolated: "غ", final: "ﻎ", medial: "ﻐ", initial: "ﻏ" },
  },
  {
    id: 25,
    label: "фә",
    value: { isolated: "ف", final: "ﻒ", medial: "ﻔ", initial: "ﻓ" },
  },
  {
    id: 26,
    label: "қаф",
    value: { isolated: "ق", final: "ﻖ", medial: "ﻘ", initial: "ﻗ" },
  },
  {
    id: 27,
    label: "кәф",
    value: { isolated: "ك", final: "ﻚ", medial: "ﻜ", initial: "ﻛ" },
  },
  {
    id: 28,
    label: "кәф",
    value: { isolated: "ڭ", final: "ﯔ", medial: "ﯖ", initial: "ﯕ" },
  },
  {
    id: 29,
    label: "коф",
    value: { isolated: "ک", final: "ﮏ", medial: "ﮑ", initial: "ﮐ" },
  },
  {
    id: 30,
    label: "гоф",
    value: { isolated: "گ", final: "ﮓ", medial: "ﮕ", initial: "ﮔ" },
  },
  {
    id: 31,
    label: "ң",
    value: { isolated: "ݣ", final: "ـݣ", medial: "ـݣـ", initial: "ݣـ" },
  },
  {
    id: 32,
    label: "ләм",
    value: { isolated: "ل", final: "ﻞ", medial: "ﻠ", initial: "ﻟ" },
  },
  {
    id: 33,
    label: "мим",
    value: { isolated: "م", final: "ﻢ", medial: "ﻤ", initial: "ﻣ" },
  },
  {
    id: 34,
    label: "нун",
    value: { isolated: "ن", final: "ﻦ", medial: "ﻨ", initial: "ﻧ" },
  },
  {
    id: 35,
    label: "һә",
    value: { isolated: "ه", final: "ﻪ", medial: "ﻬ", initial: "ﻫ" },
  },
  {
    id: 36,
    label: "уау",
    value: { isolated: "و", final: "ﻮ", medial: "—", initial: "—" },
  },
  {
    id: 37,
    label: "йә",
    value: { isolated: "ي", final: "ﻲ", medial: "ﻴ", initial: "ﻳ" },
  },
  {
    id: 100,
    label: "0",
    value: { isolated: "٠", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 101,
    label: "1",
    value: { isolated: "١", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 102,
    label: "2",
    value: { isolated: "٢", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 103,
    label: "3",
    value: { isolated: "٣", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 104,
    label: "4",
    value: { isolated: "٤", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 105,
    label: "5",
    value: { isolated: "٥", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 106,
    label: "6",
    value: { isolated: "٦", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 107,
    label: "7",
    value: { isolated: "٧", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 108,
    label: "8",
    value: { isolated: "٨", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 109,
    label: "9",
    value: { isolated: "٩", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 110,
    label: "0",
    value: { isolated: "۰", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 111,
    label: "1",
    value: { isolated: "۱", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 112,
    label: "2",
    value: { isolated: "۲", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 113,
    label: "3",
    value: { isolated: "۳", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 114,
    label: "4",
    value: { isolated: "۴", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 115,
    label: "5",
    value: { isolated: "۵", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 116,
    label: "6",
    value: { isolated: "۶", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 117,
    label: "7",
    value: { isolated: "۷", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 118,
    label: "8",
    value: { isolated: "۸", final: "—", medial: "—", initial: "—" },
  },
  {
    id: 119,
    label: "9",
    value: { isolated: "۹", final: "—", medial: "—", initial: "—" },
  },
];

const CHAR_TO_KEY_MAP = new Map<string, KeyItem>();

INITIAL_KEYS.forEach((k) => {
  const cleanChar = (str: string) => (str ? str.replace(/ـ/g, "") : "");
  if (k.value.isolated && k.value.isolated !== "—")
    CHAR_TO_KEY_MAP.set(cleanChar(k.value.isolated), k);
  if (k.value.final && k.value.final !== "—")
    CHAR_TO_KEY_MAP.set(cleanChar(k.value.final), k);
  if (k.value.medial && k.value.medial !== "—")
    CHAR_TO_KEY_MAP.set(cleanChar(k.value.medial), k);
  if (k.value.initial && k.value.initial !== "—")
    CHAR_TO_KEY_MAP.set(cleanChar(k.value.initial), k);
});

export {
    CHAR_TO_KEY_MAP,
    INITIAL_KEYS,
    NON_FORWARD_CONNECTORS
}