"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function UserTable({ users = [], loading, onEdit, onDetail }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nama}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onDetail(user)}>Detail</Button>
                <Button size="sm" variant="outline" onClick={() => onEdit(user)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
