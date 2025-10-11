"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductForm({ onClose = () => {}, onSave = () => {}, editing }) {
  const [form, setForm] = useState(
    editing || { nama: "", deskripsi: "", poin: 0, stock: 0, harga_rp: 0, gambar: "" }
  );
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(editing?.gambar || "");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      alert("File harus berupa gambar (jpg, png, webp, dll)");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadImage = async () => {
    if (!file) return form.gambar;
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("produk-images").upload(fileName, file);
    if (error) {
      console.error("Upload gagal:", error);
      alert("Upload gambar gagal!");
      return null;
    }
    const { data: publicUrlData } = supabase.storage
      .from("produk-images")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await uploadImage();
    if (!imageUrl && !form.gambar) {
      alert("Gambar wajib diisi!");
      setLoading(false);
      return;
    }

    const dataToSave = { ...form, gambar: imageUrl || form.gambar };

    const { error } = editing
      ? await supabase.from("produk").update(dataToSave).eq("id", editing.id)
      : await supabase.from("produk").insert([dataToSave]);

    if (error) {
      console.error("Gagal menyimpan produk:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } else {
      onSave(); // ✅ pastikan ini dikirim dari parent
      onClose();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border border-gray-200 bg-white">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            {editing ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Gambar Produk</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nama Produk</label>
                <Input
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Contoh: Sabun Jelantah Eco"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Poin Penukaran</label>
                <Input
                  type="number"
                  name="poin"
                  value={form.poin}
                  onChange={handleChange}
                  placeholder="Misal: 100"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Stok Produk</label>
                <Input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Jumlah stok"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Harga Produk (Rp)</label>
                <Input
                  type="number"
                  name="harga_rp"
                  value={form.harga_rp}
                  onChange={handleChange}
                  placeholder="Contoh: 25000"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Deskripsi Produk</label>
              <Textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Tuliskan deskripsi produk secara singkat..."
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
