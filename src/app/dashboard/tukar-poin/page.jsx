"use client";

import { useState } from "react";
import Hero from "@/components/dashboard/tukar-poin/Hero";
import PoinKategori from "@/components/dashboard/tukar-poin/PoinKategori";
import ProductCard from "@/components/dashboard/tukar-poin/ProductCard";
import ConfirmModal from "@/components/dashboard/tukar-poin/ConfirmModal";
import ToastNotification from "@/components/dashboard/tukar-poin/ToastNotification";

export default function TukarPoinPage() {
  const categories = ["Semua", "Sabun", "Lilin", "Biodiesel"];
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [userPoints, setUserPoints] = useState(200);
  const [toast, setToast] = useState(null);
  const [confirmProduct, setConfirmProduct] = useState(null);

  const [products] = useState([
    {
      id: 1,
      name: "Sabun Minyak Jelantah",
      points: 50,
      category: "Sabun",
      image: "/images/tukar-poin.jpeg",
      popular: true,
      desc: "Sabun alami ramah lingkungan.",
      stock: 10,
    },
    {
      id: 2,
      name: "Lilin Aromaterapi",
      points: 70,
      category: "Lilin",
      image: "/images/tukar-poin.jpeg",
      popular: false,
      desc: "Lilin wangi relaksasi ruangan.",
      stock: 0,
    },
    {
      id: 3,
      name: "Biodiesel Mini",
      points: 100,
      category: "Biodiesel",
       image: "/images/tukar-poin.jpeg",
      popular: true,
      desc: "Bahan bakar ramah lingkungan.",
      stock: 3,
    },
    {
      id: 4,
      name: "Sabun Cuci Tangan",
      points: 40,
      category: "Sabun",
      image: "/images/tukar-poin.jpeg",
      popular: false,
      desc: "Sabun cair higienis untuk sehari-hari.",
      stock: 5,
    },
    {
      id: 5,
      name: "Lilitan Lilin Hias",
      points: 60,
      category: "Lilin",
       image: "/images/tukar-poin.jpeg",
      popular: false,
      desc: "Dekorasi lilin unik dan indah.",
      stock: 7,
    },
  ]);

  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleRedeem = (product) => {
    if (userPoints >= product.points && product.stock > 0) {
      setUserPoints(userPoints - product.points);
      setToast(`Berhasil menukar ${product.name}! Poin tersisa: ${userPoints - product.points}`);
    } else {
      setToast("Poin tidak cukup atau stok habis.");
    }
    setConfirmProduct(null);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-6 space-y-6 relative">
      <Hero />

      <PoinKategori
        userPoints={userPoints}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userPoints={userPoints}
            onRedeem={(p) => setConfirmProduct(p)}
          />
        ))}
      </div>

      <ConfirmModal
        product={confirmProduct}
        onConfirm={handleRedeem}
        onCancel={() => setConfirmProduct(null)}
      />

      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
