import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RenderScreen from "@/components/RenderScreen";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RenderScreen />
	</StrictMode>
);
