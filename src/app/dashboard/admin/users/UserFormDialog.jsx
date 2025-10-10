"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserForm } from "./UserForm";

export function UserFormDialog({ user, open, onOpenChange, onSuccess }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Tambah User"}</DialogTitle>
        </DialogHeader>
        <UserForm
          user={user}
          onClose={() => { onOpenChange(false); onSuccess && onSuccess(); }}
        />
      </DialogContent>
    </Dialog>
  );
}
