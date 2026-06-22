"use client";

import { useEffect } from "react";
import ShopClient from "@/components/ShopClient";
import type { Product } from "@/lib/checkout";
import { track } from "@/lib/funnel";

export default function ShopWrapper({ products }: { products: Product[] }) {
  useEffect(() => {
    track("product_view");
  }, []);

  return <ShopClient products={products} />;
}
