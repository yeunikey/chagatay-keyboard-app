"use client";

import { useState, useRef, useMemo } from "react";
import { Type, Copy, RotateCcw, Minus, Plus } from "lucide-react";

type KeyItem = {
  id: number;
  label: string;
  value: {
    isolated: string;
    final: string;
    medial: string;
    initial: string;
  };
};

type TokenGroup =
  | { type: "keys"; content: KeyItem[] }
  | { type: "text"; content: string[] };

const NON_FORWARD_CONNECTORS = new Set([
  1, 2, 9, 10, 11, 12, 28, 30, 31, 32, 33, 34, 35, 100, 101, 102, 103, 104, 105,
  106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
]);

export default function App() {
  const [inputText, setInputText] = useState("");
  const [fontSize, setFontSize] = useState(32);

  const [keys, setKeys] = useState<KeyItem[]>([
    {
      id: 2,
      label: "алиф",
      value: { isolated: "ا", final: "ﺎ", medial: "—", initial: "—" },
    },
    {
      id: 32,
      label: "алиф хамза",
      value: { isolated: "أ", final: "ﺄ", medial: "—", initial: "—" },
    },
    {
      id: 34,
      label: "алиф мадда",
      value: { isolated: "آ", final: "ﺂ", medial: "—", initial: "—" },
    },
    {
      id: 1,
      label: "хамза",
      value: { isolated: "ء", final: "—", medial: "—", initial: "—" },
    },
    {
      id: 3,
      label: "бә",
      value: { isolated: "ب", final: "ﺐ", medial: "ﺒ", initial: "ﺑ" },
    },
    {
      id: 4,
      label: "тә",
      value: { isolated: "ت", final: "ﺖ", medial: "ﺘ", initial: "ﺗ" },
    },
    {
      id: 5,
      label: "цә",
      value: { isolated: "ث", final: "ﺚ", medial: "ﺜ", initial: "ﺛ" },
    },
    {
      id: 6,
      label: "жим",
      value: { isolated: "ج", final: "ﺞ", medial: "ﺠ", initial: "ﺟ" },
    },
    {
      id: 7,
      label: "ха",
      value: { isolated: "ح", final: "ﺢ", medial: "ﺤ", initial: "ﺣ" },
    },
    {
      id: 8,
      label: "хо",
      value: { isolated: "خ", final: "ﺦ", medial: "ﺨ", initial: "ﺧ" },
    },
    {
      id: 9,
      label: "дәл",
      value: { isolated: "د", final: "ﺪ", medial: "—", initial: "—" },
    },
    {
      id: 10,
      label: "зәл",
      value: { isolated: "ذ", final: "ﺬ", medial: "—", initial: "—" },
    },
    {
      id: 11,
      label: "ра",
      value: { isolated: "ر", final: "ﺮ", medial: "—", initial: "—" },
    },
    {
      id: 12,
      label: "зәй",
      value: { isolated: "ز", final: "ﺰ", medial: "—", initial: "—" },
    },
    {
      id: 13,
      label: "син",
      value: { isolated: "س", final: "ﺲ", medial: "ﺴ", initial: "ﺳ" },
    },
    {
      id: 14,
      label: "шин",
      value: { isolated: "ش", final: "ﺶ", medial: "ﺸ", initial: "ﺷ" },
    },
    {
      id: 15,
      label: "сад",
      value: { isolated: "ص", final: "ﺺ", medial: "ﺼ", initial: "ﺻ" },
    },
    {
      id: 16,
      label: "дад",
      value: { isolated: "ض", final: "ﺾ", medial: "ﻀ", initial: "ﺿ" },
    },
    {
      id: 17,
      label: "та",
      value: { isolated: "ط", final: "ﻂ", medial: "ﻄ", initial: "ﻃ" },
    },
    {
      id: 18,
      label: "за",
      value: { isolated: "ظ", final: "ﻆ", medial: "ﻈ", initial: "ﻇ" },
    },
    {
      id: 19,
      label: "ъайн",
      value: { isolated: "ع", final: "ﻊ", medial: "ﻌ", initial: "ﻋ" },
    },
    {
      id: 20,
      label: "ғайн",
      value: { isolated: "غ", final: "ﻎ", medial: "ﻐ", initial: "ﻏ" },
    },
    {
      id: 21,
      label: "фә",
      value: { isolated: "ف", final: "ﻒ", medial: "ﻔ", initial: "ﻓ" },
    },
    {
      id: 22,
      label: "қаф",
      value: { isolated: "ق", final: "ﻖ", medial: "ﻘ", initial: "ﻗ" },
    },
    {
      id: 23,
      label: "кәф",
      value: { isolated: "ك", final: "ﻚ", medial: "ﻜ", initial: "ﻛ" },
    },
    {
      id: 24,
      label: "ләм",
      value: { isolated: "ل", final: "ﻞ", medial: "ﻠ", initial: "ﻟ" },
    },
    {
      id: 25,
      label: "мим",
      value: { isolated: "م", final: "ﻢ", medial: "ﻤ", initial: "ﻣ" },
    },
    {
      id: 26,
      label: "нун",
      value: { isolated: "ن", final: "ﻦ", medial: "ﻨ", initial: "ﻧ" },
    },
    {
      id: 27,
      label: "һә",
      value: { isolated: "ه", final: "ﻪ", medial: "ﻬ", initial: "ﻫ" },
    },
    {
      id: 28,
      label: "уау",
      value: { isolated: "و", final: "ﻮ", medial: "—", initial: "—" },
    },
    {
      id: 29,
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
  ]);

  const letters = useMemo(() => keys.filter((k) => k.id < 100), [keys]);
  const arabicDigits = useMemo(
    () => keys.filter((k) => k.id >= 100 && k.id < 110),
    [keys],
  );
  const farsiDigits = useMemo(() => keys.filter((k) => k.id >= 110), [keys]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const charToKeyMap = useMemo(() => {
    const map = new Map<string, KeyItem>();
    keys.forEach((k) => {
      const cleanChar = (str: string) => (str ? str.replace(/ـ/g, "") : "");

      if (k.value.isolated && k.value.isolated !== "—")
        map.set(cleanChar(k.value.isolated), k);
      if (k.value.final && k.value.final !== "—")
        map.set(cleanChar(k.value.final), k);
      if (k.value.medial && k.value.medial !== "—")
        map.set(cleanChar(k.value.medial), k);
      if (k.value.initial && k.value.initial !== "—")
        map.set(cleanChar(k.value.initial), k);
    });
    return map;
  }, [keys]);

  const getShape = (
    key: KeyItem,
    type: "isolated" | "final" | "medial" | "initial",
  ): string => {
    return key.value[type] || key.value.isolated;
  };

  const shapeKeys = (keyChain: KeyItem[]): string[] => {
    return keyChain.map((current, i) => {
      const prev = keyChain[i - 1];
      const next = keyChain[i + 1];

      const canPrevConnectForward =
        prev && !NON_FORWARD_CONNECTORS.has(prev.id);
      const canCurrentConnectBackward =
        current.value.final !== "—" && current.value.medial !== "—";
      const connectToPrev = canPrevConnectForward && canCurrentConnectBackward;

      const canCurrentConnectForward = !NON_FORWARD_CONNECTORS.has(current.id);
      const canNextConnectBackward =
        next && next.value.final !== "—" && next.value.medial !== "—";
      const connectToNext =
        next && canCurrentConnectForward && canNextConnectBackward;

      if (!connectToPrev && !connectToNext)
        return getShape(current, "isolated");
      if (connectToPrev && !connectToNext) return getShape(current, "final");
      if (!connectToPrev && connectToNext) return getShape(current, "initial");
      return getShape(current, "medial");
    });
  };

  const parseTextToTokens = (text: string): (KeyItem | string)[] => {
    const tokens: (KeyItem | string)[] = [];
    const cleanText = text.replace(/ـ/g, "");

    for (const char of cleanText) {
      const key = charToKeyMap.get(char);
      if (key) {
        tokens.push(key);
      } else {
        tokens.push(char);
      }
    }
    return tokens;
  };

  const processTextChange = (newRawText: string, cursorIndexInRaw: number) => {
    try {
      const textBeforeCursor = newRawText.substring(0, cursorIndexInRaw);
      const cleanTextBeforeCursor = textBeforeCursor.replace(/ـ/g, "");
      const logicalIndex = cleanTextBeforeCursor.length;

      const allTokens = parseTextToTokens(newRawText);

      let resultString = "";
      let shapedLengthBeforeCursor = 0;

      const groups: TokenGroup[] = [];
      let currentGroup: (KeyItem | string)[] = [];
      let currentType: "keys" | "text" | null = null;

      const pushGroup = (
        type: "keys" | "text",
        content: (KeyItem | string)[],
      ) => {
        if (type === "keys") {
          groups.push({ type: "keys", content: content as KeyItem[] });
        } else {
          groups.push({ type: "text", content: content as string[] });
        }
      };

      for (const token of allTokens) {
        const isKey = typeof token !== "string";
        const type = isKey ? "keys" : "text";

        if (type !== currentType) {
          if (currentType && currentGroup.length > 0) {
            pushGroup(currentType, currentGroup);
          }
          currentGroup = [token];
          currentType = type;
        } else {
          currentGroup.push(token);
        }
      }
      if (currentType && currentGroup.length > 0) {
        pushGroup(currentType, currentGroup);
      }

      let tokenCounter = 0;

      groups.forEach((group) => {
        if (group.type === "text") {
          const str = group.content.join("");
          resultString += str;
          const len = group.content.length;
          if (tokenCounter < logicalIndex) {
            const remainingNeeded = logicalIndex - tokenCounter;
            if (remainingNeeded >= len) {
              shapedLengthBeforeCursor += str.length;
            } else {
              shapedLengthBeforeCursor += remainingNeeded;
            }
          }
          tokenCounter += len;
        } else {
          const keysInGroup = group.content;
          const forms = shapeKeys(keysInGroup);

          forms.forEach((form) => {
            resultString += form;
            if (tokenCounter < logicalIndex) {
              shapedLengthBeforeCursor += form.length;
            }
            tokenCounter++;
          });
        }
      });

      return { text: resultString, cursor: shapedLengthBeforeCursor };
    } catch (err) {
      return { text: newRawText, cursor: cursorIndexInRaw };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawVal = e.target.value;
    const cursorPos = e.target.selectionStart;
    const { text, cursor } = processTextChange(rawVal, cursorPos);
    setInputText(text);
    setTimeout(() => {
      if (textareaRef.current)
        textareaRef.current.setSelectionRange(cursor, cursor);
    }, 0);
  };

  const handleKeyClick = (key: KeyItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const rawInserted = key.value.isolated;
    const newRawText =
      inputText.substring(0, start) + rawInserted + inputText.substring(end);
    const newRawCursorIndex = start + rawInserted.length;
    const { text, cursor } = processTextChange(newRawText, newRawCursorIndex);
    setInputText(text);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursor, cursor);
    }, 0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
  };

  const handleClear = () => {
    if (window.confirm("Очистить все поле ввода?")) {
      setInputText("");
    }
  };

  const adjustFontSize = (delta: number) => {
    setFontSize((prev) => Math.max(12, Math.min(120, prev + delta)));
  };

  const renderKeyButton = (key: KeyItem, i: number) => (
    <button
      key={key.id}
      onClick={() => handleKeyClick(key)}
      title={`Вставит: ${key.value.isolated}`}
      className="flex-1 group relative flex flex-col items-center justify-center p-1 md:p-2 bg-white hover:bg-blue-50 active:bg-blue-100 border-b-2 md:border-b-4 border-slate-300 active:border-b-0 active:translate-y-0.5 md:active:translate-y-1 rounded md:rounded-lg transition-all duration-100 text-center min-w-[36px] md:min-w-0"
    >
      <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 text-[8px] md:text-[10px] text-slate-300">
        {i + 1}
      </span>
      <span className="font-normal text-2xl md:text-3xl my-1 md:my-2">
        {key.value.isolated}
      </span>
      <span className="font-medium text-slate-500 break-all leading-tight text-sm">
        {key.label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-3">
      <div className="max-w-7xl mx-auto space-y-3">
        <main className="flex flex-col gap-3">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type size={16} />
                Результат
              </label>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1 bg-white border border-slate-300 rounded px-1 py-0.5 mr-2">
                  <button
                    onClick={() => adjustFontSize(-2)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                    title="Уменьшить шрифт"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-mono w-8 text-center text-slate-600 select-none">
                    {fontSize}
                  </span>
                  <button
                    onClick={() => adjustFontSize(2)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                    title="Увеличить шрифт"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleClear}
                  className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  <RotateCcw size={12} /> Очистить
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors font-medium"
                >
                  <Copy size={12} /> Копировать
                </button>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleChange}
              style={{ fontSize: `${fontSize}px` }}
              placeholder="Нажимайте кнопки ниже или печатайте здесь..."
              className="w-full h-36 lg:h-[200px] p-4 bg-white border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none font-mono leading-relaxed text-slate-800"
              dir="rtl"
            />
          </div>

          <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-200 h-full flex flex-col space-y-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-700">Клавиши</h2>
                <span className="text-xs bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full">
                  {letters.length}
                </span>
              </div>
              <div
                className="grid gap-3 grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-11"
                dir="rtl"
              >
                {letters.map((key, i) => renderKeyButton(key, i))}
              </div>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-700">Арабские цифры</h2>
                <span className="text-xs bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full">
                  {arabicDigits.length}
                </span>
              </div>
              <div className="grid gap-3 grid-cols-5 sm:grid-cols-10" dir="rtl">
                {arabicDigits.map((key, i) => renderKeyButton(key, i))}
              </div>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-700">
                  Персидские цифры
                </h2>
                <span className="text-xs bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full">
                  {farsiDigits.length}
                </span>
              </div>
              <div className="grid gap-3 grid-cols-5 sm:grid-cols-10" dir="rtl">
                {farsiDigits.map((key, i) => renderKeyButton(key, i))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
