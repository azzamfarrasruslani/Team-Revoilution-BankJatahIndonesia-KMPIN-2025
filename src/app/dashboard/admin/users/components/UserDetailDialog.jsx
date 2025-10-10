"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

export function UserDetailDialog({ user, open, onOpenChange }) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detail User</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p><strong>Nama:</strong> {user.nama}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>No HP:</strong> {user.no_hp}</p>
          <p><strong>Alamat:</strong> {user.alamat}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Poin:</strong> {user.poin}</p>
        </div>

        {/* QR Code */}
        {user.qr_code_id && (
          <div className="flex justify-center my-4 p-2 bg-white rounded shadow">
            <QRCode value={user.qr_code_id} size={150} />
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
