import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

interface Bookmark {
	title: string;
	url: string;
	category: string;
}

export default function BookmarkExtension() {
	const [search, setSearch] = useState("");
	const [categorySearch, setCategorySearch] = useState("");
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [newBookmark, setNewBookmark] = useState<Bookmark>({
		title: "",
		url: "",
		category: "",
	});
	const [newCategory, setNewCategory] = useState("");

	const [openBookmarkDialog, setOpenBookmarkDialog] = useState(false);
	const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<{
		type: "bookmark" | "category";
		index: number;
	} | null>(null);

	const filteredBookmarks = bookmarks.filter((b) =>
		b.title.toLowerCase().includes(search.toLowerCase())
	);
	const filteredCategories = categories.filter((cat) =>
		cat.toLowerCase().includes(categorySearch.toLowerCase())
	);

	const addBookmark = () => {
		if (!newBookmark.title || !newBookmark.url) return;
		setBookmarks([...bookmarks, newBookmark]);
		setNewBookmark({ title: "", url: "", category: "" });
		setOpenBookmarkDialog(false);
	};

	const addCategory = () => {
		if (!newCategory) return;
		setCategories([...categories, newCategory]);
		setNewCategory("");
		setOpenCategoryDialog(false);
	};

	const editBookmark = (index: number, updatedBookmark: Bookmark) => {
		const updated = [...bookmarks];
		updated[index] = updatedBookmark;
		setBookmarks(updated);
	};

	const deleteBookmark = (index: number) => {
		setBookmarks(bookmarks.filter((_, i) => i !== index));
	};

	const deleteCategory = (index: number) => {
		setCategories(categories.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col items-center p-4 max-w-xl mx-auto w-[400px] h-[500px]">
			<h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>

			<Tabs defaultValue="all">
				<TabsList className="grid grid-cols-2 mb-4 w-[350px]">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
				</TabsList>

				<TabsContent value="all">
					<div className="flex justify-between items-center mb-4">
						<Input
							placeholder="Search bookmarks..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full mr-2"
						/>
						<Dialog
							open={openBookmarkDialog}
							onOpenChange={setOpenBookmarkDialog}
						>
							<DialogTrigger asChild>
								<Button>
									<Plus className="w-4 h-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>New Bookmark</DialogTitle>
									<DialogDescription>
										Add a new bookmark to your list
									</DialogDescription>
								</DialogHeader>
								<Input
									placeholder="Title"
									value={newBookmark.title}
									onChange={(e) =>
										setNewBookmark({
											...newBookmark,
											title: e.target.value,
										})
									}
									className="mb-2"
								/>
								<Input
									placeholder="URL"
									value={newBookmark.url}
									onChange={(e) =>
										setNewBookmark({
											...newBookmark,
											url: e.target.value,
										})
									}
									className="mb-2"
								/>
								<select
									value={newBookmark.category}
									onChange={(e) =>
										setNewBookmark({
											...newBookmark,
											category: e.target.value,
										})
									}
									className="w-full p-2 border rounded mb-2"
								>
									<option value="">No Category</option>
									{categories.map((cat, i) => (
										<option key={i} value={cat}>
											{cat}
										</option>
									))}
								</select>
								<Button onClick={addBookmark}>
									Add Bookmark
								</Button>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid gap-2">
						{filteredBookmarks.map((b, i) => (
							<Card key={i}>
								<CardContent className="p-4 flex flex-col gap-2">
									<a
										href={b.url}
										target="_blank"
										rel="noopener noreferrer"
										className="font-semibold text-blue-500"
									>
										{b.title}
									</a>
									<p className="text-sm text-gray-500">
										Category: {b.category || "None"}
									</p>
									<Input
										value={b.title}
										onChange={(e) =>
											editBookmark(i, {
												...b,
												title: e.target.value,
											})
										}
										placeholder="Edit title"
									/>
									<Input
										value={b.url}
										onChange={(e) =>
											editBookmark(i, {
												...b,
												url: e.target.value,
											})
										}
										placeholder="Edit URL"
									/>
									<Button
										variant="destructive"
										onClick={() => {
											setDeleteTarget({
												type: "bookmark",
												index: i,
											});
											setConfirmDeleteDialog(true);
										}}
									>
										Delete
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="categories">
					<div className="flex justify-between items-center mb-4">
						<Input
							placeholder="Search categories..."
							value={categorySearch}
							onChange={(e) => setCategorySearch(e.target.value)}
							className="w-full mr-2"
						/>
						<Dialog
							open={openCategoryDialog}
							onOpenChange={setOpenCategoryDialog}
						>
							<DialogTrigger asChild>
								<Button>
									<Plus className="w-4 h-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>New Category</DialogTitle>
									<DialogDescription>
										Give your bookmarks a new category
									</DialogDescription>
								</DialogHeader>
								<Input
									placeholder="Category name"
									value={newCategory}
									onChange={(e) =>
										setNewCategory(e.target.value)
									}
									className="mb-2"
								/>
								<Button onClick={addCategory}>
									Add Category
								</Button>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid gap-4">
						{filteredCategories.map((cat, i) => (
							<div key={i}>
								<div className="flex items-center justify-between">
									<h1 className="text-2xl font-semibold">
										{cat}
									</h1>
									<Button
										variant="destructive"
										onClick={() => {
											setDeleteTarget({
												type: "category",
												index: i,
											});
											setConfirmDeleteDialog(true);
										}}
									>
										<p>Delete</p>
									</Button>
								</div>

								<div className="grid gap-2">
									{bookmarks
										.filter((b) => b.category === cat)
										.map((b, j) => (
											<Card key={j}>
												<CardContent className="p-4">
													<a
														href={b.url}
														target="_blank"
														rel="noopener noreferrer"
														className="font-semibold text-blue-500"
													>
														{b.title}
													</a>
												</CardContent>
											</Card>
										))}
								</div>
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
			<Dialog
				open={confirmDeleteDialog}
				onOpenChange={setConfirmDeleteDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<div className="flex justify-center gap-2">
						<Button
							variant="outline"
							onClick={() => setConfirmDeleteDialog(false)}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								if (deleteTarget) {
									if (deleteTarget.type === "bookmark") {
										deleteBookmark(deleteTarget.index);
									} else {
										deleteCategory(deleteTarget.index);
									}
								}
								setConfirmDeleteDialog(false);
								setDeleteTarget(null);
							}}
						>
							Delete
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
