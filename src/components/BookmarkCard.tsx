import { Button } from "@/components/ui/button";
import { Ellipsis, BookMarked } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import ValidImage from "./ValidImage"; // adjust if needed
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"; // adjust if needed
import { BookmarkCardProps } from "types";

export default function BookmarkCard({
	bookmark,
	viewMode,
	setBookmarkToEdit,
	setBookmarkToDelete,
	setBookmarks,
	setNewBookmarkTitle,
	setNewBookmarkUrl,
	bookmarkToDelete,
}: BookmarkCardProps) {
	const gridURL = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=128`;
	const listURL = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=32`;

	return (
		<Card key={bookmark.id} className="w-full">
			<CardContent
				className={`relative gap-2 ${
					viewMode === "grid"
						? "flex flex-col items-center"
						: "flex flex-row items-center justify-between p-5"
				}`}
			>
				<div className="absolute top-1 right-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6 p-0"
							>
								<Ellipsis className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => {
									setBookmarkToEdit(bookmark);
									setNewBookmarkTitle(bookmark.title);
									setNewBookmarkUrl(bookmark.url);
								}}
							>
								Edit
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => setBookmarkToDelete(bookmark)}
								className="text-red-500"
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<a
					href={bookmark.url}
					target="_blank"
					rel="noopener noreferrer"
					className={`font-semibold text-blue-500 flex flex-col items-center gap-5 text-lg ${
						viewMode === "grid"
							? "flex flex-col items-center"
							: "flex flex-row items-center justify-between"
					}`}
				>
					<ValidImage
						src={viewMode === "grid" ? gridURL : listURL}
						alt="Icon image"
						fallback={
							<BookMarked
								className={
									viewMode === "grid"
										? "text-black size-20"
										: "text-black size-8"
								}
							/>
						}
						className={
							viewMode === "grid"
								? "rounded-lg size-20"
								: "rounded-lg size-8"
						}
					/>
					{bookmark.title}
				</a>
				<a
					href={bookmark.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<p className="text-sm text-gray-500">
						Category: {bookmark.category || "None"}
					</p>
				</a>

				<ConfirmDeleteDialog
					open={bookmarkToDelete?.id === bookmark.id}
					onOpenChange={(open) =>
						setBookmarkToDelete(open ? bookmark : null)
					}
					itemLabel={bookmark.title}
					onConfirm={() =>
						setBookmarks((prev) =>
							prev.filter((bm) => bm.id !== bookmark.id)
						)
					}
				/>
			</CardContent>
		</Card>
	);
}
