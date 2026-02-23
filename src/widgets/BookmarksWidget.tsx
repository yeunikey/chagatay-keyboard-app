import { SavedBookmark } from "@/entities";
import BookmarkItem from "@/features/BookmarkItem";

const BookmarksWidget = ({
  bookmarks,
  onInsert,
  onDelete,
}: {
  bookmarks: SavedBookmark[];
  onInsert: (text: string) => void;
  onDelete: (id: string) => void;
}) => (
  <aside className="order-2 lg:order-1 lg:col-span-1 flex flex-col h-[300px] lg:h-[calc(100vh-3rem)] lg:sticky lg:top-6 space-y-3">
    <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-200 flex-1 flex flex-col min-h-0">
      <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2 shrink-0">
        Закладки
      </h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {bookmarks.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Нет закладок</p>
        ) : (
          bookmarks.map((b) => (
            <BookmarkItem
              key={b.id}
              bookmark={b}
              onInsert={onInsert}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  </aside>
);

export default BookmarksWidget;
