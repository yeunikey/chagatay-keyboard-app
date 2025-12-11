'use client';

import { useState, useRef, useMemo } from 'react';
import { Type, Copy, RotateCcw } from 'lucide-react';

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
  | { type: 'keys'; content: KeyItem[] }
  | { type: 'text'; content: string[] };

const NON_FORWARD_CONNECTORS = new Set([1, 2, 11, 12, 13, 14, 15, 32]);

const KEYBOARD_LAYOUT = [
  // Ряд 1 (Верхний: твердые, гортанные и шипящие)
  [19, 18, 6, 25, 24, 23, 22, 33, 10, 9, 7, 8],
  // Ряд 2 (Средний/Домашний: самые частотные, гласные и основные согласные)
  [17, 16, 34, 3, 29, 2, 5, 31, 30, 26, 27],
  // Ряд 3 (Нижний: з, р, д, п, уау и спецсимволы)
  [21, 20, 14, 15, 13, 12, 11, 4, 32, 28, 1]
];

export default function App() {

  const [inputText, setInputText] = useState("");

  const [keys, setKeys] = useState<KeyItem[]>([
    {
      id: 1,
      label: "хамза",
      value: {
        isolated: "ﺀ",
        final: "—",
        medial: "—",
        initial: "—",
      }
    },
    {
      id: 2,
      label: "алиф",
      value: {
        isolated: "ﺍ",
        final: "ﺎ",
        medial: "ﺎ",
        initial: "ﺍ",
      }
    },
    {
      id: 3,
      label: "бе",
      value: {
        isolated: "ﺏ",
        final: "ﺐ",
        medial: "ﺒ",
        initial: "ﺑ",
      }
    },
    {
      id: 4,
      label: "пе",
      value: {
        isolated: "ﭖ",
        final: "ﭗ",
        medial: "ﭙ",
        initial: "ﭘ"
      }
    },
    {
      id: 5,
      label: "те",
      value: {
        isolated: "ﺕ",
        final: "ﺖ",
        medial: "ﺘ",
        initial: "ﺗ"
      }
    },
    {
      id: 6,
      label: "се",
      value: {
        isolated: "ﺙ",
        final: "ﺚ",
        medial: "ﺜ",
        initial: "ﺛ"
      }
    },
    {
      id: 7,
      label: "жим",
      value: {
        isolated: "ﺝ",
        final: "ﺞ",
        medial: "ﺠ",
        initial: "ﺟ"
      }
    },
    {
      id: 8,
      label: "чим",
      value: {
        isolated: "ﭺ",
        final: "ﭻ",
        medial: "ﭽ",
        initial: "ﭼ"
      }
    },
    {
      id: 9,
      label: "х",
      value: {
        isolated: "ﺡ",
        final: "ﺢ",
        initial: "ﺤ",
        medial: "ﺣ"
      }
    },
    {
      id: 10,
      label: "хе",
      value: {
        isolated: "ﺥ",
        final: "ﺦ",
        medial: "ﺨ",
        initial: "ﺧ"
      }
    },
    {
      id: 11,
      label: "дол",
      value: {
        isolated: "ﺩ",
        final: "ﺪ",
        medial: "ﺪ",
        initial: "ﺩ"
      }
    },
    {
      id: 12,
      label: "зол",
      value: {
        isolated: "ﺫ",
        final: "ﺬ",
        medial: "ﺬ",
        initial: "ﺫ"
      }
    },
    {
      id: 13,
      label: "ре",
      value: {
        isolated: "ﺭ",
        final: "ﺮ",
        medial: "ﺮ",
        initial: "ﺭ"
      }
    },
    {
      id: 14,
      label: "зе",
      value: {
        isolated: "ﺯ",
        final: "ﺰ",
        medial: "ﺰ",
        initial: "ﺯ"
      }
    },
    {
      id: 15,
      label: "же",
      value: {
        isolated: "ﮊ",
        final: "ﮋ",
        medial: "ﮋ",
        initial: "ﮊ"
      }
    },
    {
      id: 16,
      label: "син",
      value: {
        isolated: "ﺱ",
        final: "ﺲ",
        medial: "ﺴ",
        initial: "ﺳ"
      }
    },
    {
      id: 17,
      label: "шин",
      value: {
        isolated: "ﺵ",
        final: "ﺶ",
        medial: "ﺸ",
        initial: "ﺷ"
      }
    },
    {
      id: 18,
      label: "сод",
      value: {
        isolated: "ﺹ",
        final: "ﺺ",
        medial: "ﺼ",
        initial: "ﺻ"
      }
    },
    {
      id: 19,
      label: "дод",
      value: {
        isolated: "ﺽ",
        final: "ﺾ",
        medial: "ﻀ",
        initial: "ﺿ"
      }
    },
    {
      id: 20,
      label: "то",
      value: {
        isolated: "ﻁ",
        final: "ﻂ",
        medial: "ﻃ",
        initial: "ﻃ"
      }
    },
    {
      id: 21,
      label: "зо",
      value: {
        isolated: "ﻅ",
        final: "ﻅ",
        medial: "ﻅ",
        initial: "ﻅ"
      }
    },
    {
      id: 22,
      label: "айн",
      value: {
        isolated: "ﻉ",
        final: "ﻊ",
        medial: "ﻌ",
        initial: "ﻋ"
      }
    },
    {
      id: 23,
      label: "ғайн",
      value: {
        isolated: "ﻍ",
        final: "ﻎ",
        medial: "ﻐ",
        initial: "ﻏ"
      }
    },
    {
      id: 24,
      label: "фе",
      value: {
        isolated: "ﻑ",
        final: "ﻒ",
        medial: "ﻔ",
        initial: "ﻓ"
      }
    },
    {
      id: 25,
      label: "қоф",
      value: {
        isolated: "ﻕ",
        final: "ﻖ",
        medial: "ﻘ",
        initial: "ﻗ"
      }
    },
    {
      id: 26,
      label: "коф",
      value: {
        isolated: "ک",
        final: "ک",
        medial: "ﻜ",
        initial: "ﻛ"
      }
    },
    {
      id: 27,
      label: "гоф",
      value: {
        isolated: "ﮒ",
        final: "ﮓ",
        medial: "ﮕ",
        initial: "ﮔ"
      }
    },
    {
      id: 28,
      label: "ң",
      value: {
        isolated: "ݣ",
        final: "ـݣ",
        medial: "ـݣـ",
        initial: "ݣـ"
      }
    },
    {
      id: 29,
      label: "лам",
      value: {
        isolated: "ﻝ",
        final: "ﻝ",
        medial: "ﻠ",
        initial: "ﻟ"
      }
    },
    {
      id: 30,
      label: "мим",
      value: {
        isolated: "ﻡ",
        final: "ﻢ",
        medial: "ﻤ",
        initial: "ﻣ"
      }
    },
    {
      id: 31,
      label: "нун",
      value: {
        isolated: "ﻥ",
        final: "ﻥ",
        medial: "ﻨ",
        initial: "ﻧ"
      }
    },
    {
      id: 32,
      label: "уау",
      value: {
        isolated: "ﻭ",
        final: "ﻮ",
        medial: "ﻮ",
        initial: "ﻭ"
      }
    },
    {
      id: 33,
      label: "хавваз",
      value: {
        isolated: "ﻩ",
        final: "ﻪ",
        medial: "ﻬ",
        initial: "ﻫ"
      }
    },
    {
      id: 34,
      label: "йе",
      value: {
        isolated: "ﻯ",
        final: "ﻰ",
        medial: "ﻴ",
        initial: "ﻳ"
      }
    },
  ]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const charToKeyMap = useMemo(() => {
    const map = new Map<string, KeyItem>();
    keys.forEach(k => {
      const cleanChar = (str: string) => str ? str.replace(/ـ/g, "") : "";

      if (k.value.isolated && k.value.isolated !== "—") map.set(cleanChar(k.value.isolated), k);
      if (k.value.final && k.value.final !== "—") map.set(cleanChar(k.value.final), k);
      if (k.value.medial && k.value.medial !== "—") map.set(cleanChar(k.value.medial), k);
      if (k.value.initial && k.value.initial !== "—") map.set(cleanChar(k.value.initial), k);
    });
    return map;
  }, [keys]);

  const getShape = (key: KeyItem, type: 'isolated' | 'final' | 'medial' | 'initial'): string => {
    return key.value[type] || key.value.isolated;
  };

  const shapeKeys = (keyChain: KeyItem[]): string[] => {
    return keyChain.map((current, i) => {
      const prev = keyChain[i - 1];
      const next = keyChain[i + 1];

      const canPrevConnectForward = prev && !NON_FORWARD_CONNECTORS.has(prev.id);
      const canCurrentConnectBackward = current.value.final !== "—" && current.value.medial !== "—";
      const connectToPrev = canPrevConnectForward && canCurrentConnectBackward;

      const canCurrentConnectForward = !NON_FORWARD_CONNECTORS.has(current.id);
      const canNextConnectBackward = next && next.value.final !== "—" && next.value.medial !== "—";
      const connectToNext = next && canCurrentConnectForward && canNextConnectBackward;

      if (!connectToPrev && !connectToNext) return getShape(current, 'isolated');
      if (connectToPrev && !connectToNext) return getShape(current, 'final');
      if (!connectToPrev && connectToNext) return getShape(current, 'initial');
      return getShape(current, 'medial');
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
      let currentType: 'keys' | 'text' | null = null;

      const pushGroup = (type: 'keys' | 'text', content: (KeyItem | string)[]) => {
        if (type === 'keys') {
          groups.push({ type: 'keys', content: content as KeyItem[] });
        } else {
          groups.push({ type: 'text', content: content as string[] });
        }
      };

      for (const token of allTokens) {
        const isKey = typeof token !== 'string';
        const type = isKey ? 'keys' : 'text';

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

      groups.forEach(group => {
        if (group.type === 'text') {
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
      console.error("Text processing error:", err);
      return { text: newRawText, cursor: cursorIndexInRaw };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawVal = e.target.value;
    const cursorPos = e.target.selectionStart;
    const { text, cursor } = processTextChange(rawVal, cursorPos);
    setInputText(text);
    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.setSelectionRange(cursor, cursor);
    }, 0);
  };

  const handleKeyClick = (key: KeyItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const rawInserted = key.value.isolated;
    const newRawText = inputText.substring(0, start) + rawInserted + inputText.substring(end);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <main className="flex flex-col gap-6">

          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type size={16} />
                Результат
              </label>
              <div className="flex gap-2">
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
              placeholder="Нажимайте кнопки ниже или печатайте здесь..."
              className="w-full h-64 lg:h-[300px] p-4 bg-white border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none font-mono text-lg leading-relaxed text-slate-800"
              dir='rtl'
            />
          </div>

          <div className="">
            <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-200 h-full flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-700">Клавиши</h2>
                <span className="text-xs bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full">{keys.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <div className="flex flex-col gap-3 overflow-hidden">
                  {KEYBOARD_LAYOUT.map((row, i) => (
                    <div className="flex gap-3 overflow-hidden" key={i}>
                      {row.map((keyId) => {
                        const key = keys.find(k => k.id === keyId);
                        if (!key) return null;
                        
                        return (
                          <button
                            key={key.id}
                            onClick={() => handleKeyClick(key)}
                            title={`Вставит: ${key.value}`}
                            className="flex-1 group relative flex flex-col items-center justify-center p-2 bg-white hover:bg-blue-50 active:bg-blue-100 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 rounded-lg transition-all duration-100 text-center"
                          >
                            <span className='absolute top-1 left-1 text-[10px] text-slate-300'>{key.id}</span>
                            <span className='font-normal text-2xl my-2'>{key.value.isolated}</span>
                            <span className="font-medium text-slate-500 break-all leading-tight">{key.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}