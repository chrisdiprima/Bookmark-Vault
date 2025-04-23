import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
	const [loading, setLoading] = useState(true);
	const [passwordEnabled, setPasswordEnabled] = useState(false);
	const [storedPassword, setStoredPassword] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

	useEffect(() => {
		chrome.storage.local.get(["passwordEnabled", "password"], (result) => {
			setPasswordEnabled(result.passwordEnabled || false);
			setStoredPassword(result.password || "");
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (!loading && !passwordEnabled) {
			onUnlock();
		}
	}, [loading, passwordEnabled, onUnlock]);

	const handleUnlock = () => {
		if (enteredPassword === storedPassword) {
			onUnlock();
		} else {
			toast.error("Incorrect Password");
		}
	};

	if (loading || (!passwordEnabled && !storedPassword)) return null;

	const handleForgotPassword = () => {
		setForgotPasswordOpen(true);
	};

	const closeForgotPasswordDialog = () => {
		setForgotPasswordOpen(false);
	};

	return (
		<div className="flex flex-col items-center justify-center mx-auto p-4 w-[550px] min-h-[600px] relative overflow-y-auto scrollbar-hide">
			<Card className="w-[320px] shadow-lg">
				<CardContent className="space-y-4 py-6">
					<div className="space-y-2">
						<Label htmlFor="password">Enter Password</Label>
						<Input
							id="password"
							type="password"
              name="passowrd"
              autoComplete="current-password"
							value={enteredPassword}
							onChange={(e) => setEnteredPassword(e.target.value)}
							placeholder="Your password"
						/>
					</div>
					<Button className="w-full" onClick={handleUnlock}>
						Unlock
					</Button>
					<Button
						variant="link"
						className="w-full text-xs mt-2"
						onClick={handleForgotPassword}
					>
						Forgot Password?
					</Button>
				</CardContent>
			</Card>
			<Dialog
				open={forgotPasswordOpen}
				onOpenChange={closeForgotPasswordDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Forgot Password</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						If you've forgotten your password, you'll need to delete
						and reinstall the app. Unfortunately, there is no way to
						recover your password.
					</DialogDescription>
					<Button
						variant="outline"
						onClick={closeForgotPasswordDialog}
					>
						Close
					</Button>
				</DialogContent>
			</Dialog>
			<Toaster position="bottom-right" />
		</div>
	);
}
