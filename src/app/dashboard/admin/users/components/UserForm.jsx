"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";
import { supabase } from "@/lib/supabaseClient";

// Reusable InputWithLabel
function InputWithLabel({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

// Reusable SelectWithLabel
function SelectWithLabel({ label, value, onValueChange, options }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Pilih ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function UserForm({ user, onClose }) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    role: "pelanggan",
    no_hp: "",
    alamat: "",
    status: "aktif",
    qr_code_id: "",
    poin: 0,
  });
  const [loading, setLoading] = useState(false);

  // Init / edit
  useEffect(() => {
    if (user) setForm({ ...user });
    else setForm((prev) => ({ ...prev, qr_code_id: uuidv4() }));
  }, [user]);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSelectChange = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        const { error } = await supabase
          .from("users")
          .update(form)
          .eq("id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("users").insert([form]);
        if (error) throw error;
      }
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm("Apakah yakin ingin menghapus user ini?")) return;
    try {
      const { error } = await supabase.from("users").delete().eq("id", user.id);
      if (error) throw error;
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Konfigurasi field agar form lebih pendek
  const fields = [
    { label: "Nama", key: "nama" },
    { label: "Email", key: "email", type: "email" },
    { label: "No HP", key: "no_hp" },
    { label: "Alamat", key: "alamat" },
  ];

  const selectFields = [
    {
      label: "Role",
      key: "role",
      options: [
        { value: "pelanggan", label: "Pelanggan" },
        { value: "unit_bisnis", label: "Unit Bisnis" },
        { value: "admin", label: "Admin" },
      ],
    },
    {
      label: "Status",
      key: "status",
      options: [
        { value: "aktif", label: "Aktif" },
        { value: "nonaktif", label: "Nonaktif" },
      ],
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  p-6 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <InputWithLabel
            key={f.key}
            label={f.label}
            type={f.type || "text"}
            value={form[f.key]}
            onChange={handleChange(f.key)}
          />
        ))}
        {selectFields.map((f) => (
          <SelectWithLabel
            key={f.key}
            label={f.label}
            value={form[f.key]}
            onValueChange={handleSelectChange(f.key)}
            options={f.options}
          />
        ))}
        <InputWithLabel label="QR Code ID" value={form.qr_code_id} readOnly />
        <InputWithLabel label="Poin" value={form.poin} readOnly type="number" />
      </div>

      {/* QR Code */}
      {form.role === "pelanggan" && form.qr_code_id && (
        <div className="flex justify-center my-4 bg-white p-2 rounded shadow">
          <QRCode value={form.qr_code_id} style={{ width: 120, height: 120 }} />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between mt-4 gap-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          {user && (
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          )}
        </div>
        <Button type="submit" disabled={loading} className="md:ml-auto">
          {loading ? "Menyimpan..." : user ? "Update" : "Tambah"}
        </Button>
      </div>
    </form>
  );
}
