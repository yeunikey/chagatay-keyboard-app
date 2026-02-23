"use client";

import { useState, useCallback } from "react";
import { useBookmarks, useEditor } from "@/features/model";
import BookmarksWidget from "@/widgets/BookmarksWidget";
import EditorWidget from "@/widgets/EditorWidget";
import KeyboardWidget from "@/widgets/KeyboardWidget";
import { KeyItem } from "@/entities";

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
  } = useEditor();

  const handleKeyClick = useCallback(
    (key: KeyItem) => insertText(key.value.isolated),
    [insertText],
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:px-12 md:py-6">
      <div
        className={`mx-auto grid grid-cols-1 ${showBookmarks ? "max-w-dvw lg:grid-cols-4" : "max-w-7xl lg:grid-cols-1"} gap-4 items-start`}
      >
        {showBookmarks && (
          <BookmarksWidget
            bookmarks={bookmarks}
            onInsert={insertText}
            onDelete={deleteBookmark}
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
            clearText={clearText}
            showBookmarks={showBookmarks}
            toggleBookmarks={() => setShowBookmarks((prev) => !prev)}
            addBookmark={addBookmark}
          />
          <KeyboardWidget onKeyClick={handleKeyClick} />
        </main>
      </div>
    </div>
  );
}
