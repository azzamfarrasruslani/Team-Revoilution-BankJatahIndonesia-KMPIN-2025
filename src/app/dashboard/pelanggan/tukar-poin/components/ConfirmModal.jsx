"use client";

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmModal({ product, onConfirm, onCancel }) {
  if (!product) return null;

  return (
    <Dialog defaultOpen={!!product} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Tukar Poin</DialogTitle>
        </DialogHeader>
        <p>Apakah anda yakin ingin menukar {product.nama}?</p>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button onClick={() => onConfirm(product)}>Ya, Tukar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
