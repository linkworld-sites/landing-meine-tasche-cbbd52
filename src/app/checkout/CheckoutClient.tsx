"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { checkout, fetchProducts, formatPrice, type Product } from "@/lib/checkout";
import { track } from "@/lib/funnel";

export default function CheckoutClient() {
  const { items, remove, count } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts().then((p) => {
      setProducts(p);
      setLoaded(true);
    });
  }, []);

  // If cart is empty after catalog loaded, return to shop
  useEffect(() => {
    if (loaded && count === 0) {
      router.replace("/shop");
    }
  }, [loaded, count, router]);

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);

  const validItems = useMemo(
    () => items.filter((i) => byId.has(i.product_id)),
    [items, byId],
  );

  const total = useMemo(
    () =>
      validItems.reduce((s, i) => {
        const p = byId.get(i.product_id)!;
        return s + p.price_cents * i.quantity;
      }, 0),
    [validItems, byId],
  );

  const handlePurchase = async () => {
    if (!validItems.length || busy) return;
    setBusy(true);
    setError(null);
    track("purchase");
    const successUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/checkout/success`
        : undefined;
    const ok = await checkout(validItems, { successUrl });
    setBusy(false);
    if (!ok) {
      setError(
        "Die Zahlung konnte nicht gestartet werden. Bitte versuche es erneut.",
      );
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-cormorant text-terre text-xl animate-pulse">
          Wird geladen…
        </p>
      </div>
    );
  }

  if (!validItems.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Page header */}
      <header className="mb-12 border-b border-linen pb-8">
        <p className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-3">
          Meine Tasche
        </p>
        <h1
          className="font-cormorant font-light text-espresso leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Deine Bestellung
        </h1>
      </header>

      {/* Cart items */}
      <ul className="space-y-0 mb-12">
        {validItems.map((item, i) => {
          const p = byId.get(item.product_id)!;
          return (
            <motion.li
              key={item.product_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-6 py-6 border-b border-linen"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-cormorant text-xl text-espresso leading-tight">
                  {p.name}
                </h3>
                {p.description && (
                  <p className="font-sans text-xs text-terre mt-1 leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-sans text-xs text-terre/70 uppercase tracking-widest">
                    Menge: {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(item.product_id)}
                    className="font-sans text-xs text-terre/50 hover:text-terre underline transition-colors"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
              <span className="font-cormorant text-xl text-espresso tabular-nums whitespace-nowrap shrink-0">
                {formatPrice(p.price_cents * item.quantity, p.currency)}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {/* Order total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="flex items-baseline justify-between mb-10"
      >
        <span className="font-cormorant-sc text-terre text-sm tracking-[0.3em] uppercase">
          Gesamt
        </span>
        <span className="font-cormorant text-3xl text-espresso tabular-nums">
          {formatPrice(total)}
        </span>
      </motion.div>

      {/* CTA */}
      <div className="space-y-4">
        <motion.button
          type="button"
          onClick={handlePurchase}
          disabled={busy || !validItems.length}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.15 }}
          className="w-full bg-espresso text-cream font-sans text-sm uppercase tracking-[0.25em] py-4 px-8 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Zahlung wird gestartet…" : "Jetzt kaufen"}
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-sans text-red-600 text-center"
          >
            {error}
          </motion.p>
        )}

        <Link
          href="/shop"
          className="block text-center font-sans text-xs text-terre/70 hover:text-sand transition-colors uppercase tracking-widest"
        >
          ← Zurück zur Kollektion
        </Link>
      </div>
    </motion.div>
  );
}
