import { useState, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Bookmark {
	title: string;
	url: string;
	category: string;
}

// const STORAGE_KEYS = {
// 	bookmarks: "bookmarks",
// 	categories: "categories",
// };

export default function BookmarkExtension() {
	const [search, setSearch] = useState<string>("");
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [newBookmark, setNewBookmark] = useState<Bookmark>({
		title: "",
		url: "",
		category: "",
	});
	const [newCategory, setNewCategory] = useState<string>("");

	// useEffect(() => {
	//   chrome.storage.sync.get([STORAGE_KEYS.bookmarks, STORAGE_KEYS.categories], (result) => {
	//     setBookmarks(result.bookmarks || [
	//       { title: "OpenAI", url: "https://openai.com", category: "AI" },
	//       { title: "React", url: "https://reactjs.org", category: "Frontend" },
	//     ]);
	//     setCategories(result.categories || ["AI", "Frontend"]);
	//   });
	// }, []);

	// useEffect(() => {
	//   chrome.storage.sync.set({ [STORAGE_KEYS.bookmarks]: bookmarks });
	// }, [bookmarks]);

	// useEffect(() => {
	//   chrome.storage.sync.set({ [STORAGE_KEYS.categories]: categories });
	// }, [categories]);

	const filteredBookmarks = bookmarks.filter((b) =>
		b.title.toLowerCase().includes(search.toLowerCase())
	);

	const addBookmark = () => {
		if (!newBookmark.title || !newBookmark.url) return;
		setBookmarks([...bookmarks, newBookmark]);
		setNewBookmark({ title: "", url: "", category: "" });
	};

	const editBookmark = (index: number, updatedBookmark: Bookmark) => {
		const updated = [...bookmarks];
		updated[index] = updatedBookmark;
		setBookmarks(updated);
	};

	const deleteBookmark = (index: number) => {
		const updated = bookmarks.filter((_, i) => i !== index);
		setBookmarks(updated);
	};

	const addCategory = () => {
		if (!newCategory) return;
		setCategories([...categories, newCategory]);
		setNewCategory("");
	};

	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">
				My Bookmarks
			</h1>
			<Tabs defaultValue="all">
				<TabsList className="grid grid-cols-3 mb-4">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
					<TabsTrigger value="new">New</TabsTrigger>
				</TabsList>

				<TabsContent value="all">
					<Input
						placeholder="Search bookmarks..."
						value={search}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setSearch(e.target.value)
						}
						className="mb-4"
					/>
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
										placeholder="Edit title"
										value={b.title}
										onChange={(
											e: ChangeEvent<HTMLInputElement>
										) =>
											editBookmark(i, {
												...b,
												title: e.target.value,
											})
										}
									/>
									<Input
										placeholder="Edit URL"
										value={b.url}
										onChange={(
											e: ChangeEvent<HTMLInputElement>
										) =>
											editBookmark(i, {
												...b,
												url: e.target.value,
											})
										}
									/>
									<Button
										variant="destructive"
										onClick={() => deleteBookmark(i)}
									>
										Delete
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="categories">
					<div className="grid gap-4">
						{categories.map((cat, i) => (
							<div key={i}>
								<h2 className="text-xl font-semibold mb-2">
									{cat}
								</h2>
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

				<TabsContent value="new">
					<div className="space-y-4">
						<div>
							<h2 className="text-lg font-semibold mb-1">
								New Bookmark
							</h2>
							<Input
								placeholder="Title"
								value={newBookmark.title}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setNewBookmark({
										...newBookmark,
										url: e.target.value,
									})
								}
								className="mb-2"
							/>
							<select
								value={newBookmark.category}
								onChange={(e: ChangeEvent<HTMLSelectElement>) =>
									setNewBookmark({
										...newBookmark,
										category: e.target.value,
									})
								}
								className="w-full p-2 border rounded"
							>
								<option value="">No Category</option>
								{categories.map((cat, i) => (
									<option key={i} value={cat}>
										{cat}
									</option>
								))}
							</select>
							<Button onClick={addBookmark} className="mt-2">
								Add Bookmark
							</Button>
						</div>

						<div>
							<h2 className="text-lg font-semibold mb-1">
								New Category
							</h2>
							<Input
								placeholder="Category name"
								value={newCategory}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setNewCategory(e.target.value)
								}
								className="mb-2"
							/>
							<Button onClick={addCategory}>Add Category</Button>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
