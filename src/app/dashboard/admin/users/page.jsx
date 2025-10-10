"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

import { UserTable } from "./UserTable";
import { UserDetailDialog } from "./UserDetailDialog";
import { UserFormDialog } from "./UserFormDialog";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    if (error) console.error(error);
    else setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleDetail = (user) => {
    setSelectedUser(user);
    setOpenDetail(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola User</h1>
        <Button onClick={() => { setSelectedUser(null); setOpenForm(true); }}>Tambah User</Button>
      </div>

      <UserTable users={users} loading={loading} onEdit={handleEdit} onDetail={handleDetail} />

      <UserFormDialog
        user={selectedUser}
        open={openForm}
        onOpenChange={setOpenForm}
        onSuccess={() => fetchUsers()}
      />

      <UserDetailDialog
        user={selectedUser}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />
    </div>
  );
}
