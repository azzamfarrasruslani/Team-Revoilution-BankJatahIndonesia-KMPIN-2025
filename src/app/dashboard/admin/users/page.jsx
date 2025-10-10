"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function UsersPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola User</h1>
        <Button onClick={() => { setEditUser(null); setOpenForm(true); }}>
          Tambah User
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <UserTable onEdit={handleEdit} />
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editUser ? "Edit User" : "Tambah User"}</DialogTitle>
          </DialogHeader>
          <UserForm user={editUser} onClose={() => setOpenForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
