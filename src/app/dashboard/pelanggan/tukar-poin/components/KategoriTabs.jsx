"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function KategoriTabs({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
      <TabsList>
        {categories.map((cat) => (
          <TabsTrigger key={cat} value={cat}>
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
