"use client";

import { useState, useCallback } from "react";
import { useBookmarks, useEditor } from "@/features/model";
import BookmarksWidget from "@/widgets/BookmarksWidget";
import EditorWidget from "@/widgets/EditorWidget";
import KeyboardWidget from "@/widgets/KeyboardWidget";
import { KeyItem } from "@/entities";
import ModalOverlay from "@/shared/ModalOverlay";

export default function App() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { bookmarks, addBookmark, deleteBookmark } = useBookmarks();
  const {
    inputText,
    fontSize,
    textareaRef,
    handleChange,
    insertText,
    adjustFontSize,
    clearText,
    handleBackspace,
  } = useEditor();

  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [bookmarkNameInput, setBookmarkNameInput] = useState("");
  const [bookmarkTextToSave, setBookmarkTextToSave] = useState("");

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleAddBookmarkClick = useCallback((text: string) => {
    if (!text.trim()) return;
    setBookmarkTextToSave(text);
    setBookmarkNameInput("");
    setIsPromptModalOpen(true);
  }, []);

  const confirmAddBookmark = useCallback(() => {
    if (bookmarkNameInput.trim()) {
      addBookmark(bookmarkTextToSave, bookmarkNameInput);
    }
    setIsPromptModalOpen(false);
  }, [bookmarkNameInput, bookmarkTextToSave, addBookmark]);

  const handleClearTrigger = useCallback(() => {
    setIsConfirmModalOpen(true);
  }, []);

  const confirmClear = useCallback(() => {
    clearText();
    setIsConfirmModalOpen(false);
  }, [clearText]);

  const handleKeyClick = useCallback(
    (key: KeyItem) => insertText(key.value.isolated),
    [insertText],
  );

  return (
    <div className="min-h-screen bg-background text-slate-900 font-sans p-4 md:px-12 md:py-0 pb-24!">
      <div
        className={`mx-auto grid grid-cols-1 ${showBookmarks ? "max-w-dvw lg:grid-cols-4" : "max-w-7xl lg:grid-cols-1"} gap-16 items-start`}
      >
        {showBookmarks && (
          <BookmarksWidget
            bookmarks={bookmarks}
            onInsert={insertText}
            onDelete={deleteBookmark}
            inputText={inputText}
            addBookmark={handleAddBookmarkClick}
          />
        )}

        <main
          className={`order-1 lg:order-2 flex flex-col gap-3 ${showBookmarks ? "lg:col-span-3" : "lg:col-span-1"}`}
        >
          <EditorWidget
            inputText={inputText}
            fontSize={fontSize}
            textareaRef={textareaRef}
            handleChange={handleChange}
            adjustFontSize={adjustFontSize}
            clearText={handleClearTrigger}
            showBookmarks={showBookmarks}
            toggleBookmarks={() => setShowBookmarks((prev) => !prev)}
            addBookmark={addBookmark}
            handleBackspace={handleBackspace}
            insertText={insertText}
          />
          <KeyboardWidget onKeyClick={handleKeyClick} />
        </main>
      </div>

      {isPromptModalOpen && (
        <ModalOverlay>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-slate-800">
              Добавить закладку
            </h3>
            <p className="text-sm text-slate-500">
              Введите название для сохранения текущего текста.
            </p>
            <input
              autoFocus
              type="text"
              value={bookmarkNameInput}
              onChange={(e) => setBookmarkNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmAddBookmark();
              }}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800"
              placeholder="Название закладки..."
            />
            <div className="flex justify-end gap-3 mt-6 pt-2">
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={confirmAddBookmark}
                className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium shadow-sm hover:bg-blue-600 transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {isConfirmModalOpen && (
        <ModalOverlay>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-slate-800">
              Очистить поле?
            </h3>
            <p className="text-slate-600 text-sm">
              Вы уверены, что хотите полностью очистить поле ввода? Это действие
              нельзя отменить.
            </p>
            <div className="flex justify-end gap-3 mt-6 pt-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={confirmClear}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium shadow-sm hover:bg-red-600 transition-colors"
              >
                Очистить
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}
