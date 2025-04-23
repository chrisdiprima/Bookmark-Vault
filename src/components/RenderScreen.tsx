import { useState } from "react";
import LockScreen from "@/components/LockScreen";
import MainApp from "@/App";

export default function App() {
	const [unlocked, setUnlocked] = useState(false);

	if (unlocked === false) {
		console.log("password screen");
		return <LockScreen onUnlock={() => setUnlocked(true)} />;
	} else {
		console.log("main screen");
		return <MainApp />;
	}
}
