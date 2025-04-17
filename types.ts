export type Bookmark = {
	id: string;
	title: string;
	url: string;
	category?: string;
	createdAt: string;
};

export type BookmarkCardProps = {
	bookmark: Bookmark;
	viewMode: "grid" | "list";
	setBookmarkToEdit: (bookmark: Bookmark | null) => void;
	setBookmarkToDelete: (bookmark: Bookmark | null) => void;
	setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
	setNewBookmarkTitle: (title: string) => void;
	setNewBookmarkUrl: (url: string) => void;
	bookmarkToDelete: Bookmark | null;
};

export type Category = {
	name: string;
	color: string;
	createdAt: string;
};
