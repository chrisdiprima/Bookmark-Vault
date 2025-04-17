import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus, BookMarked, Ellipsis } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ui/ConfirmDeleteDialog.tsx";
import ValidImage from "@/components/ValidImage";

interface Bookmark {
	id: string;
	title: string;
	url: string;
	category: string;
}

interface Category {
	name: string;
	color: string;
}

export default function BookmarkExtension() {
	const [search, setSearch] = useState("");
	const [categorySearch, setCategorySearch] = useState("");
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [newBookmark, setNewBookmark] = useState<Bookmark>({
		id: crypto.randomUUID(),
		title: "",
		url: "",
		category: "",
	});
	const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [newCategoryColor, setNewCategoryColor] = useState("#000000");

	const [bookmarkToEdit, setBookmarkToEdit] = useState<Bookmark | null>(null);
	const [newBookmarkTitle, setNewBookmarkTitle] = useState<string>("");
	const [newBookmarkUrl, setNewBookmarkUrl] = useState<string>("");

	const [openBookmarkDialog, setOpenBookmarkDialog] = useState(false);
	const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

	const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(
		null
	);

	const [categoryToDelete, setCategoryToDelete] = useState<string | null>(
		null
	);

	const filteredBookmarks = bookmarks.filter((bookmark) =>
		bookmark.title.toLowerCase().includes(search.toLowerCase())
	);
	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(categorySearch.toLowerCase())
	);

	const addBookmark = () => {
		if (!newBookmark.title || !newBookmark.url) return;
		setBookmarks([...bookmarks, newBookmark]);
		setNewBookmark({ id: "", title: "", url: "", category: "" });
		setOpenBookmarkDialog(false);
	};

	const addCategory = () => {
		if (!newCategoryName) return;
		setCategories([
			...categories,
			{ name: newCategoryName, color: newCategoryColor },
		]);
		setNewCategoryName("");
		setNewCategoryColor("#000000");
		setOpenCategoryDialog(false);
	};

	// const editBookmark = (index: number, updatedBookmark: Bookmark) => {
	// 	const updated = [...bookmarks];
	// 	updated[index] = updatedBookmark;
	// 	setBookmarks(updated);
	// };

	useEffect(() => {
		if (bookmarks.length === 0 && categories.length === 0) {
			const sampleCategories = [
				{ name: "Work", color: "#3b82f6" },
				{ name: "Personal", color: "#f43f5e" },
				{ name: "Learning", color: "#10b981" },
			];
			const sampleBookmarks: Bookmark[] = [
				{
					id: crypto.randomUUID(),
					title: "React Docs",
					url: "https://reactjs.org",
					category: "Learning",
				},
				{
					id: crypto.randomUUID(),
					title: "GitHub",
					url: "https://github.com",
					category: "Work",
				},
				{
					id: crypto.randomUUID(),
					title: "YouTube",
					url: "https://youtube.com",
					category: "Personal",
				},
				{
					id: crypto.randomUUID(),
					title: "React Docs",
					url: "https://reactjs.org",
					category: "Learning",
				},
				{
					id: crypto.randomUUID(),
					title: "GitHub",
					url: "https://github.com",
					category: "Work",
				},
				{
					id: crypto.randomUUID(),
					title: "YouTube",
					url: "https://youtube.com",
					category: "Personal",
				},
				{
					id: crypto.randomUUID(),
					title: "React Docs",
					url: "https://reactjs.org",
					category: "Learning",
				},
				{
					id: crypto.randomUUID(),
					title: "GitHub",
					url: "https://github.com",
					category: "Work",
				},
				{
					id: crypto.randomUUID(),
					title: "YouTube",
					url: "https://youtube.com",
					category: "Personal",
				},
			];

			setCategories(sampleCategories);
			setBookmarks(sampleBookmarks);
		}
	}, [bookmarks.length, categories.length]);

	return (
		<div className="flex flex-col items-center mx-auto p-4 w-[550px] relative overflow-y-auto">
			<h1 className="text-2xl font-bold mb-4">Site Saver</h1>

			<Tabs defaultValue="all" className="m-4 ">
				<TabsList className="grid grid-cols-2 w-[450px]">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="w-[450px]">
					<div className="flex justify-between items-center mb-4">
						<Input
							placeholder="Search bookmarks..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full mr-2"
						/>

						{/* create bookmark*/}
						<Dialog
							open={openBookmarkDialog}
							onOpenChange={setOpenBookmarkDialog}
						>
							<DialogTrigger asChild>
								<Button>
									<Plus className="w-4 h-4" />
								</Button>
							</DialogTrigger>
							<DialogContent
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										addBookmark();
									}
								}}
							>
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
									{categories.map((category, i) => (
										<option key={i} value={category.name}>
											{category.name}
										</option>
									))}
								</select>
								<Button onClick={addBookmark}>
									Add Bookmark
								</Button>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid grid-cols-2 gap-2">
						{filteredBookmarks.map((bookmark, i) => {
							const imageUrl: string = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=128`;
							return (
								<Card key={i}>
									<CardContent className="flex flex-col gap-2 items-center relative">
										<div className="absolute top-2 right-2">
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
															setBookmarkToEdit(
																bookmark
															);
															setNewBookmarkTitle(
																bookmark.title
															);
															setNewBookmarkUrl(
																bookmark.url
															);
														}}
													>
														Edit
													</DropdownMenuItem>

													<DropdownMenuItem
														onClick={() =>
															setBookmarkToDelete(
																bookmarks[i]
															)
														}
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
											className="font-semibold text-blue-500 flex flex-col items-center gap-5"
										>
											<ValidImage
												src={imageUrl}
												alt="Icon image"
												fallback={
													<BookMarked className="w-[100px] h-[100px] text-black" />
												}
												width={100}
												height={100}
												className="rounded-lg"
											/>

											{bookmark.title}
										</a>
										<p className="text-sm text-gray-500">
											Category:{" "}
											{bookmark.category || "None"}
										</p>

										<ConfirmDeleteDialog
											open={
												bookmarkToDelete?.id ===
												bookmark.id
											}
											onOpenChange={(open) =>
												setBookmarkToDelete(
													open ? bookmark : null
												)
											}
											itemLabel={bookmark.title}
											onConfirm={() =>
												setBookmarks((prev) =>
													prev.filter(
														(bm) =>
															bm.id !==
															bookmark.id
													)
												)
											}
										/>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</TabsContent>

				<TabsContent value="categories" className="w-[450px]">
					<div className="flex justify-between items-center mb-4">
						<Input
							placeholder="Search categories..."
							value={categorySearch}
							onChange={(e) => setCategorySearch(e.target.value)}
							className="w-full mr-2"
						/>
						{/* create category*/}
						<Dialog
							open={openCategoryDialog}
							onOpenChange={setOpenCategoryDialog}
						>
							<DialogTrigger asChild>
								<Button>
									<Plus className="w-4 h-4" />
								</Button>
							</DialogTrigger>
							<DialogContent
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										addCategory();
									}
								}}
							>
								<DialogHeader>
									<DialogTitle>New Category</DialogTitle>
									<DialogDescription>
										Give your bookmarks a new category
									</DialogDescription>
								</DialogHeader>
								<Input
									placeholder="Category name"
									value={newCategoryName}
									onChange={(e) =>
										setNewCategoryName(e.target.value)
									}
									className="mb-2"
								/>
								<div className="grid grid-cols-5 gap-2 mb-2">
									{[
										"#ef4444",
										"#f97316",
										"#facc15",
										"#84cc16",
										"#22c55e",
										"#10b981",
										"#14b8a6",
										"#06b6d4",
										"#3b82f6",
										"#6366f1",
										"#8b5cf6",
										"#a855f7",
										"#d946ef",
										"#ec4899",
										"#f43f5e",
										"#6b7280",
										"#9ca3af",
										"#fbbf24",
										"#4ade80",
										"#0ea5e9",
									].map((color) => (
										<button
											key={color}
											onClick={() =>
												setNewCategoryColor(color)
											}
											className={`w-8 h-8 rounded-full border-2 ${
												newCategoryColor === color
													? "border-black"
													: "border-transparent"
											}`}
											style={{ backgroundColor: color }}
										/>
									))}
								</div>
								<Button onClick={addCategory}>
									Add Category
								</Button>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid gap-4">
						{filteredCategories.map((category, i) => (
							<div key={i}>
								<div className="flex items-center justify-between pb-4">
									<div className="flex items-center justify-center gap-2">
										<div
											className="w-5 h-5 rounded-full mt-1"
											style={{
												backgroundColor: category.color,
											}}
										/>
										<h1 className="text-2xl font-semibold">
											{category.name}
										</h1>
									</div>
									<div className="flex gap-2">
										<Button
											onClick={() => {
												setCategoryToEdit(
													category.name
												);
												setNewCategoryName(
													category.name
												);
												setNewCategoryColor("#000000");
											}}
										>
											Edit
										</Button>
										<ConfirmDeleteDialog
											open={
												categoryToDelete ===
												category.name
											}
											onOpenChange={(open) =>
												setCategoryToDelete(
													open ? category.name : null
												)
											}
											itemLabel={category.name}
											trigger={
												<Button
													variant="destructive"
													onClick={() =>
														setCategoryToDelete(
															category.name
														)
													}
												>
													Delete
												</Button>
											}
											onConfirm={() => {
												setCategories(
													(prevCategories) =>
														prevCategories.filter(
															(c) =>
																c !== category
														)
												);

												setBookmarks((prevBookmarks) =>
													prevBookmarks.map(
														(bookmark) =>
															bookmark.category ===
															category.name
																? {
																		...bookmark,
																		category:
																			"None",
																  }
																: bookmark
													)
												);
											}}
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-2">
									{bookmarks
										.filter(
											(bookmark) =>
												bookmark.category ===
												category.name
										)
										.map((bookmark) => {
											const imageUrl: string = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=128`;

											return (
												<Card key={bookmark.id}>
													<CardContent className="flex flex-col gap-2 items-center relative">
														<div className="absolute top-2 right-2">
															<DropdownMenu>
																<DropdownMenuTrigger
																	asChild
																>
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
																			setBookmarkToEdit(
																				bookmark
																			);
																			setNewBookmarkTitle(
																				bookmark.title
																			);
																			setNewBookmarkUrl(
																				bookmark.url
																			);
																		}}
																	>
																		Edit
																	</DropdownMenuItem>

																	<DropdownMenuItem
																		onClick={() =>
																			setBookmarkToDelete(
																				bookmark
																			)
																		}
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
															className="font-semibold text-blue-500 flex flex-col items-center gap-5"
														>
															<ValidImage
																src={imageUrl}
																alt="Icon image"
																fallback={
																	<BookMarked className="w-20 h-20 text-black" />
																}
																width={100}
																height={100}
																className="rounded-lg"
															/>

															{bookmark.title}
														</a>
														<p className="text-sm text-gray-500">
															Category:{" "}
															{bookmark.category ||
																"None"}
														</p>

														<ConfirmDeleteDialog
															open={
																bookmarkToDelete?.id ===
																bookmark.id
															}
															onOpenChange={(
																open
															) =>
																setBookmarkToDelete(
																	open
																		? bookmark
																		: null
																)
															}
															itemLabel={
																bookmark.title
															}
															onConfirm={() =>
																setBookmarks(
																	(prev) =>
																		prev.filter(
																			(
																				bm
																			) =>
																				bm.id !==
																				bookmark.id
																		)
																)
															}
														/>
													</CardContent>
												</Card>
											);
										})}
								</div>
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>

			{/* edit bookmark*/}
			<Dialog
				open={bookmarkToEdit !== null}
				onOpenChange={(open) => open || setBookmarkToEdit(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Bookmark</DialogTitle>
						<DialogDescription>
							Update your bookmark details
						</DialogDescription>
					</DialogHeader>
					<Input
						placeholder="Bookmark title"
						value={newBookmarkTitle}
						onChange={(e) => setNewBookmarkTitle(e.target.value)}
					/>
					<Input
						placeholder="Bookmark URL"
						value={newBookmarkUrl}
						onChange={(e) => setNewBookmarkUrl(e.target.value)}
					/>
					<Button
						onClick={() => {
							if (bookmarkToEdit) {
								setBookmarks((prevBookmarks) =>
									prevBookmarks.map((bookmark) =>
										bookmark.id === bookmarkToEdit.id
											? {
													...bookmark,
													title: newBookmarkTitle,
													url: newBookmarkUrl,
											  }
											: bookmark
									)
								);
								setBookmarkToEdit(null);
								setOpenBookmarkDialog(false);
							}
						}}
					>
						Save Changes
					</Button>
				</DialogContent>
			</Dialog>

			{/* edit category*/}
			<Dialog
				open={categoryToEdit !== null}
				onOpenChange={(open) => open || setCategoryToEdit(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Category</DialogTitle>
						<DialogDescription>
							Edit the category name and color
						</DialogDescription>
					</DialogHeader>
					<Input
						placeholder="Category name"
						value={newCategoryName}
						onChange={(e) => setNewCategoryName(e.target.value)}
						className="mb-2"
					/>
					<div className="grid grid-cols-5 mb-2 m-auto gap-x-18 gap-y-6">
						{[
							"#ef4444",
							"#f97316",
							"#facc15",
							"#84cc16",
							"#22c55e",
							"#10b981",
							"#14b8a6",
							"#06b6d4",
							"#3b82f6",
							"#6366f1",
							"#8b5cf6",
							"#a855f7",
							"#d946ef",
							"#ec4899",
							"#f43f5e",
							"#6b7280",
							"#9ca3af",
							"#fbbf24",
							"#4ade80",
							"#0ea5e9",
						].map((color) => (
							<button
								key={color}
								onClick={() => setNewCategoryColor(color)}
								className={`w-8 h-8 rounded-full border-2 ${
									newCategoryColor === color
										? "border-black"
										: "border-transparent"
								}`}
								style={{ backgroundColor: color }}
							/>
						))}
					</div>
					<Button
						onClick={() => {
							if (categoryToEdit) {
								setCategories((prev) =>
									prev.map((category) =>
										category.name === categoryToEdit
											? {
													name: newCategoryName,
													color: newCategoryColor,
											  }
											: category
									)
								);
								setBookmarks((prev) =>
									prev.map((bookmark) =>
										bookmark.category === categoryToEdit
											? {
													...bookmark,
													category: newCategoryName,
											  }
											: bookmark
									)
								);
								setNewCategoryColor(newCategoryColor);
								setCategoryToEdit(null);
							}
						}}
					>
						Save Changes
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
}
