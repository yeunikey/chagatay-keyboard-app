import {
  Bookmark,
  Copy,
  Delete,
  DeleteIcon,
  Minus,
  Plus,
  RotateCcw,
  Trash,
} from "lucide-react";
import { RefObject } from "react";

const EditorWidget = ({
  inputText,
  fontSize,
  textareaRef,
  handleChange,
  adjustFontSize,
  clearText,
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
      <div className="flex justify-between">
        <div className="text-3xl font-semibold text-slate-700 flex items-center gap-2">
          Qalam
        </div>

        <div className="flex gap-8 items-center h-full">
          <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-2xl shadow-sm">
            <button
              onClick={() => adjustFontSize(-2)}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
              title="Уменьшить шрифт"
            >
              <Minus size={14} />
            </button>
            <span className="text-xs font-semibold w-8 text-center text-slate-600 select-none">
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

          <div className="flex gap-3">
            <div
              onClick={() => navigator.clipboard.writeText(inputText)}
              className="bg-neutral-400 shadow-sm h-16 w-14 rounded-b-2xl flex items-center justify-center cursor-pointer"
            >
              <Copy size={24} className={"stroke-2 stroke-white"} />
            </div>
            <div
              onClick={toggleBookmarks}
              className="bg-primary shadow-sm h-16 w-14 rounded-b-2xl flex items-center justify-center cursor-pointer"
            >
              <Bookmark size={24} className={"fill-white stroke-0"} />
            </div>
            <div
              onClick={clearText}
              className="bg-red-400 shadow-sm h-16 w-14 rounded-b-2xl flex items-center justify-center cursor-pointer"
            >
              <Trash size={24} className={"stroke-2 stroke-white"} />
            </div>
          </div>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleChange}
        style={{ fontSize: `${fontSize}px` }}
        placeholder="Результат ввода"
        className="w-full h-36 lg:h-[200px] p-4 bg-white rounded-2xl shadow-sm focus:ring-0 focus:outline-none resize-none font-medium leading-relaxed text-slate-800"
        dir="rtl"
      />
    </div>
  );
};

export default EditorWidget;
