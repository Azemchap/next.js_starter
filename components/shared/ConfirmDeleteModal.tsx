import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogDescription>
                        <h3>Are you sure you want to delete this post?</h3>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 my-4">
                    <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" className="flex-1" onClick={onConfirm}>Delete post</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}