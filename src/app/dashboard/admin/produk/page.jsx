"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import ProductForm from "./ProductForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function ProdukPage() {
  const [produkList, setProdukList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔁 Ambil data produk dari Supabase
  const fetchProduk = async () => {
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProdukList(data);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // 💾 Setelah simpan produk baru / edit
  const handleSave = () => {
    fetchProduk();
  };

  const handleClose = () => {
    setShowForm(false);
    setEditing(null);
  };

  // 🗑️ Fungsi hapus produk
  const handleDelete = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("produk").delete().eq("id", id);
    setLoading(false);

    if (error) {
      alert("Gagal menghapus produk!");
      console.error(error);
    } else {
      alert("Produk berhasil dihapus!");
      fetchProduk();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Daftar Produk</h1>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setShowForm(true)}
        >
          Tambah Produk
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {produkList.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-3 shadow-sm bg-white flex flex-col"
          >
            <img
              src={p.gambar}
              alt={p.nama}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="font-semibold">{p.nama}</h2>
            <p className="text-sm text-gray-600 flex-grow">{p.deskripsi}</p>
            <p className="mt-1 text-sm text-gray-800">Poin: {p.poin}</p>

            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setEditing(p);
                  setShowForm(true);
                }}
              >
                Edit
              </Button>

              {/* ✅ Tombol Hapus dengan ConfirmDialog */}
              <ConfirmDialog
                trigger={
                  <Button
                    variant="destructive"
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    disabled={loading}
                  >
                    Hapus
                  </Button>
                }
                title="Hapus Produk"
                description={`Apakah Anda yakin ingin menghapus produk "${p.nama}"?`}
                onConfirm={() => handleDelete(p.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProductForm
          onClose={handleClose}
          onSave={handleSave}
          editing={editing}
        />
      )}
    </div>
  );
}
