import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	itemLabel: string;
	trigger?: React.ReactNode; // ✅ Now optional
	onConfirm: () => void;
}

export function ConfirmDeleteDialog({
	open,
	onOpenChange,
	itemLabel,
	trigger,
	onConfirm,
}: ConfirmDeleteDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Delete</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete{" "}
						<strong>{itemLabel}</strong>?
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-end gap-2">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							onConfirm();
							onOpenChange(false);
						}}
					>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
