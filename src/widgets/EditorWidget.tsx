import { Bookmark, Copy, Minus, Plus, RotateCcw, Type } from "lucide-react";
import { RefObject } from "react";

const EditorWidget = ({
  inputText,
  fontSize,
  textareaRef,
  handleChange,
  adjustFontSize,
  clearText,
  showBookmarks,
  toggleBookmarks,
  addBookmark,
}: {
  inputText: string;
  fontSize: number;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  adjustFontSize: (delta: number) => void;
  clearText: () => void;
  showBookmarks: boolean;
  toggleBookmarks: () => void;
  addBookmark: (text: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Type size={16} />
          Результат
        </label>
        <div className="flex gap-2 items-center flex-wrap justify-end">
          <button
            onClick={toggleBookmarks}
            className="mr-auto text-xs flex items-center gap-1 text-slate-700 bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded transition-colors font-medium"
          >
            <Bookmark
              size={12}
              className={showBookmarks ? "fill-current" : ""}
            />
            {showBookmarks ? "Скрыть закладки" : "Мои закладки"}
          </button>

          <button
            onClick={() => addBookmark(inputText)}
            className="text-xs flex items-center gap-1 text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded transition-colors font-medium"
          >
            <Bookmark size={12} /> В закладки
          </button>

          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded px-1 py-0.5">
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
            onClick={clearText}
            className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-600 px-2 py-1.5 rounded hover:bg-red-50 transition-colors"
          >
            <RotateCcw size={12} /> Очистить
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(inputText)}
            className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors font-medium"
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
  );
};

export default EditorWidget;