"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import KategoriTabs from "./components/KategoriTabs";
import ConfirmModal from "./components/ConfirmModal";
import { supabase } from "@/lib/supabaseClient";

export default function TukarPoinPage() {
  const categories = ["Semua", "Sabun", "Lilin", "Biodiesel"];
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [userPoints, setUserPoints] = useState(200);
  const [products, setProducts] = useState([]);
  const [confirmProduct, setConfirmProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching products:", error);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleRedeem = async (product) => {
    if (userPoints >= product.poin && product.stock > 0) {
      setUserPoints(userPoints - product.poin);

      const { error } = await supabase
        .from("produk")
        .update({ stock: product.stock - 1 })
        .eq("id", product.id);

      if (error) console.error("Error updating stock:", error);
      else alert(`${product.nama} berhasil ditukar! Poin tersisa: ${userPoints - product.poin}`);
    } else {
      alert("Poin tidak cukup atau stok habis.");
    }
    setConfirmProduct(null);
    fetchProducts();
  };

  return (
    <div className="p-6 space-y-6 relative">
      <Hero />

      <KategoriTabs
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Memuat produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              userPoints={userPoints}
              onRedeem={setConfirmProduct}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        product={confirmProduct}
        onConfirm={handleRedeem}
        onCancel={() => setConfirmProduct(null)}
      />
    </div>
  );
}
