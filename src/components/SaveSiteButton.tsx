import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bookmark } from "types";

export default function SaveSiteButton({
	onSave,
}: {
	onSave: (bookmark: Bookmark) => void;
}) {
	const [currentTab, setCurrentTab] = useState<{
		title: string;
		url: string;
	} | null>(null);

	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tab = tabs[0];
			if (tab && tab.url && tab.title) {
				setCurrentTab({ title: tab.title, url: tab.url });
			}
		});
	}, []);

	const handleSave = () => {
		if (!currentTab) return;

		const newBookmark = {
			id: crypto.randomUUID(),
			title: currentTab.title,
			url: currentTab.url,
			category: "Uncategorized",
			createdAt: new Date().toISOString(),
		};

		onSave(newBookmark);
	};

	return (
		<Button onClick={handleSave} disabled={!currentTab}>
			Save Site
		</Button>
	);
}
