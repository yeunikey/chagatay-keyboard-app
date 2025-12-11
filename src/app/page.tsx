'use client';

import { useState, useRef } from 'react';
import { Type, Copy, RotateCcw } from 'lucide-react';

type KeyItem = {
  id: number;
  label: string;
  value: string;
};

export default function App() {

  const [inputText, setInputText] = useState("");

  const [keys, setKeys] = useState<KeyItem[]>([
    { id: 1, label: "хамза", value: "ﺀ" },
    { id: 2, label: "алиф", value: "ﺍ" },
    { id: 3, label: "бе", value: "ﺏ" },
    { id: 4, label: "пе", value: "ﭖ" },
    { id: 5, label: "те", value: "ﺕ" },
    { id: 6, label: "се", value: "ﺙ" },
    { id: 7, label: "жим", value: "ﺝ" },
    { id: 8, label: "чим", value: "ﭺ" },
    { id: 9, label: "х", value: "ﺡ" },
    { id: 10, label: "хе", value: "ﺥ" },
    { id: 11, label: "дол", value: "ﺩ" },
    { id: 12, label: "зол", value: "ﺫ" },
    { id: 13, label: "ре", value: "ﺭ" },
    { id: 14, label: "зе", value: "ﺯ" },
    { id: 15, label: "же", value: "ﮊ" },
    { id: 16, label: "син", value: "ﺱ" },
    { id: 17, label: "шин", value: "ﺵ" },
    { id: 18, label: "сод", value: "ﺹ" },
    { id: 19, label: "дод", value: "ﺽ" },
    { id: 20, label: "то", value: "ﻁ" },
    { id: 21, label: "зо", value: "ﻅ" },
    { id: 22, label: "айн", value: "ﻉ" },
    { id: 23, label: "ғайн", value: "ﻍ" },
    { id: 24, label: "фе", value: "ﻑ" },
    { id: 25, label: "қоф", value: "ﻕ" },
    { id: 26, label: "коф", value: "ک" },
    { id: 27, label: "гоф", value: "ﮒ" },
    { id: 28, label: "ң", value: "ݣ" },
    { id: 29, label: "лам", value: "ﻝ" },
    { id: 30, label: "мим", value: "ﻡ" },
    { id: 31, label: "нун", value: "ﻥ" },
    { id: 32, label: "уау", value: "ﻭ" },
    { id: 33, label: "хавваз", value: "ﻩ" },
    { id: 34, label: "йе", value: "ﻯ" },
  ]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyClick = (valueToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = inputText;

    const newText = currentText.substring(0, start) + valueToInsert + currentText.substring(end);

    setInputText(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + valueToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
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
      <div className="max-w-4xl mx-auto space-y-6">

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
              onChange={(e) => setInputText(e.target.value)}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 overflow-hidden">
                  {keys.map((key) => (
                    <button
                      key={key.id}
                      onClick={() => handleKeyClick(key.value)}
                      title={`Вставит: ${key.value}`}
                      className="group relative flex flex-col items-center justify-center p-3 bg-white hover:bg-blue-50 active:bg-blue-100 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 rounded-lg transition-all duration-100 text-center"
                    >
                      <span className="font-bold text-slate-800 break-all leading-tight">{`${key.label} (${key.value})`}</span>
                    </button>
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